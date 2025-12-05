import React from 'react';
import { format, isToday, isPast, isFuture } from 'date-fns';
import { useDroppable } from '@dnd-kit/core';
import TaskItem from './TaskItem';

const DayColumn = ({ date, tasks, onToggleTask, onDeleteTask }) => {
    const { setNodeRef, isOver } = useDroppable({
        id: `day-${date.toISOString()}`,
        data: {
            date,
        },
    });

    const isCurrentDay = isToday(date);
    const isPastDay = isPast(date) && !isCurrentDay;
    const isFutureDay = isFuture(date);

    const completedCount = tasks.filter(t => t.completed).length;
    const totalCount = tasks.length;

    return (
        <div
            className={`flex-shrink-0 w-full md:w-80 h-full flex flex-col border-r border-gray-200 transition-colors ${isCurrentDay ? 'bg-blue-50' : 'bg-gray-50'
                } ${isOver ? 'drop-zone-over' : ''}`}
        >
            {/* Day Header */}
            <div className={`p-4 border-b border-gray-200 ${isCurrentDay ? 'bg-blue-100' : 'bg-white'
                }`}>
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className={`text-lg font-bold ${isCurrentDay ? 'text-blue-700' : 'text-gray-700'
                            }`}>
                            {format(date, 'EEEE')}
                        </h2>
                        <p className="text-sm text-gray-500">{format(date, 'MMM d')}</p>
                    </div>
                    {totalCount > 0 && (
                        <div className="text-right">
                            <div className={`text-sm font-semibold ${completedCount === totalCount ? 'text-green-600' : 'text-gray-600'
                                }`}>
                                {completedCount}/{totalCount}
                            </div>
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                                <div
                                    className="h-full bg-green-500 transition-all duration-300"
                                    style={{ width: `${(completedCount / totalCount) * 100}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {isCurrentDay && (
                    <div className="mt-2 text-xs text-blue-600 font-medium">📌 Сегодня</div>
                )}
            </div>

            {/* Tasks List - Droppable Zone */}
            <div
                ref={setNodeRef}
                className={`flex-1 overflow-y-auto p-4 custom-scrollbar ${isOver ? 'bg-blue-100' : ''
                    }`}
            >
                {tasks.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center text-gray-400">
                            {isCurrentDay ? (
                                <>
                                    <p className="text-2xl mb-2">🎯</p>
                                    <p className="text-sm">Перетащите задачи сюда</p>
                                </>
                            ) : isFutureDay ? (
                                <>
                                    <p className="text-2xl mb-2">📅</p>
                                    <p className="text-sm">Планируйте заранее</p>
                                </>
                            ) : (
                                <>
                                    <p className="text-2xl mb-2">✓</p>
                                    <p className="text-sm">Всё выполнено!</p>
                                </>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {tasks.map(task => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onToggle={onToggleTask}
                                onDelete={onDeleteTask}
                                isDraggable={true}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DayColumn;
