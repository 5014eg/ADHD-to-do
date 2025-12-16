import React, { useState } from 'react';
import WeekView from './components/WeekView';
import BottomNav from './components/BottomNav';
import { useTasks } from './hooks/useTasks';

function App() {
    const [activeTab, setActiveTab] = useState('week');
    const tasksHook = useTasks();

    return (
        <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
            {/* Header for Desktop/Mobile */}
            <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between z-20 shadow-sm">

                <div className="hidden md:flex space-x-4">
                    <button
                        onClick={() => setActiveTab('week')}
                        className={`font-medium ${activeTab === 'week' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                    >
                        Week View
                    </button>
                    <button
                        onClick={() => setActiveTab('lists')}
                        className={`font-medium ${activeTab === 'lists' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                    >
                        Lists
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`font-medium ${activeTab === 'settings' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                    >
                        Settings
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-hidden relative">
                {activeTab === 'week' && <WeekView tasksHook={tasksHook} />}
                {activeTab === 'lists' && (
                    <div className="p-8 text-center text-gray-500">
                        <h2 className="text-2xl font-bold mb-2">Lists View</h2>
                        <p>Coming soon...</p>
                    </div>
                )}
                {activeTab === 'settings' && (
                    <div className="p-8 text-center text-gray-500">
                        <h2 className="text-2xl font-bold mb-2">Settings</h2>
                        <p>Coming soon...</p>
                    </div>
                )}
            </main>

            {/* Mobile Bottom Navigation */}
            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
    );
}

export default App;
