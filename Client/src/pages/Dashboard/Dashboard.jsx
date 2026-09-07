// import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
// import Sidebar from "../../components/dashboard/Sidebar";
// import Navbar from "../../components/dashboard/Navbar";
// import StatCard from "../../components/dashboard/StatCard";
// import { stats } from "../../data/dashboardData";
// function Dashboard() {
//   return (
//     <div className="flex">
//       <Sidebar />

//       <div className="flex-1 bg-slate-100 min-h-screen p-8">
//         <Navbar />
//         <WelcomeBanner />
          
//         <h1 className="text-4xl font-bold">
//           Dashboard
//         </h1>
        

//         <p className="text-gray-500 mt-2">
//           Welcome to CrewSync Dashboard
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import Sidebar from "../../components/dashboard/Sidebar";
import Navbar from "../../components/dashboard/Navbar";
import StatCard from "../../components/dashboard/StatCard";
import { stats } from "../../data/dashboardData";
import UpcomingHolidays from "../../components/dashboard/UpcomingHolidays";
import BirthdayCard from "../../components/dashboard/BirthdayCard";
import EmployeeTable from "../../components/dashboard/EmployeeTable";
import AttendanceChart from "../../components/dashboard/AttendanceChart";
import LeaveChart from "../../components/dashboard/LeaveChart";
import QuickActions from "../../components/dashboard/QuickActions";
import Footer from "../../components/common/Footer";
import { useEffect, useState } from "react";
import { getDashboardData } from "../../services/dashboardService";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await getDashboardData();

      console.log("Dashboard API Response:", data);

      setDashboardData(data);
    } catch (error) {
      console.error("Unable to load dashboard:", error);
      alert(error.message || "Unable to load dashboard");
    }
  };

  return (
    <div className="flex">

      {/* <Sidebar /> */}

      <div className="flex-1 bg-slate-100 min-h-screen p-8">

        {/* <Navbar /> */}

        <WelcomeBanner />

        {/* Stats Section */}
        {/* Stats Section */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
  {stats.map((item) => {
    let value = item.value;

    if (item.title === "Total Employees") {
      value = dashboardData?.employees?.total ?? item.value;
    }

    if (item.title === "Present Today") {
      value = dashboardData?.attendance?.present ?? item.value;
    }

    if (item.title === "On Leave") {
  value = dashboardData?.leaves?.total ?? 0;
}

    if (item.title === "Monthly Payroll") {
      const amount = dashboardData?.payroll?.totalAmount ?? 0;

      value =
        amount >= 100000
          ? `₹${(amount / 100000).toFixed(1)}L`
          : `₹${amount.toLocaleString("en-IN")}`;
    }

    return (
      <StatCard
        key={item.id}
        data={{
          ...item,
          value,
        }}
      />
    );
  })}
</div>

{/* Charts */}
<div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-6">

  <div className="xl:col-span-2">
    <AttendanceChart />
  </div>

  <LeaveChart />

</div>

{/* Bottom Section */}
<div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-8">

  <div className="xl:col-span-2">
    <EmployeeTable />
  </div>

  <UpcomingHolidays />

  <BirthdayCard />

</div> 
  <QuickActions />
  
      </div>

    </div>
  );
}


export default Dashboard;