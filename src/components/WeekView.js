import React from 'react';
import { addDays, startOfDay } from 'date-fns';
import { DndContext, DragOverlay, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import DayColumn from './DayColumn';
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
            <div className="flex h-full overflow-hidden">
                {/* Task Pool - Mobile: full width collapsible, Desktop: fixed sidebar */}
                <div className="w-full md:w-80 flex-shrink-0 h-full overflow-hidden">
                    <TaskPool
                        tasks={poolTasks}
                        onAddTask={addTaskToPool}
                        onToggleTask={toggleTask}
                        onDeleteTask={deleteTask}
                        onUpdateColor={updateTaskColor}
                    />
                </div>

                {/* Week Days - Horizontal scroll on mobile, grid on desktop */}
                <div className="flex-1 flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory md:snap-none bg-gray-100 h-full">
                    {days.map(date => (
                        <div key={date.toISOString()} className="snap-start flex-shrink-0 w-full md:w-80 h-full">
                            <DayColumn
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
