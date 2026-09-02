import { apiRequest } from "./api";

// GET all attendance
export const getAttendance = () => {
  return apiRequest("/attendance");
};

// ADD attendance
export const addAttendance = (attendanceData) => {
  return apiRequest("/attendance", {
    method: "POST",
    body: JSON.stringify(attendanceData),
  });
};

// UPDATE attendance
export const updateAttendance = (id, attendanceData) => {
  return apiRequest(`/attendance/${id}`, {
    method: "PUT",
    body: JSON.stringify(attendanceData),
  });
};

// DELETE attendance
export const deleteAttendance = (id) => {
  return apiRequest(`/attendance/${id}`, {
    method: "DELETE",
  });
};