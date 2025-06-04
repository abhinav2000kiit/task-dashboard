import { useState, useEffect, useContext, createContext } from "react";

// Task Context for state management
const TaskContext = createContext();

const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [currentView, setCurrentView] = useState('all');

    // Initialize with sample data
    useEffect(() => {
        const sampleTasks = [
            {
                id: 1,
                title: '🚀 Launch new feature',
                description: 'Deploy the AI-powered analytics dashboard with real-time insights',
                status: 'In Progress',
                dueDate: '2025-06-15',
                priority: 'high',
                category: 'work'
            },
            {
                id: 2,
                title: '🎨 Design system update',
                description: 'Refresh brand colors and create new component library',
                status: 'Pending',
                dueDate: '2025-06-10',
                priority: 'medium',
                category: 'design'
            },
            {
                id: 3,
                title: '📚 Learn Three.js',
                description: 'Complete the 3D web development course and build a portfolio project',
                status: 'Completed',
                dueDate: '2025-05-28',
                priority: 'low',
                category: 'learning'
            }
        ];
        setTasks(sampleTasks);
    }, []);

    const addTask = (task) => {
        const newTask = {
            ...task,
            id: Date.now(),
        };
        setTasks(prev => [...prev, newTask]);
    };

    const updateTask = (id, updatedTask) => {
        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, ...updatedTask } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    const getTaskCounts = () => {
        return {
            pending: tasks.filter(t => t.status === 'Pending').length,
            inProgress: tasks.filter(t => t.status === 'In Progress').length,
            completed: tasks.filter(t => t.status === 'Completed').length,
            total: tasks.length
        };
    };

    return (
        <TaskContext.Provider value={{
            tasks,
            addTask,
            updateTask,
            deleteTask,
            getTaskCounts,
            currentView,
            setCurrentView
        }}>
            {children}
        </TaskContext.Provider>
    );
};

// Custom hook to use task context
const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};