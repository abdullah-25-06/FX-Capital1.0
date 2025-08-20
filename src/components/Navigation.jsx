import React from "react";

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "dashboard", label: "Home" },
    { id: "markets", label: "Markets" },
    { id: "trade", label: "Trade" },
    { id: "finance", label: "Finance" },
    { id: "assets", label: "Assets" },
  ];

  return (
    <nav className='fixed bottom-0 left-0 right-0 bg-darker-bg py-3 border-t border-border-custom shadow-md'>
      <div className='container mx-auto flex justify-around'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-3 py-2 text-sm ${
              activeTab === tab.id
                ? "text-teal font-medium border-b-2 border-teal"
                : "text-gold"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
