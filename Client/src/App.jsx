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

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/employees" element={<EmployeeList />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;