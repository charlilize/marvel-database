import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const FormatPieChart = ({ data }) => {

  const formatCounts = data.data.results.reduce((counts, comic) => {
    const format = comic.format ? comic.format.trim() : "Unknown";
    counts[format] = (counts[format] || 0) + 1;
    return counts;
  }, {});
  
  const formatData = Object.entries(formatCounts).map(([format, count]) => ({
    name: format === "" ? "Unknown" : format,
    value: count,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#c1121f', '#ffcad4'];

  return (
    <ResponsiveContainer width="35%" height={360}>
    <PieChart className="bg-gray-800 rounded-lg">
      <Pie
        data={formatData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label
      >
        {formatData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend />
    </PieChart>
  </ResponsiveContainer>
  );
}

export default FormatPieChart;
