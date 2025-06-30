import { createContext, useContext, useState } from "react";

// Define the shape of the task stats
const initialTaskStats = {
    completed: 0,
    incompleted: 0,
    work: 0,
    personal: 0,
    urgent: 0,
};

// Create TaskContext with default values
const TaskContext = createContext({
    taskStats: initialTaskStats,
    calculateAndSaveStats: (tasks) => {}, // Placeholder function
});

export const TaskProvider = ({ children }) => {
    const [taskStats, setTaskStats] = useState(initialTaskStats);

    // Function to calculate and update stats
    const calculateAndSaveStats = (tasks) => {
        const completed = tasks.filter((task) => task.completed).length;
        const incompleted = tasks.length - completed;
        const work = tasks.filter((task) => task.category === "work").length;
        const personal = tasks.filter((task) => task.category === "personal").length;
        const urgent = tasks.filter((task) => task.category === "urgent").length;

        const stats = { completed, incompleted, work, personal, urgent };
        setTaskStats(stats);
    };

    return (
        <TaskContext.Provider value={{ taskStats, calculateAndSaveStats }}>
            {children}
        </TaskContext.Provider>
    );
};

// Custom hook for easier access to TaskContext
export const useTaskStats = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error("useTaskStats must be used within a TaskProvider");
    }

    return context;
};
