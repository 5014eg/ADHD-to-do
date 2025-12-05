import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format, startOfDay, isSameDay, isPast, isToday } from 'date-fns';

const STORAGE_KEY = 'adhd-todo-tasks';

const COLORS = {
    red: '#ef4444',
    orange: '#f97316',
    yellow: '#eab308',
    green: '#22c55e',
    blue: '#3b82f6',
    purple: '#a855f7',
    brown: '#92400e',
    gray: '#6b7280'
};

export const useTasks = () => {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    // Rollover incomplete tasks from past days to pool on app load
    useEffect(() => {
        rolloverIncompleteTasks();
    }, []);

    const rolloverIncompleteTasks = () => {
        setTasks(prev => prev.map(task => {
            // If task has a date, it's in the past, and it's not completed - move to pool
            if (task.dateAssigned) {
                const taskDate = new Date(task.dateAssigned);
                if (isPast(taskDate) && !isToday(taskDate) && !task.completed) {
                    return { ...task, dateAssigned: null };
                }
            }
            return task;
        }));
    };

    const addTaskToPool = (text, color = 'blue') => {
        const newTask = {
            id: uuidv4(),
            text,
            color,
            completed: false,
            dateAssigned: null, // null means it's in the pool
            createdAt: new Date().toISOString(),
        };
        setTasks(prev => [...prev, newTask]);
        return newTask.id;
    };

    const moveTaskToDate = (taskId, date) => {
        setTasks(prev => prev.map(task =>
            task.id === taskId
                ? { ...task, dateAssigned: startOfDay(date).toISOString(), completed: false }
                : task
        ));
    };

    const moveTaskToPool = (taskId) => {
        setTasks(prev => prev.map(task =>
            task.id === taskId
                ? { ...task, dateAssigned: null, completed: false }
                : task
        ));
    };

    const toggleTask = (id) => {
        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    const updateTaskColor = (id, color) => {
        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, color } : task
        ));
    };

    const getTasksForDate = (date) => {
        return tasks.filter(task =>
            task.dateAssigned && isSameDay(new Date(task.dateAssigned), date)
        );
    };

    const getPoolTasks = () => {
        return tasks.filter(task => task.dateAssigned === null);
    };

    return {
        tasks,
        addTaskToPool,
        moveTaskToDate,
        moveTaskToPool,
        toggleTask,
        deleteTask,
        updateTaskColor,
        getTasksForDate,
        getPoolTasks,
        rolloverIncompleteTasks,
        COLORS
    };
};
