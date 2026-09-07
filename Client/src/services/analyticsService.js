import { apiRequest } from "./api";

// Get analytics summary
export const getAnalyticsSummary = () => {
  return apiRequest("/analytics/summary");
};

// Get attendance overview
export const getAttendanceOverview = () => {
  return apiRequest("/analytics/attendance");
};

// Get leave distribution
export const getLeaveDistribution = () => {
  return apiRequest("/analytics/leave-distribution");
};

// Get employee growth
export const getEmployeeGrowth = () => {
  return apiRequest("/analytics/employee-growth");
};

// Get department performance
export const getDepartmentPerformance = () => {
  return apiRequest("/analytics/department-performance");
};