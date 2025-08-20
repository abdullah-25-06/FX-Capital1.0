import React from "react";

const Sidebar = ({ activeTab, onNavigate, onClose }) => {
  const menuItems = [
    { id: "dashboard", label: "Home", icon: "🏠" },
    { id: "markets", label: "Markets", icon: "📊" },
    { id: "trade", label: "Trade", icon: "💹" },
    { id: "finance", label: "Finance", icon: "💰" },
    { id: "assets", label: "Assets", icon: "💎" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className='fixed inset-0 z-50'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black bg-opacity-70'
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className='absolute left-0 top-0 h-full w-64 bg-darker-bg shadow-lg border-r border-border-custom'>
        <div className='p-4 border-b border-border-custom'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center space-x-2'>
              <div className='bg-gold rounded-lg p-1'>
                <svg
                  className='w-6 h-6 text-dark-bg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' />
                </svg>
              </div>
              <h2 className='text-xl font-semibold text-gold'>FX CAPITAL</h2>
            </div>
            <button onClick={onClose} className='text-teal hover:text-white'>
              ✕
            </button>
          </div>
        </div>

        <nav className='p-4'>
          <ul className='space-y-2'>
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                    activeTab === item.id
                      ? "bg-teal text-dark-bg"
                      : "text-gold hover:bg-card-bg"
                  }`}
                >
                  <span className='text-lg'>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className='absolute bottom-0 w-full p-4 border-t border-border-custom'>
          <div className='text-center text-teal text-sm'>
            <p>2-6 poloniextrade.online</p>
            <p className='mt-1'>8:56</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
