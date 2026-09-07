import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import { getAttendanceOverview } from "../../services/analyticsService";

function AttendanceChart() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const overview = await getAttendanceOverview();

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const formattedData = days.map((day) => {
  const item = overview.find(
    (record) => record.day.substring(0, 3) === day
  );

  return {
    day,
    present: Number(item?.present) || 0,
    absent: Number(item?.absent) || 0,
  };
});

setData(formattedData);
      } catch (error) {
        console.error("Error fetching attendance overview:", error);
      }
    };

    fetchData();
  }, []);

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