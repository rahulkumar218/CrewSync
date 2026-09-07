import { apiRequest } from "./api";

// Get dashboard data
export const getDashboardData = () => {
  return apiRequest("/dashboard");
};