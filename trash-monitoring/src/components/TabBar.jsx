// components/TabBar.jsx
import React from 'react';

export default function TabBar({ activeTab, onTabChange }) {
  const tabs = ['Map', 'Trash List', 'Analytics', 'About'];

  return (
    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-2 rounded-mid text-sm font-semibold transition-all duration-200 ${
              activeTab === tab
                ? 'bg-cyan-500 text-white shadow'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
