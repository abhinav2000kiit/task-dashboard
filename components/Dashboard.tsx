"use client";

import React, { useState } from "react";
import {
  Plus,
  Filter,
  Target,
  Diamond,
  Zap,
  Trophy,
  Heart,
} from "lucide-react";
import { useTasks } from "../context/TaskProvider";
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";
import FloatingParticles from "./FloatingParticles";
import { Task, TaskStatus } from "../types/task";

const Dashboard: React.FC = () => {
  const { tasks, addTask, getTaskCounts, currentView, setCurrentView } =
    useTasks();
  const [showAddForm, setShowAddForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"All" | TaskStatus>("All");

  const counts = getTaskCounts();

  const filteredTasks = tasks.filter((task) => {
    if (currentView === "completed" && task.status !== "Completed")
      return false;
    if (statusFilter !== "All" && task.status !== statusFilter) return false;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  const handleAddTask = (formData: Omit<Task, "id">) => {
    addTask(formData);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <FloatingParticles />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full opacity-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-10 animate-bounce" />
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-10 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-3xl mb-8 shadow-2xl">
            <Target className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mb-4">
            TaskFlow Pro
          </h1>
          <p className="text-2xl text-white text-opacity-80 font-light">
            Where productivity meets creativity ✨
          </p>
        </div>

        {/* Navigation Pills */}
        <div className="flex justify-center mb-12">
          <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-2 border border-white border-opacity-20">
            <button
              onClick={() => setCurrentView("all")}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                currentView === "all"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "text-white text-opacity-70 hover:text-opacity-100 hover:bg-white hover:bg-opacity-10"
              }`}
            >
              🌟 All Tasks
            </button>
            <button
              onClick={() => setCurrentView("completed")}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                currentView === "completed"
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                  : "text-white text-opacity-70 hover:text-opacity-100 hover:bg-white hover:bg-opacity-10"
              }`}
            >
              🏆 Completed
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {[
            {
              label: "Total Tasks",
              count: counts.total,
              icon: Target,
              gradient: "from-purple-500 to-pink-500",
              emoji: "🎯",
            },
            {
              label: "Pending",
              count: counts.pending,
              icon: Diamond,
              gradient: "from-orange-500 to-yellow-500",
              emoji: "⏳",
            },
            {
              label: "In Progress",
              count: counts.inProgress,
              icon: Zap,
              gradient: "from-blue-500 to-cyan-500",
              emoji: "⚡",
            },
            {
              label: "Completed",
              count: counts.completed,
              icon: Trophy,
              gradient: "from-green-500 to-emerald-500",
              emoji: "🏆",
            },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl p-8 border border-white border-opacity-20 shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: "slideInUp 0.6s ease-out forwards",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}
                >
                  {stat.emoji}
                </div>
                <div className="text-right">
                  <p className="text-white text-opacity-70 font-semibold text-lg">
                    {stat.label}
                  </p>
                  <p className="text-4xl font-black text-white">{stat.count}</p>
                </div>
              </div>
              <div
                className={`h-2 bg-gradient-to-r ${stat.gradient} rounded-full shadow-inner`}
              />
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-8 py-4 rounded-2xl hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300 font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 flex items-center justify-center gap-3"
          >
            <Plus className="w-6 h-6" />✨ Create Amazing Task
          </button>

          <div className="flex gap-4 flex-1">
            <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-4 border border-white border-opacity-20 flex items-center gap-3 flex-1">
              <Filter className="w-6 h-6 text-white text-opacity-70" />
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as "All" | TaskStatus)
                }
                className="bg-transparent text-white font-semibold text-lg outline-none flex-1"
              >
                <option value="All" className="text-black">
                  🌈 All Status
                </option>
                <option value="Pending" className="text-black">
                  ⏳ Pending
                </option>
                <option value="In Progress" className="text-black">
                  ⚡ In Progress
                </option>
                <option value="Completed" className="text-black">
                  🏆 Completed
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Task Grid */}
        {sortedTasks.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {sortedTasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
              <Heart className="w-16 h-16 text-white animate-pulse" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-4">
              {currentView === "completed"
                ? "🎉 Ready to achieve greatness!"
                : "🚀 Let's create something amazing!"}
            </h3>
            <p className="text-xl text-white text-opacity-70 mb-8 max-w-md mx-auto">
              {currentView === "completed"
                ? "Complete some tasks to see your victories here!"
                : "Your creative workspace awaits. Add your first task and watch the magic happen!"}
            </p>
            {currentView !== "completed" && (
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-10 py-5 rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                🌟 Start Your Journey
              </button>
            )}
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showAddForm && (
        <TaskForm
          onSubmit={handleAddTask}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
