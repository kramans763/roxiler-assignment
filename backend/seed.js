const axios = require('axios');
const Transaction = require('./models/Transaction');
const connectDB = require('./db');

const seedDatabase = async () => {
  await connectDB();
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    await Transaction.insertMany(response.data);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
  process.exit();
};

seedDatabase();
