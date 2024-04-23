import axios from "axios";

const API_SERVER_URL = "http://localhost:3000";


//Project Routes

export const fetchAllProjects = async () => {
  const resp = await axios.get(`${API_SERVER_URL}/project`);
  return resp.data;
};

export const fetchProjectById = async (projectId) => {
  const resp = await axios.get(`${API_SERVER_URL}/project/${projectId}`);
  return resp.data;
};

export const createProject = async (projectData) => {
  const resp = await axios.post(`${API_SERVER_URL}/project`, projectData);
  return resp.data;
};

export const updateProject = async (projectId, updatedData) => {
  const resp = await axios.put(`${API_SERVER_URL}/project/${projectId}`, updatedData);
  return resp.data;
};

export const deleteProject = async (projectId) => {
  const resp = await axios.delete(`${API_SERVER_URL}/project/${projectId}`);
  return resp.data;
};


//Task Routes

export const fetchAllTasks = async (projectId) => {
  const resp = await axios.get(`${API_SERVER_URL}/project/${projectId}/tasks`);
  return resp.data;
};

export const fetchTaskById = async (projectId, taskId) => {
  const resp = await axios.get(`${API_SERVER_URL}/project/${projectId}/tasks/${taskId}`);
  return resp.data;
};

export const createTask = async (projectId, taskData) => {
  const resp = await axios.post(`${API_SERVER_URL}/project/${projectId}/Tasks`, taskData);
  return resp.data;
};

export const updateTask = async (projectId, taskId, updatedData) => {
  const resp = await axios.put(`${API_SERVER_URL}/project/${projectId}/tasks/${taskId}`, updatedData);
  return resp.data;
};

export const deleteTask = async (projectId, taskId) => {
  const resp = await axios.delete(`${API_SERVER_URL}/project/${projectId}/tasks/${taskId}`);
  return resp.data;
};
