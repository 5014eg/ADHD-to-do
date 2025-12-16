import React from 'react';
import { addDays, startOfDay } from 'date-fns';
import { DndContext, DragOverlay, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import DayRow from './DayRow';
import TaskPool from './TaskPool';

const WeekView = ({ tasksHook }) => {
    const {
        addTaskToPool,
        moveTaskToDate,
        moveTaskToPool,
        toggleTask,
        deleteTask,
        updateTaskColor,
        getTasksForDate,
        getPoolTasks
    } = tasksHook;

    const today = startOfDay(new Date());
    const days = Array.from({ length: 7 }, (_, i) => addDays(today, i));
    const poolTasks = getPoolTasks();

    // Configure sensors for both mouse and touch
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // 8px movement required to start dragging (prevents accidental drags)
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 200, // 200ms press required for touch devices
                tolerance: 8, // Allow 8px movement during the delay
            },
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) return;

        const taskId = active.id;

        // Check if dropped on a day column
        if (over.id.startsWith('day-')) {
            const dateString = over.id.replace('day-', '');
            const targetDate = new Date(dateString);
            moveTaskToDate(taskId, targetDate);
        }
        // Check if dropped back to pool
        else if (over.id === 'task-pool') {
            moveTaskToPool(taskId);
        }
    };

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div className="flex flex-col h-full overflow-hidden">
                {/* Task Pool - Fixed at top */}
                <div className="w-full flex-shrink-0 z-10">
                    <TaskPool
                        tasks={poolTasks}
                        onAddTask={addTaskToPool}
                        onToggleTask={toggleTask}
                        onDeleteTask={deleteTask}
                        onUpdateColor={updateTaskColor}
                    />
                </div>

                {/* Week Days - Vertical scroll */}
                <div className="flex-1 overflow-y-auto bg-gray-100 p-4 space-y-4">
                    {days.map(date => (
                        <div key={date.toISOString()} className="w-full">
                            <DayRow
                                date={date}
                                tasks={getTasksForDate(date)}
                                onToggleTask={toggleTask}
                                onDeleteTask={deleteTask}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </DndContext>
    );
};

export default WeekView;
