import { apiRequest } from "./api";

// Get all payroll records
export const getPayroll = () => {
  return apiRequest("/payroll");
};

// Get payroll by ID
export const getPayrollById = (id) => {
  return apiRequest(`/payroll/${id}`);
};

// Add payroll
export const addPayroll = (payrollData) => {
  return apiRequest("/payroll", {
    method: "POST",
    body: JSON.stringify(payrollData),
  });
};

// Update payroll
export const updatePayroll = (id, payrollData) => {
  return apiRequest(`/payroll/${id}`, {
    method: "PUT",
    body: JSON.stringify(payrollData),
  });
};

// Delete payroll
export const deletePayroll = (id) => {
  return apiRequest(`/payroll/${id}`, {
    method: "DELETE",
  });
};