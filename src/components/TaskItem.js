import React from 'react';
import { FaCheck, FaTrash, FaGripVertical } from 'react-icons/fa';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const TaskItem = ({ task, onToggle, onDelete, isDraggable = false }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: task.id,
        data: {
            task,
        },
        disabled: !isDraggable,
    });

    const style = transform ? {
        transform: CSS.Transform.toString(transform),
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`group flex items-center gap-2 p-3 mb-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all ${isDragging ? 'opacity-50' : ''
                }`}
            {...attributes}
        >
            {/* Color Indicator */}
            <div
                className="w-1 h-full absolute left-0 top-0 bottom-0 rounded-l-lg"
                style={{ backgroundColor: task.color || '#3b82f6' }}
            />

            {/* Drag Handle - only visible when draggable */}
            {isDraggable && (
                <div
                    {...listeners}
                    className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 pl-2"
                >
                    <FaGripVertical size={12} />
                </div>
            )}

            {/* Checkbox */}
            <div
                className="flex items-center flex-1 cursor-pointer ml-2"
                onClick={() => onToggle(task.id)}
            >
                <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-3 transition-all flex-shrink-0 ${task.completed
                            ? 'border-gray-400 bg-gray-400'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                    style={{
                        borderColor: task.completed ? task.color : undefined,
                        backgroundColor: task.completed ? task.color : undefined
                    }}
                >
                    {task.completed && <FaCheck className="text-white text-xs" />}
                </div>
                <span
                    className={`text-sm flex-1 ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'
                        }`}
                >
                    {task.text}
                </span>
            </div>

            {/* Delete Button */}
            <button
                onClick={() => onDelete(task.id)}
                className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 flex-shrink-0"
            >
                <FaTrash size={14} />
            </button>
        </div>
    );
};

export default TaskItem;
