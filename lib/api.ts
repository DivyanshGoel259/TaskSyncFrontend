import { post, put, get, del } from "./network";
import { EmployeeType, TaskType, UserType } from "../types";
import { headers } from "next/headers";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const loginApi = async (userInfo: {
  email: string;
  password: string;
}) => {
  try {
    const response = await post(`${apiUrl}/api/v1/auth/login`, userInfo);
    localStorage.setItem("token", `Bearer ${response.token}`);
    const data = response.user;
    return [data, null] as [UserType, null];
  } catch (err: any) {
    return [null, err] as [null, Error];
  }
};

export const registerApi = async (userInfo: {
  email: string;
  password: string;
  role: "Manager" | "Employee";
  name: string;
}) => {
  try {
    const response = await post(`${apiUrl}/api/v1/auth/register`, userInfo);
    localStorage.setItem("token", `Bearer ${response.token}`);
    const data = response.user;
    return [data, null] as [UserType, null];
  } catch (err: any) {
    return [null, err] as [null, Error];
  }
};

export const getTasksAssignedToEmployee = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("You are unauthorized");
    }
    const data = await get(`${apiUrl}/api/v1/employee/my-tasks`, {
      headers: { Authorization: token },
    });

    return [data, null] as [TaskType[], null];
  } catch (err: any) {
    return [null, err] as [null, Error];
  }
};

export const getTasks = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("You are unauthorized");
    }
    const data = await get(`${apiUrl}/api/v1/manager/created`, {
      headers: { Authorization: token },
    });

    return [data, null] as [TaskType[], null];
  } catch (err: any) {
    return [null, err] as [null, Error];
  }
};

export const updateTasks = async (
  taskId: string,
  updates: Partial<TaskType>
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("You are unauthorized");
    }
    const data = await put(`${apiUrl}/api/v1/manager/${taskId}`, updates, {
      headers: { Authorization: token },
    });
    return [data, null] as [TaskType, null];
  } catch (err) {
    return [null, err] as [null, Error];
  }
};

export const updateTasksEmployee = async (
  taskId: string,
  updates: Partial<TaskType>
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("You are unauthorized");
    }
    const data = await put(
      `${apiUrl}/api/v1/employee/${taskId}/status`,
      updates,
      { headers: { Authorization: token } }
    );
    return [data, null] as [TaskType, null];
  } catch (err) {
    return [null, err] as [null, Error];
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("You are unauthorized");
    }
    const data = await del(`${apiUrl}/api/v1/manager/${taskId}`, {
      headers: { Authorization: token },
    });

    return [data, null] as [TaskType, null];
  } catch (err: any) {
    return [null, err] as [null, Error];
  }
};

export const createTaskApi = async (
  taskData: Omit<TaskType, "_id" | "createdAt" | "updatedAt" | "createdBy">
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("You are unauthorized");
    }
    const data = await post(`${apiUrl}/api/v1/manager/create`, taskData, {
      headers: { Authorization: token },
    });
    return [data, null] as [TaskType, null];
  } catch (err: any) {
    return [null, err] as [null, Error];
  }
};

export const getEmployeesApi = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("You are unauthorized");
    }
    const data = await get(`${apiUrl}/api/v1/auth/employees`, {
      headers: { Authorization: token },
    });

    return [data, null] as [EmployeeType[], null];
  } catch (err: any) {
    return [null, err] as [null, Error];
  }
};
