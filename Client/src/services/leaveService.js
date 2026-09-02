import { apiRequest } from "./api";

export const getLeaves = () => {
  return apiRequest("/leaves");
};

export const getLeaveById = (id) => {
  return apiRequest(`/leaves/${id}`);
};

export const addLeave = (leaveData) => {
  return apiRequest("/leaves", {
    method: "POST",
    body: JSON.stringify(leaveData),
  });
};

export const updateLeave = (id, leaveData) => {
  return apiRequest(`/leaves/${id}`, {
    method: "PUT",
    body: JSON.stringify(leaveData),
  });
};

export const deleteLeave = (id) => {
  return apiRequest(`/leaves/${id}`, {
    method: "DELETE",
  });
};