export type TaskStatus = "Pending" | "In Progress" | "Completed";
export type TaskPriority = "low" | "medium" | "high";
export type TaskCategory = "work" | "design" | "learning" | "personal";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  priority: TaskPriority;
  category: TaskCategory;
}

export interface TaskCounts {
  pending: number;
  inProgress: number;
  completed: number;
  total: number;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  priority: TaskPriority;
  category: TaskCategory;
}

export interface TaskContextType {
  tasks: Task[];
  addTask: (task: TaskFormData) => void;
  updateTask: (id: number, updatedTask: TaskFormData) => void;
  deleteTask: (id: number) => void;
  getTaskCounts: () => TaskCounts;
  currentView: "all" | "completed";
  setCurrentView: (view: "all" | "completed") => void;
}
