import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ pieChartData }) => {
  const data = {
    labels: pieChartData.map((item) => item._id),
    datasets: [
      {
        label: 'Items per Category',
        data: pieChartData.map((item) => item.count),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div>
      <h3>Category Distribution Pie Chart</h3>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
