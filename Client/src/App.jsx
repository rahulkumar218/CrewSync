// import Login from "./pages/Login/Login";

// function App() {
//   return <Login />;
// }

// export default App;

// import Dashboard from "./pages/Dashboard/Dashboard";

// function App() {
//   return <Dashboard />;
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import EmployeeList from "./pages/Employees/EmployeeList";
import MainLayout from "./layouts/MainLayout";
import Attendance from "./pages/Attendance/Attendance";
import LeavePage from "./pages/Leave/LeavePage";
import PayrollPage from "./pages/Payroll/PayrollPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login - Sidebar nahi chahiye */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />

        {/* Employees */}
        <Route
          path="/employees"
          element={
            <MainLayout>
              <EmployeeList />
            </MainLayout>
          }
        />
        <Route
  path="/attendance"
  element={
    <MainLayout>
      <Attendance />
    </MainLayout>
  }
/>

<Route
  path="/leave"
  element={
    <MainLayout>
      <LeavePage />
    </MainLayout>
  }
/>

<Route
  path="/payroll"
  element={
    <MainLayout>
      <PayrollPage />
    </MainLayout>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;