import React from 'react';

const MonthSelector = ({ onChange }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  return (
    <div>
      <label>Select Month: </label>
      <select onChange={(e) => onChange(parseInt(e.target.value))}>
        {months.map((month, idx) => (
          <option key={idx} value={idx + 1}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthSelector;
