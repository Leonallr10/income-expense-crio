// components/ExpenseSummary.js
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const ExpenseSummary = ({ expenses }) => {
  // Define colors for different categories
  const COLORS = ['#9c88ff', '#fd9644', '#fdcb6e', '#55efc4', '#74b9ff', '#ff7675', '#a29bfe', '#fab1a0'];

  // Get unique categories and calculate total for each
  const categories = [...new Set(expenses.map((exp) => exp.category))];
  const data = categories.map((category, index) => ({
    name: category,
    value: expenses
      .filter((exp) => exp.category === category)
      .reduce((sum, exp) => sum + Number(exp.amount), 0),
    color: COLORS[index % COLORS.length]
  }));

  // Calculate percentages for each category
  const total = data.reduce((sum, item) => sum + item.value, 0);
  data.forEach(item => {
    item.percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
  });

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
          <p className="label">{`${payload[0].name}: ₹${payload[0].value.toFixed(2)}`}</p>
          <p className="percentage">{`${payload[0].payload.percentage}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="expense-summary">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={0}
            paddingAngle={2}
            label={({ percentage }) => `${percentage}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="legend">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseSummary;
