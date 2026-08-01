import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Casual Leave", value: 12 },
  { name: "Sick Leave", value: 8 },
  { name: "Earned Leave", value: 6 },
  { name: "Unpaid Leave", value: 2 },
];

const COLORS = [
  "#6D5BFF",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
];

function LeaveChart() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm h-[380px]">

      <h2 className="text-xl font-semibold mb-6">
        Leave Overview
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}

export default LeaveChart;