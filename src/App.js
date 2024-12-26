import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MonthSelector from './MonthSelector';
import Statistics from './Statistics';
import BarChart from './BarChart';
import PieChart from './PieChart';
import TransactionTable from './TransactionTable';

const App = () => {
  const [month, setMonth] = useState(1); // Default to January
  const [data, setData] = useState(null);

  const fetchData = async (selectedMonth) => {
    try {
      const response = await axios.get(`/combined?month=${selectedMonth}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(month);
  }, [month]);

  return (
    <div>
      <h1>Transaction Dashboard</h1>
      <MonthSelector onChange={(selectedMonth) => setMonth(selectedMonth)} />
      {data ? (
        <div>
          <Statistics statistics={data.statistics} />
          <BarChart barChartData={data.barChart} />
          <PieChart pieChartData={data.pieChart} />
          <TransactionTable month={month} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;

