import React, { useState } from 'react';
import { FaPlus, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useDroppable } from '@dnd-kit/core';
import TaskItem from './TaskItem';

const COLORS = [
    { name: 'red', label: '🔴 Срочное', color: '#ef4444' },
    { name: 'orange', label: '🟠 Работа', color: '#f97316' },
    { name: 'yellow', label: '🟡 Личное', color: '#eab308' },
    { name: 'green', label: '🟢 Здоровье', color: '#22c55e' },
    { name: 'blue', label: '🔵 Учёба', color: '#3b82f6' },
    { name: 'purple', label: '🟣 Творчество', color: '#a855f7' },
    { name: 'brown', label: '🟤 Дом', color: '#92400e' },
    { name: 'gray', label: '⚫ Разное', color: '#6b7280' }
];

const TaskPool = ({ tasks, onAddTask, onToggleTask, onDeleteTask, onUpdateColor }) => {
    const [newTaskText, setNewTaskText] = useState('');
    const [selectedColor, setSelectedColor] = useState('blue');
    const [isExpanded, setIsExpanded] = useState(true);
    const [showColorPicker, setShowColorPicker] = useState(false);

    const { setNodeRef, isOver } = useDroppable({
        id: 'task-pool',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newTaskText.trim()) return;
        onAddTask(newTaskText, selectedColor);
        setNewTaskText('');
        setShowColorPicker(false);
    };

    const selectedColorObj = COLORS.find(c => c.name === selectedColor);

    return (
        <div className="flex flex-col bg-gradient-to-br from-indigo-50 to-purple-50 border-b border-indigo-200 shadow-md">
            {/* Header */}
            <div
                className="p-4 bg-white border-b border-indigo-200 cursor-pointer md:cursor-default"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-indigo-900">📋 Пул задач</h2>
                        <span className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-1 rounded-full">
                            {tasks.length}
                        </span>
                    </div>
                    <button className="text-indigo-600">
                        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                </div>
            </div>

            {/* Collapsible content */}
            <div className={`flex-1 flex flex-col overflow-hidden ${isExpanded ? 'flex' : 'hidden'}`}>
                {/* Task Input Form */}
                <div className="p-4 bg-white border-b border-indigo-100">
                    <form onSubmit={handleSubmit} className="space-y-2">
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setShowColorPicker(!showColorPicker)}
                                className="flex-shrink-0 w-10 h-10 rounded-lg border-2 transition-all hover:scale-110"
                                style={{
                                    backgroundColor: selectedColorObj.color,
                                    borderColor: showColorPicker ? '#4f46e5' : '#e0e7ff'
                                }}
                                title={selectedColorObj.label}
                            />
                            <input
                                type="text"
                                value={newTaskText}
                                onChange={(e) => setNewTaskText(e.target.value)}
                                placeholder="Новая задача..."
                                className="flex-1 p-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-sm"
                            />
                            <button
                                type="submit"
                                className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
                            >
                                <FaPlus />
                            </button>
                        </div>

                        {/* Color Picker */}
                        {showColorPicker && (
                            <div className="grid grid-cols-2 gap-2 p-2 bg-indigo-50 rounded-lg">
                                {COLORS.map(color => (
                                    <button
                                        key={color.name}
                                        type="button"
                                        onClick={() => {
                                            setSelectedColor(color.name);
                                            setShowColorPicker(false);
                                        }}
                                        className={`flex items-center gap-2 p-2 rounded-lg transition-all hover:bg-white ${selectedColor === color.name ? 'bg-white ring-2 ring-indigo-500' : ''
                                            }`}
                                    >
                                        <div
                                            className="w-4 h-4 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: color.color }}
                                        />
                                        <span className="text-xs truncate">{color.label}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </form>
                </div>

                {/* Tasks List - Droppable Zone */}
                <div
                    ref={setNodeRef}
                    className={`flex-1 overflow-y-auto p-4 custom-scrollbar transition-colors ${isOver ? 'drop-zone-over' : ''
                        }`}
                >
                    {tasks.length === 0 ? (
                        <div className="text-center text-indigo-400">
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {tasks.map(task => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    onToggle={onToggleTask}
                                    onDelete={onDeleteTask}
                                    onUpdateColor={onUpdateColor}
                                    isDraggable={true}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskPool;
