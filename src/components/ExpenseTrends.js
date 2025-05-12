// components/ExpenseTrends.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ExpenseTrends = ({ expenses }) => {
  // Define colors for different categories
  const COLORS = {
    Food: '#9c88ff',
    Entertainment: '#fd9644',
    Travel: '#fdcb6e',
    Shopping: '#55efc4',
    Bills: '#74b9ff',
    Health: '#ff7675',
    Education: '#a29bfe',
    Other: '#fab1a0'
  };

  // Get unique categories and calculate total for each
  const categories = [...new Set(expenses.map((exp) => exp.category))];
  const data = categories.map((category) => ({
    name: category,
    total: expenses
      .filter((exp) => exp.category === category)
      .reduce((sum, exp) => sum + Number(exp.amount), 0),
    color: COLORS[category] || '#8884d8'
  }));

  // Sort data by total amount (descending)
  data.sort((a, b) => b.total - a.total);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
          <p className="label">{`${payload[0].name}: ₹${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="expense-trends">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="name"
            width={100}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="total"
            fill="#8884d8"
            background={{ fill: '#eee' }}
            radius={[0, 4, 4, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseTrends;
