"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Task, TaskFormData, TaskContextType } from "../types/task";

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentView, setCurrentView] = useState<"all" | "completed">("all");

  // Initialize with sample data
  useEffect(() => {
    const sampleTasks: Task[] = [
      {
        id: 1,
        title: "🚀 Launch new feature",
        description:
          "Deploy the AI-powered analytics dashboard with real-time insights",
        status: "In Progress",
        dueDate: "2025-06-15",
        priority: "high",
        category: "work",
      },
      {
        id: 2,
        title: "🎨 Design system update",
        description: "Refresh brand colors and create new component library",
        status: "Pending",
        dueDate: "2025-06-10",
        priority: "medium",
        category: "design",
      },
      {
        id: 3,
        title: "📚 Learn Three.js",
        description:
          "Complete the 3D web development course and build a portfolio project",
        status: "Completed",
        dueDate: "2025-05-28",
        priority: "low",
        category: "learning",
      },
    ];
    setTasks(sampleTasks);
  }, []);

  const addTask = (task: TaskFormData) => {
    const newTask: Task = {
      ...task,
      id: Date.now(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id: number, updatedTask: TaskFormData) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const getTaskCounts = () => {
    return {
      pending: tasks.filter((t) => t.status === "Pending").length,
      inProgress: tasks.filter((t) => t.status === "In Progress").length,
      completed: tasks.filter((t) => t.status === "Completed").length,
      total: tasks.length,
    };
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        getTaskCounts,
        currentView,
        setCurrentView,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use task context
export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
