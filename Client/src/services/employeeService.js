import { apiRequest } from "./api";

// GET Employees
export const getEmployees = () => {
  return apiRequest("/employees");
};

// ADD Employee
export const addEmployee = (employeeData) => {
  return apiRequest("/employees", {
    method: "POST",
    body: JSON.stringify(employeeData),
  });
};

// UPDATE Employee
export const updateEmployee = (id, employeeData) => {
  return apiRequest(`/employees/${id}`, {
    method: "PUT",
    body: JSON.stringify(employeeData),
  });
};

// DELETE Employee
export const deleteEmployee = (id) => {
  return apiRequest(`/employees/${id}`, {
    method: "DELETE",
  });
};