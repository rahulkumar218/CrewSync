import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", present: 220, absent: 18 },
  { day: "Tue", present: 230, absent: 14 },
  { day: "Wed", present: 225, absent: 20 },
  { day: "Thu", present: 240, absent: 12 },
  { day: "Fri", present: 235, absent: 16 },
  { day: "Sat", present: 180, absent: 10 },
];

function AttendanceChart() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm h-[380px]">
      <h2 className="text-xl font-semibold mb-6">
        Attendance Overview
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="present"
            fill="#6D5BFF"
            radius={[8, 8, 0, 0]}
          />

          <Bar
            dataKey="absent"
            fill="#F97316"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AttendanceChart;