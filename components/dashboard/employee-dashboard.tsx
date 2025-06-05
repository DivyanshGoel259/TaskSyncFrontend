"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TaskCard } from "@/components/task/task-card";
import { NotificationPanel } from "@/components/notifications/notification-panel";
import { CheckSquare, Clock } from "lucide-react";
import { TaskType, UserType } from "@/types";
import { globalState } from "@/lib/store";
import {
  getTasksAssignedToEmployee,
  updateTasks,
  updateTasksEmployee,
} from "@/lib/api";

export function EmployeeDashboard() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const { user } = globalState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handlegetTasks = async () => {
    setIsLoading(true);
    setError("");
    try {
      const [data, err] = await getTasksAssignedToEmployee();
      if (err) {
        throw err;
      }
      setTasks(data);
    } catch (err: any) {
      setError(`Can not get Tasks` + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handlegetTasks();
  }, []);

  const handleUpdateTask = async (
    taskId: string,
    updates: Partial<TaskType>
  ) => {
    setIsLoading(true);
    try {
      const [data, err] = await updateTasksEmployee(taskId, updates);
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
      <div>
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <p className="text-muted-foreground">
          View and update your assigned tasks
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tasks List */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>My Assigned Tasks</CardTitle>
              <CardDescription>
                Tasks assigned to you by managers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No tasks assigned yet.
                  </div>
                ) : (
                  tasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onUpdate={handleUpdateTask}
                      isManager={false}
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
    </div>
  );
}
