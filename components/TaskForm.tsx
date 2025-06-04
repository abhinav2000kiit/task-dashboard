import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Filter,
  Sparkles,
  Zap,
  Target,
  Trophy,
  Star,
  Flame,
  Diamond,
  Heart,
} from "lucide-react";
import { Task, TaskFormData } from "../types/task";

interface TaskFormProps {
  task?: Task;
  onSubmit: (formData: TaskFormData) => void;
  onCancel: () => void;
}

interface FormErrors {
  title?: string;
  dueDate?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "Pending",
    dueDate: task?.dueDate || "",
    priority: task?.priority || "medium",
    category: task?.category || "work",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const priorityColors = {
    low: "from-green-400 to-emerald-500",
    medium: "from-yellow-400 to-orange-500",
    high: "from-red-400 to-pink-500",
  };

  const categoryIcons = {
    work: "💼",
    design: "🎨",
    learning: "📚",
    personal: "🌟",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white bg-opacity-20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white border-opacity-20 w-full max-w-lg transform transition-all duration-300 hover:scale-105">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {task ? "✨ Edit Task" : "🚀 Create New Task"}
            </h3>
            <p className="text-white text-opacity-70">Make it amazing!</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2 text-lg">
                Task Title ✨
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className={`w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm border-2 rounded-2xl text-white placeholder-white placeholder-opacity-60 focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 focus:border-purple-400 transition-all ${
                  errors.title
                    ? "border-red-400"
                    : "border-white border-opacity-30"
                }`}
                placeholder="What needs to be done? 🎯"
              />
              {errors.title && (
                <p className="text-red-300 text-sm mt-2 flex items-center gap-1">
                  ⚠️ {errors.title}
                </p>
              )}
            </div>

            <div>
              <label className="block text-white font-semibold mb-2 text-lg">
                Description 📝
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm border-2 border-white border-opacity-30 rounded-2xl text-white placeholder-white placeholder-opacity-60 focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 focus:border-purple-400 transition-all"
                rows={3}
                placeholder="Tell us more about this task... 💭"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-semibold mb-2 text-lg">
                  Status 📊
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as TaskFormData["status"],
                    })
                  }
                  className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm border-2 border-white border-opacity-30 rounded-2xl text-white focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 focus:border-purple-400 transition-all"
                >
                  <option value="Pending" className="text-black">
                    🟡 Pending
                  </option>
                  <option value="In Progress" className="text-black">
                    🔵 In Progress
                  </option>
                  <option value="Completed" className="text-black">
                    🟢 Completed
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2 text-lg">
                  Priority 🔥
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority: e.target.value as TaskFormData["priority"],
                    })
                  }
                  className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm border-2 border-white border-opacity-30 rounded-2xl text-white focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 focus:border-purple-400 transition-all"
                >
                  <option value="low" className="text-black">
                    🟢 Low
                  </option>
                  <option value="medium" className="text-black">
                    🟡 Medium
                  </option>
                  <option value="high" className="text-black">
                    🔴 High
                  </option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-semibold mb-2 text-lg">
                  Category 📂
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value as TaskFormData["category"],
                    })
                  }
                  className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm border-2 border-white border-opacity-30 rounded-2xl text-white focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 focus:border-purple-400 transition-all"
                >
                  <option value="work" className="text-black">
                    💼 Work
                  </option>
                  <option value="design" className="text-black">
                    🎨 Design
                  </option>
                  <option value="learning" className="text-black">
                    📚 Learning
                  </option>
                  <option value="personal" className="text-black">
                    🌟 Personal
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2 text-lg">
                  Due Date 📅
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                  className={`w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm border-2 rounded-2xl text-white focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 focus:border-purple-400 transition-all ${
                    errors.dueDate
                      ? "border-red-400"
                      : "border-white border-opacity-30"
                  }`}
                />
                {errors.dueDate && (
                  <p className="text-red-300 text-sm mt-2 flex items-center gap-1">
                    ⚠️ {errors.dueDate}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {task ? "✨ Update Task" : "🚀 Create Task"}
              </button>
              <button
                onClick={onCancel}
                className="flex-1 bg-white bg-opacity-20 backdrop-blur-sm text-white py-4 px-6 rounded-2xl hover:bg-opacity-30 transition-all duration-300 font-bold text-lg border-2 border-white border-opacity-30"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
