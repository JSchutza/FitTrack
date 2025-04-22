import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const ChartPanel = ({ title, type, data }) => {
  // Colors for pie chart
  const COLORS = ['#0284c7', '#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd'];

  // Format date for x-axis (e.g., "2023-01-01" to "Jan 01")
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' }).format(date);
  };

  // Format data for bar chart
  const formatBarData = (weeklyData) => {
    if (!weeklyData || !weeklyData.length) return [];
    
    return weeklyData.map((item) => ({
      date: formatDate(item._id),
      minutes: item.minutes,
      workouts: item.count,
    }));
  };

  // Format data for pie chart
  const formatPieData = (typeData) => {
    if (!typeData || !typeData.length) return [];

    return typeData.map((item) => ({
      name: item._id.charAt(0).toUpperCase() + item._id.slice(1), // Capitalize
      value: item.minutes,
      count: item.count,
    }));
  };

  // Custom tooltip for pie chart
  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-secondary-200 shadow-lg rounded-md">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-secondary-600">
            Minutes: <span className="font-medium">{payload[0].payload.value}</span>
          </p>
          <p className="text-secondary-600">
            Workouts: <span className="font-medium">{payload[0].payload.count}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for bar chart
  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-secondary-200 shadow-lg rounded-md">
          <p className="font-semibold">{label}</p>
          <p className="text-secondary-600">
            Minutes: <span className="font-medium">{payload[0].value}</span>
          </p>
          <p className="text-secondary-600">
            Workouts: <span className="font-medium">{payload[0].payload.workouts}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    if (type === 'bar') {
      const barData = formatBarData(data);
      
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomBarTooltip />} />
            <Legend />
            <Bar dataKey="minutes" name="Minutes" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
      );
    } else if (type === 'pie') {
      const pieData = formatPieData(data);
      
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomPieTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    }
    
    return <div>Unsupported chart type</div>;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-secondary-800 mb-4">{title}</h3>
      {(!data || data.length === 0) ? (
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-secondary-500 text-center">No data available</p>
        </div>
      ) : (
        renderChart()
      )}
    </div>
  );
};

ChartPanel.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['bar', 'pie']).isRequired,
  data: PropTypes.array,
};

export default ChartPanel; 