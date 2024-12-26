const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Fetch combined data
router.get('/combined', async (req, res) => {
  const month = parseInt(req.query.month) - 1; // Convert month to 0-based index
  const start = new Date(2024, month, 1);
  const end = new Date(2024, month + 1, 0);

  try {
    // Statistics
    const totalSaleAmount = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: start, $lte: end }, sold: true } },
      { $group: { _id: null, total: { $sum: '$price' } } },
    ]);

    const totalSoldItems = await Transaction.countDocuments({
      dateOfSale: { $gte: start, $lte: end },
      sold: true,
    });

    const totalNotSoldItems = await Transaction.countDocuments({
      dateOfSale: { $gte: start, $lte: end },
      sold: false,
    });

    const statistics = {
      totalSaleAmount: totalSaleAmount[0]?.total || 0,
      totalSoldItems,
      totalNotSoldItems,
    };

    // Bar Chart Data
    const barChart = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: start, $lte: end } } },
      {
        $bucket: {
          groupBy: '$price',
          boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity],
          default: '901+',
          output: { count: { $sum: 1 } },
        },
      },
    ]);

    // Pie Chart Data
    const pieChart = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: start, $lte: end } } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    res.json({ statistics, barChart, pieChart });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching combined data' });
  }
});

// Fetch paginated transactions
router.get('/transactions', async (req, res) => {
  const { month, page = 1, perPage = 10, search = '' } = req.query;
  const start = new Date(2024, month - 1, 1);
  const end = new Date(2024, month, 0);

  try {
    const query = {
      dateOfSale: { $gte: start, $lte: end },
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { price: { $regex: search, $options: 'i' } },
      ],
    };

    const total = await Transaction.countDocuments(query);
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));

    res.json({ transactions, total });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching transactions' });
  }
});

module.exports = router;

