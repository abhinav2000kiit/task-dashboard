import React, { useState } from "react";
import { Edit2, Trash2, Calendar, Flame, Zap, Star } from "lucide-react";
import { Task, TaskStatus, TaskPriority, TaskCategory } from "../types/task";
import { useTasks } from "../context/TaskProvider";
import TaskForm from "./TaskForm";

interface TaskCardProps {
  task: Task;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  const { updateTask, deleteTask } = useTasks();
  const [showEditForm, setShowEditForm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getStatusGradient = (status: TaskStatus) => {
    switch (status) {
      case "Completed":
        return "from-green-400 via-emerald-500 to-teal-500";
      case "In Progress":
        return "from-blue-400 via-cyan-500 to-sky-500";
      default:
        return "from-orange-400 via-yellow-500 to-amber-500";
    }
  };

  const getPriorityGradient = (priority: TaskPriority) => {
    switch (priority) {
      case "high":
        return "from-red-500 to-pink-500";
      case "medium":
        return "from-yellow-500 to-orange-500";
      default:
        return "from-green-500 to-emerald-500";
    }
  };

  const getCategoryColor = (category: TaskCategory) => {
    const colors = {
      work: "from-purple-500 to-indigo-500",
      design: "from-pink-500 to-rose-500",
      learning: "from-blue-500 to-cyan-500",
      personal: "from-emerald-500 to-teal-500",
    };
    return colors[category] || colors.work;
  };

  const categoryEmojis: Record<TaskCategory, string> = {
    work: "💼",
    design: "🎨",
    learning: "📚",
    personal: "🌟",
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleEdit = (formData: Omit<Task, "id">) => {
    updateTask(task.id, formData);
    setShowEditForm(false);
  };

  return (
    <>
      <div
        className={`relative bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl p-6 border border-white border-opacity-20 shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1 cursor-pointer transform ${
          isHovered ? "shadow-3xl" : ""
        }`}
        style={{
          animationDelay: `${index * 0.1}s`,
          animation: "slideInUp 0.6s ease-out forwards",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${getStatusGradient(
            task.status
          )} rounded-3xl opacity-10 animate-pulse`}
        />

        {/* Priority indicator */}
        <div
          className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r ${getPriorityGradient(
            task.priority
          )} rounded-full shadow-lg animate-bounce`}
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 bg-gradient-to-r ${getCategoryColor(
                  task.category
                )} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}
              >
                {categoryEmojis[task.category]}
              </div>
              <div>
                <h3 className="font-bold text-white text-xl mb-1 leading-tight">
                  {task.title}
                </h3>
                <div
                  className={`inline-block px-3 py-1 bg-gradient-to-r ${getStatusGradient(
                    task.status
                  )} rounded-full text-white text-sm font-semibold shadow-lg`}
                >
                  {task.status}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowEditForm(true)}
                className="p-3 bg-white bg-opacity-20 backdrop-blur-sm text-white hover:bg-opacity-30 rounded-xl transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="p-3 bg-red-500 bg-opacity-20 backdrop-blur-sm text-red-300 hover:bg-opacity-30 rounded-xl transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {task.description && (
            <p className="text-white text-opacity-90 mb-6 text-lg leading-relaxed">
              {task.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white text-opacity-80">
              <Calendar className="w-5 h-5" />
              <span className="font-semibold">{formatDate(task.dueDate)}</span>
            </div>

            <div className="flex items-center gap-2">
              {task.priority === "high" && (
                <Flame className="w-5 h-5 text-red-400 animate-pulse" />
              )}
              {task.priority === "medium" && (
                <Zap className="w-5 h-5 text-yellow-400" />
              )}
              {task.priority === "low" && (
                <Star className="w-5 h-5 text-green-400" />
              )}
            </div>
          </div>
        </div>
      </div>

      {showEditForm && (
        <TaskForm
          task={task}
          onSubmit={handleEdit}
          onCancel={() => setShowEditForm(false)}
        />
      )}

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default TaskCard;
