import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ barChartData }) => {
  const data = {
    labels: barChartData.map((item) => item.range),
    datasets: [
      {
        label: 'Number of Items',
        data: barChartData.map((item) => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div>
      <h3>Price Range Bar Chart</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
