import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  X,
  Pencil,
  Trash2,
  Eye,
  Clock3,
  Users,
  UserCheck,
  UserMinus,
  BriefcaseBusiness,
} from "lucide-react";


import employeeBanner from "../../assets/images/employee-banner.png";

function EmployeeList() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Binita Biswas",
      email: "binita@crewsync.com",
      phone: "+91 98765 43210",
      department: "HR",
      role: "HR Manager",
      status: "Active",
      joinDate: "12 Jan 2025",
    },
    {
      id: 2,
      name: "Rahul Sharma",
      email: "rahul@crewsync.com",
      phone: "+91 98765 12345",
      department: "IT",
      role: "Software Engineer",
      status: "On Leave",
      joinDate: "18 Mar 2024",
    },
    {
      id: 3,
      name: "Priya Sharma",
      email: "priya@crewsync.com",
      phone: "+91 98765 67890",
      department: "Design",
      role: "UI Designer",
      status: "Active",
      joinDate: "05 Jun 2025",
    },
    {
      id: 4,
      name: "Aman Verma",
      email: "aman@crewsync.com",
      phone: "+91 98765 11223",
      department: "Finance",
      role: "Financial Analyst",
      status: "Active",
      joinDate: "21 Aug 2024",
    },
    {
      id: 5,
      name: "Sneha Singh",
      email: "sneha@crewsync.com",
      phone: "+91 98765 44556",
      department: "Marketing",
      role: "Marketing Executive",
      status: "Inactive",
      joinDate: "11 Feb 2023",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] =
    useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "IT",
    role: "",
    status: "Active",
    joinDate: "",
  });

  // =========================
  // Statistics
  // =========================

  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const onLeaveEmployees = employees.filter(
    (employee) => employee.status === "On Leave"
  ).length;

  const inactiveEmployees = employees.filter(
    (employee) => employee.status === "Inactive"
  ).length;

  // =========================
  // Search + Filters
  // =========================

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        employee.name.toLowerCase().includes(search) ||
        employee.email.toLowerCase().includes(search) ||
        employee.role.toLowerCase().includes(search);

      const matchesDepartment =
        departmentFilter === "All Departments" ||
        employee.department === departmentFilter;

      const matchesStatus =
        statusFilter === "All Status" ||
        employee.status === statusFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [
    employees,
    searchTerm,
    departmentFilter,
    statusFilter,
  ]);

  // =========================
  // Open Add Modal
  // =========================

  const openAddModal = () => {
    setEditingEmployee(null);

    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "IT",
      role: "",
      status: "Active",
      joinDate: "",
    });

    setShowModal(true);
  };

  // =========================
  // Open Edit Modal
  // =========================

  const openEditModal = (employee) => {
    setEditingEmployee(employee);

    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      role: employee.role,
      status: employee.status,
      joinDate: employee.joinDate,
    });

    setShowModal(true);
  };

  // =========================
  // Form Input
  // =========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // Add / Update Employee
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.role ||
      !formData.joinDate
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingEmployee) {
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === editingEmployee.id
            ? {
                ...employee,
                ...formData,
              }
            : employee
        )
      );
    } else {
      const newEmployee = {
        id: Date.now(),
        ...formData,
      };

      setEmployees((prevEmployees) => [
        ...prevEmployees,
        newEmployee,
      ]);
    }

    setShowModal(false);
  };

  // =========================
  // Delete Employee
  // =========================

  const deleteEmployee = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    setEmployees((prevEmployees) =>
      prevEmployees.filter(
        (employee) => employee.id !== id
      )
    );
  };

  // =========================
  // Status Badge
  // =========================

  const getStatusStyle = (status) => {
    if (status === "Active") {
      return "bg-emerald-50 text-emerald-600 border border-emerald-100";
    }

    if (status === "On Leave") {
      return "bg-amber-50 text-amber-600 border border-amber-100";
    }

    return "bg-red-50 text-red-500 border border-red-100";
  };

  return (
    <div className="space-y-6 pb-10">

      {/* ========================================= */}
      {/* PAGE HEADER / BANNER */}
      {/* ========================================= */}

      <div
        className="group relative overflow-hidden rounded-3xl min-h-[250px] flex items-center px-8 md:px-10 shadow-xl transition-all duration-500 hover:shadow-2xl"
        style={{
          backgroundImage: `linear-gradient(110deg, rgba(91,33,182,0.92), rgba(79,70,229,0.78), rgba(37,99,235,0.70)), url(${employeeBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        {/* Animated circles */}

        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl transition-transform duration-700 group-hover:scale-125" />

        <div className="absolute -bottom-20 right-40 h-44 w-44 rounded-full bg-violet-300/10 blur-3xl transition-transform duration-700 group-hover:-translate-y-5" />

        <div className="relative z-10 max-w-2xl text-white">

          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-md">
            <Users size={17} />
            Employee Management
          </div>

          <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
            Manage Your Workforce 👨‍💼
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-violet-100 md:text-base">
            Manage employees, departments, roles and workforce
            activity from one powerful dashboard.
          </p>

          <button
            onClick={openAddModal}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-violet-50 hover:shadow-xl"
          >
            <Plus size={18} />
            Add Employee
          </button>

        </div>

        {/* Total Employees */}

        <div className="absolute right-8 bottom-8 hidden rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-white backdrop-blur-md lg:block transition-all duration-500 hover:bg-white/20 hover:-translate-y-1">

          <p className="text-sm text-violet-100">
            Total Employees
          </p>

          <p className="mt-1 text-4xl font-bold">
            {totalEmployees}
          </p>

        </div>

      </div>


      {/* ========================================= */}
      {/* STATISTICS */}
      {/* ========================================= */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total */}

        <div className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Total Employees
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {totalEmployees}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                Workforce
              </p>
            </div>

            <div className="rounded-2xl bg-violet-50 p-4 text-violet-600 transition-transform duration-300 group-hover:scale-110">
              <Users size={25} />
            </div>

          </div>

        </div>


        {/* Active */}

        <div className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Active Employees
              </p>

              <h2 className="mt-2 text-3xl font-bold text-emerald-500">
                {activeEmployees}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                Currently working
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-4 text-emerald-500 transition-transform duration-300 group-hover:scale-110">
              <UserCheck size={25} />
            </div>

          </div>

        </div>


        {/* On Leave */}

        <div className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                On Leave
              </p>

              <h2 className="mt-2 text-3xl font-bold text-amber-500">
                {onLeaveEmployees}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                Currently away
              </p>
            </div>

            <div className="rounded-2xl bg-amber-50 p-4 text-amber-500 transition-transform duration-300 group-hover:scale-110">
              <Clock3 size={25} />
            </div>

          </div>

        </div>


        {/* Inactive */}

        <div className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Inactive
              </p>

              <h2 className="mt-2 text-3xl font-bold text-red-500">
                {inactiveEmployees}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                Not active
              </p>
            </div>

            <div className="rounded-2xl bg-red-50 p-4 text-red-500 transition-transform duration-300 group-hover:scale-110">
              <UserMinus size={25} />
            </div>

          </div>

        </div>

      </div>


      {/* ========================================= */}
      {/* EMPLOYEE DIRECTORY */}
      {/* ========================================= */}

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">

        {/* Header */}

        <div className="flex flex-col gap-4 border-b border-slate-100 p-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="flex items-center gap-2">

              <BriefcaseBusiness
                size={21}
                className="text-violet-600"
              />

              <h2 className="text-xl font-bold text-slate-800">
                Employee Directory
              </h2>

            </div>

            <p className="mt-1 text-sm text-slate-500">
              Search, filter and manage your workforce.
            </p>

          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-lg"
          >
            <Plus size={18} />
            Add Employee
          </button>

        </div>


        {/* Search + Filters */}

        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 md:flex-row md:items-center md:justify-between">

          <div className="relative w-full md:max-w-md">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              placeholder="Search employee..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition-all focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />

          </div>


          <div className="flex flex-col gap-3 sm:flex-row">

            <select
              value={departmentFilter}
              onChange={(e) =>
                setDepartmentFilter(e.target.value)
              }
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none transition-all focus:border-violet-500 focus:bg-white"
            >
              <option>All Departments</option>
              <option>HR</option>
              <option>IT</option>
              <option>Design</option>
              <option>Finance</option>
              <option>Marketing</option>
            </select>


            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none transition-all focus:border-violet-500 focus:bg-white"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>On Leave</option>
              <option>Inactive</option>
            </select>

          </div>

        </div>


        {/* Employee Table */}

        <div className="w-full overflow-x-auto">

          <table className="w-full min-w-[1000px]">

            <thead>

              <tr className="border-b border-slate-100 bg-slate-50/70 text-left text-sm text-slate-500">

                <th className="px-6 py-4 font-medium">
                  Employee
                </th>

                <th className="px-6 py-4 font-medium">
                  Department
                </th>

                <th className="px-6 py-4 font-medium">
                  Role
                </th>

                <th className="px-6 py-4 font-medium">
                  Join Date
                </th>

                <th className="px-6 py-4 font-medium">
                  Status
                </th>

                <th className="px-6 py-4 text-right font-medium">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredEmployees.map((employee) => (

                <tr
                  key={employee.id}
                  className="group border-b border-slate-50 transition-all duration-300 hover:bg-violet-50/40"
                >

                  {/* Employee */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 font-bold text-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                        {employee.name
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>

                        <p className="font-semibold text-slate-800">
                          {employee.name}
                        </p>

                        <p className="text-xs text-slate-400">
                          {employee.email}
                        </p>

                      </div>

                    </div>

                  </td>


                  {/* Department */}

                  <td className="px-6 py-5 text-sm text-slate-600">
                    {employee.department}
                  </td>


                  {/* Role */}

                  <td className="px-6 py-5 text-sm text-slate-600">
                    {employee.role}
                  </td>


                  {/* Join Date */}

                  <td className="px-6 py-5 text-sm text-slate-600">
                    {employee.joinDate}
                  </td>


                  {/* Status */}

                  <td className="px-6 py-5">

                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                        employee.status
                      )}`}
                    >
                      {employee.status}
                    </span>

                  </td>


                  {/* Actions */}

                  <td className="px-6 py-5">

                    <div className="flex justify-end gap-2">

                      <button
                        onClick={() =>
                          setSelectedEmployee(employee)
                        }
                        title="View"
                        className="rounded-lg bg-slate-100 p-2 text-slate-600 transition-all duration-200 hover:scale-110 hover:bg-violet-100 hover:text-violet-600"
                      >
                        <Eye size={17} />
                      </button>


                      <button
                        onClick={() =>
                          openEditModal(employee)
                        }
                        title="Edit"
                        className="rounded-lg bg-blue-50 p-2 text-blue-600 transition-all duration-200 hover:scale-110 hover:bg-blue-100"
                      >
                        <Pencil size={17} />
                      </button>


                      <button
                        onClick={() =>
                          deleteEmployee(employee.id)
                        }
                        title="Delete"
                        className="rounded-lg bg-red-50 p-2 text-red-500 transition-all duration-200 hover:scale-110 hover:bg-red-100"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>


          {/* No Results */}

          {filteredEmployees.length === 0 && (

            <div className="px-6 py-16 text-center">

              <Users
                size={42}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 font-semibold text-slate-700">
                No employees found
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Try changing your search or filters.
              </p>

            </div>

          )}

        </div>

      </div>


      {/* ========================================= */}
      {/* ADD / EDIT MODAL */}
      {/* ========================================= */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl animate-[fadeIn_0.25s_ease-out]">

            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-slate-100 p-6">

              <div>

                <h2 className="text-xl font-bold text-slate-800">
                  {editingEmployee
                    ? "Edit Employee"
                    : "Add New Employee"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingEmployee
                    ? "Update employee information."
                    : "Add a new employee to your workforce."}
                </p>

              </div>


              <button
                onClick={() => setShowModal(false)}
                className="rounded-xl bg-slate-100 p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-500"
              >
                <X size={20} />
              </button>

            </div>


            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2"
            >

              {/* Name */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full Name *
                </label>

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter employee name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                />

              </div>


              {/* Email */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email *
                </label>

                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="employee@crewsync.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                />

              </div>


              {/* Phone */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Phone
                </label>

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                />

              </div>


              {/* Department */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Department
                </label>

                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                >
                  <option>HR</option>
                  <option>IT</option>
                  <option>Design</option>
                  <option>Finance</option>
                  <option>Marketing</option>
                </select>

              </div>


              {/* Role */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Role *
                </label>

                <input
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Software Engineer"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                />

              </div>


              {/* Join Date */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Joining Date *
                </label>

                <input
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleChange}
                  placeholder="12 Jan 2026"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                />

              </div>


              {/* Status */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                >
                  <option>Active</option>
                  <option>On Leave</option>
                  <option>Inactive</option>
                </select>

              </div>


              {/* Buttons */}

              <div className="flex items-center justify-end gap-3 md:col-span-2">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-lg"
                >
                  <Plus size={17} />

                  {editingEmployee
                    ? "Update Employee"
                    : "Add Employee"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* ========================================= */}
      {/* VIEW EMPLOYEE MODAL */}
      {/* ========================================= */}

      {selectedEmployee && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">

            <div className="flex items-start justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-xl font-bold text-white">
                  {selectedEmployee.name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>

                  <h2 className="font-bold text-slate-800">
                    {selectedEmployee.name}
                  </h2>

                  <p className="text-sm text-slate-500">
                    {selectedEmployee.role}
                  </p>

                </div>

              </div>


              <button
                onClick={() =>
                  setSelectedEmployee(null)
                }
                className="rounded-xl bg-slate-100 p-2 text-slate-500 hover:bg-red-50 hover:text-red-500"
              >
                <X size={19} />
              </button>

            </div>


            <div className="mt-6 space-y-4">

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">
                  Email
                </p>
                <p className="mt-1 text-sm font-medium text-slate-700">
                  {selectedEmployee.email}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">
                  Phone
                </p>
                <p className="mt-1 text-sm font-medium text-slate-700">
                  {selectedEmployee.phone}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    Department
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {selectedEmployee.department}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    Status
                  </p>

                  <span
                    className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                      selectedEmployee.status
                    )}`}
                  >
                    {selectedEmployee.status}
                  </span>
                </div>

              </div>

            </div>


            <button
              onClick={() =>
                setSelectedEmployee(null)
              }
              className="mt-6 w-full rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default EmployeeList;