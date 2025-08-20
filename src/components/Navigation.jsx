import React from "react";

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "dashboard", label: "Home", icon: "🏠" },
    { id: "markets", label: "Markets", icon: "📊" },
    { id: "trade", label: "Trade", icon: "🔁" },
    { id: "finance", label: "Finance", icon: "💰" },
    { id: "assets", label: "Assets", icon: "💼" },
  ];

  return (
    <nav className='fixed bottom-0 left-0 right-0 bg-darker-bg py-3 border-t border-border-custom'>
      <div className='container mx-auto flex justify-around'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex flex-col items-center text-xs ${
              activeTab === tab.id ? "text-teal" : "text-secondary"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className='text-lg mb-1'>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
