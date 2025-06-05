"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, Clock, AlertCircle, X } from "lucide-react";
import { io, Socket } from "socket.io-client";

interface Notification {
  id: string;
  type: "task_assigned" | "task_updated" | "task_completed" | "task_overdue";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

let socket: Socket;

export function NotificationPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    console.log(localStorage.getItem("token"));
    // Initialize socket only once
    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_API_SOCKET_URL, {
        auth: {
          token: localStorage.getItem("token"),
        },
      });
    }

    // Handle incoming notifications
    socket.on("task-assigned", (data) => {
      setNotifications((prev) => [
        {
          id: data.id || Date.now().toString(),
          type: "task_assigned",
          title: "New Task Assigned",
          message: data.message || "You have a new task",
          timestamp: new Date().toISOString(),
          read: false,
        },
        ...prev,
      ]);
    });

    socket.on("task-updated", (data) => {
      setNotifications((prev) => [
        {
          id: data.id || Date.now().toString(),
          type: "task_updated",
          title: "Task Status Updated",
          message: data.message || "A task was updated",
          timestamp: new Date().toISOString(),
          read: false,
        },
        ...prev,
      ]);
    });

    socket.on("task-completed", (data) => {
      setNotifications((prev) => [
        {
          id: data.id || Date.now().toString(),
          type: "task_completed",
          title: "Task Completed",
          message: data.message || "A task was completed",
          timestamp: new Date().toISOString(),
          read: false,
        },
        ...prev,
      ]);
    });

    socket.on("task-overdue", (data) => {
      setNotifications((prev) => [
        {
          id: data.id || Date.now().toString(),
          type: "task_overdue",
          title: "Task Overdue",
          message: data.message || "A task is overdue",
          timestamp: new Date().toISOString(),
          read: false,
        },
        ...prev,
      ]);
    });

    return () => {
      socket.off("task-assigned");
      socket.off("task-updated");
      socket.off("task-completed");
      socket.off("task-overdue");
    };
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "task_assigned":
        return <Bell className="h-4 w-4 text-blue-600" />;
      case "task_updated":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "task_completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "task_overdue":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const notifTime = new Date(timestamp);
    const diffInMinutes = Math.floor(
      (now.getTime() - notifTime.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Notifications
          </CardTitle>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {unreadCount}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground text-sm">
              No notifications yet
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border transition-colors ${
                  notification.read
                    ? "bg-gray-50 border-gray-200"
                    : "bg-blue-50 border-blue-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2 flex-1">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatTimestamp(notification.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 ml-2">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="h-6 w-6 p-0"
                      >
                        <CheckCircle className="h-3 w-3" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeNotification(notification.id)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
