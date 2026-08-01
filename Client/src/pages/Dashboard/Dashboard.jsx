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
function Dashboard() {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-slate-100 min-h-screen p-8">

        <Navbar />

        <WelcomeBanner />

        {/* Stats Section */}
        {/* Stats Section */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
  {stats.map((item) => (
    <StatCard key={item.id} data={item} />
  ))}
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