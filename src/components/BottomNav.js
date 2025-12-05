import React from 'react';
import { FaCalendarWeek, FaListUl, FaCog } from 'react-icons/fa';

const BottomNav = ({ activeTab, onTabChange }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 z-50 md:hidden">
            <button
                onClick={() => onTabChange('week')}
                className={`flex flex-col items-center justify-center w-full h-full ${activeTab === 'week' ? 'text-blue-600' : 'text-gray-400'}`}
            >
                <FaCalendarWeek size={20} />
                <span className="text-xs mt-1">Week</span>
            </button>
            <button
                onClick={() => onTabChange('lists')}
                className={`flex flex-col items-center justify-center w-full h-full ${activeTab === 'lists' ? 'text-blue-600' : 'text-gray-400'}`}
            >
                <FaListUl size={20} />
                <span className="text-xs mt-1">Lists</span>
            </button>
            <button
                onClick={() => onTabChange('settings')}
                className={`flex flex-col items-center justify-center w-full h-full ${activeTab === 'settings' ? 'text-blue-600' : 'text-gray-400'}`}
            >
                <FaCog size={20} />
                <span className="text-xs mt-1">Settings</span>
            </button>
        </div>
    );
};

export default BottomNav;
