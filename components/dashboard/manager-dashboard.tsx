"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TaskForm } from "@/components/task/task-form";
import { TaskCard } from "@/components/task/task-card";
import { NotificationPanel } from "@/components/notifications/notification-panel";
import { Plus, CheckSquare, Clock, AlertCircle } from "lucide-react";
import { EmployeeType, TaskType, UserType } from "@/types";
import {
  createTaskApi,
  deleteTask,
  getEmployeesApi,
  getTasks,
  updateTasks,
} from "@/lib/api";

export function ManagerDashboard() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [employees, setEmployees] = useState<EmployeeType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getEmployees();
    handleGetTasks();
  }, []);

  const getEmployees = async () => {
    setIsLoading(true);
    try {
      const [data, err] = await getEmployeesApi();
      if (err) {
        throw err;
      }
      setEmployees(data);
    } catch (err: any) {
      setError(`Can Not get Employees` + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetTasks = async () => {
    setIsLoading(true);
    try {
      const [data, err] = await getTasks();
      if (err) {
        throw err;
      }

      setTasks(data);
    } catch (err: any) {
      setError(`can not get tasks` + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (
    taskData: Omit<TaskType, "_id" | "createdAt" | "updatedAt" | "createdBy">
  ) => {
    setIsLoading(true);
    try {
      const newTask = {
        ...taskData,
      };
      const [data, err] = await createTaskApi(newTask);
      if (err) {
        throw err;
      }
      setTasks((prev) => [data, ...prev]);
      setShowTaskForm(false);
    } catch (err: any) {
      setError(`Task is not Created` + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTask = async (
    taskId: string,
    updates: Partial<TaskType>
  ) => {
    setIsLoading(true);
    try {
      const [data, err] = await updateTasks(taskId, updates);
      if (err) {
        throw err;
      }
      setTasks((prev) =>
        prev.map((task) =>
          task._id === data._id ? { ...task, ...data } : task
        )
      );
    } catch (err: any) {
      setError(`Task in Not Updated ` + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    setIsLoading(true);
    try {
      const [data, err] = await deleteTask(taskId);
      if (err) {
        throw err;
      }
      setTasks((prev) => prev.filter((task) => task._id !== data?._id));
    } catch (err: any) {
      setError(`Task in Not Updated ` + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "Completed").length;
    const inProgress = tasks.filter((t) => t.status === "In Progress").length;
    const pending = tasks.filter((t) => t.status === "Pending").length;
    const overdue = tasks.filter(
      (t) => new Date(t.dueDate) < new Date() && t.status !== "Completed"
    ).length;

    return { total, completed, inProgress, pending, overdue };
  };

  const stats = getTaskStats();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Manager Dashboard</h1>
          <p className="text-muted-foreground">
            Manage tasks and monitor team progress
          </p>
        </div>
        <Button onClick={() => setShowTaskForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckSquare className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.completed}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats.inProgress}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats.overdue}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tasks List */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>All Tasks</CardTitle>
              <CardDescription>
                Manage and monitor all team tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No tasks created yet. Click "Create Task" to get started.
                  </div>
                ) : (
                  tasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onUpdate={handleUpdateTask}
                      onDelete={handleDeleteTask}
                      isManager={true}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications Panel */}
        <div className="lg:col-span-1">
          <NotificationPanel />
        </div>
      </div>

      {/* Task Creation Form Modal */}
      {showTaskForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <TaskForm
              employees={employees}
              onSubmit={handleCreateTask}
              onCancel={() => setShowTaskForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
