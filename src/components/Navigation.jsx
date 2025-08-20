import React from "react";
import {
  FiHome,
  FiPieChart,
  FiDollarSign,
  FiBriefcase,
  FiBarChart2,
} from "react-icons/fi";

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "dashboard", label: "Home", icon: <FiHome size={20} /> },
    { id: "markets", label: "Markets", icon: <FiBarChart2 size={20} /> },
    { id: "trade", label: "Trade", icon: <FiDollarSign size={20} /> },
    { id: "finance", label: "Finance", icon: <FiPieChart size={20} /> },
    { id: "assets", label: "Assets", icon: <FiBriefcase size={20} /> },
  ];

  return (
    <nav className='fixed bottom-0 left-0 right-0 bg-poloniex-gray py-2 border-t border-gray-700 z-50'>
      <div className='container mx-auto flex justify-around'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex flex-col items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-poloniex-blue text-white"
                : "text-gray-400 hover:text-gray-200"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className='mb-1'>{tab.icon}</span>
            <span className='text-xs'>{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
