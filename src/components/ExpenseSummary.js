// components/ExpenseSummary.js
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const ExpenseSummary = ({ totalExpenses, foodExpenses, travelExpenses, entertainmentExpenses }) => {
  // Define colors for different categories
  const COLORS = {
    Food: '#9c88ff',
    Travel: '#fdcb6e',
    Entertainment: '#fd9644',
    Other: '#55efc4'
  };

  // Create data for pie chart
  const data = [
    { name: 'Food', value: foodExpenses, color: COLORS.Food },
    { name: 'Travel', value: travelExpenses, color: COLORS.Travel },
    { name: 'Entertainment', value: entertainmentExpenses, color: COLORS.Entertainment },
    {
      name: 'Other',
      value: totalExpenses - (foodExpenses + travelExpenses + entertainmentExpenses),
      color: COLORS.Other
    }
  ].filter(item => item.value > 0); // Only include categories with values > 0

  // Calculate percentages for each category
  const total = data.reduce((sum, item) => sum + item.value, 0);
  data.forEach(item => {
    item.percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
  });

  // If no data, show a default pie chart with 100% Food
  if (data.length === 0) {
    data.push({ name: 'Food', value: 1, color: COLORS.Food, percentage: 100 });
  }

  return (
    <>
      <ResponsiveContainer width="100%" height={150}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={60}
            innerRadius={0}
            paddingAngle={0}
            label={({ percentage }) => `${percentage}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
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
    </>
  );
};

export default ExpenseSummary;
