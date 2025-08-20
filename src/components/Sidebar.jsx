import React from "react";
import {
  FiHome,
  FiTrendingUp,
  FiDollarSign,
  FiPieChart,
  FiBriefcase,
  FiSettings,
  FiX,
  FiUser,
  FiBell,
  FiHelpCircle,
  FiLogIn,
  FiUserPlus,
  FiLogOut,
} from "react-icons/fi";

const Sidebar = ({
  activeTab,
  onNavigate,
  onClose,
  isAuthenticated,
  user,
  onLogin,
  onLogout,
  onSignup,
}) => {
  const mainMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: <FiHome size={20} /> },
    { id: "markets", label: "Markets", icon: <FiTrendingUp size={20} /> },
    { id: "trade", label: "Trade", icon: <FiDollarSign size={20} /> },
    { id: "finance", label: "Finance", icon: <FiPieChart size={20} /> },
    { id: "assets", label: "Assets", icon: <FiBriefcase size={20} /> },
    { id: "settings", label: "Settings", icon: <FiSettings size={20} /> },
  ];

  const authMenuItems = isAuthenticated
    ? [
        { id: "profile", label: "Profile", icon: <FiUser size={20} /> },
        {
          id: "logout",
          label: "Logout",
          icon: <FiLogOut size={20} />,
          action: onLogout,
        },
      ]
    : [
        {
          id: "login",
          label: "Login",
          icon: <FiLogIn size={20} />,
          action: onLogin,
        },
        {
          id: "signup",
          label: "Sign Up",
          icon: <FiUserPlus size={20} />,
          action: onSignup,
        },
      ];

  // Get current time
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleItemClick = (item) => {
    if (item.action) {
      item.action();
      onClose();
    } else if (item.id !== "logout") {
      onNavigate(item.id);
    }
  };

  return (
    <div className='fixed inset-0 z-50'>
      {/* Backdrop with reduced transparency */}
      <div
        className='absolute inset-0 bg-gray-900 bg-opacity-90'
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className='absolute left-0 top-0 h-full w-72 bg-gray-900 shadow-xl border-r border-gray-700 transform transition-transform duration-300'>
        {/* Header Section */}
        <div className='p-5 border-b border-gray-700 bg-gray-850'>
          <div className='flex items-center justify-between mb-5'>
            <div className='flex items-center space-x-3'>
              <div className='bg-blue-500 rounded-lg p-2 flex items-center justify-center'>
                <svg
                  className='w-6 h-6 text-white'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' />
                </svg>
              </div>
              <h2 className='text-xl font-bold text-white'>FX CAPITAL</h2>
            </div>
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700 transition-colors'
            >
              <FiX size={24} />
            </button>
          </div>

          {/* User Profile Quick Access */}
          <div className='flex items-center space-x-3 p-3 bg-gray-800 rounded-lg'>
            <div
              className={`rounded-full p-2 ${
                isAuthenticated ? "bg-green-600" : "bg-blue-600"
              }`}
            >
              <FiUser size={16} className='text-white' />
            </div>
            <div className='flex-1'>
              <p className='text-white text-sm font-medium'>
                {isAuthenticated
                  ? user?.name || "User Account"
                  : "Guest Account"}
              </p>
              <p
                className={`text-xs ${
                  isAuthenticated ? "text-green-400" : "text-gray-400"
                }`}
              >
                {isAuthenticated ? "Verified" : "Not logged in"}
              </p>
            </div>
            <button className='text-gray-400 hover:text-white'>
              <FiBell size={18} />
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className='p-4 flex-1 overflow-y-auto'>
          <h3 className='text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3 pl-4'>
            Main Menu
          </h3>
          <ul className='space-y-2 mb-6'>
            {mainMenuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 ${
                    activeTab === item.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <span
                    className={`${
                      activeTab === item.id ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className='font-medium'>{item.label}</span>
                  {activeTab === item.id && (
                    <div className='ml-auto w-2 h-2 bg-white rounded-full'></div>
                  )}
                </button>
              </li>
            ))}
          </ul>

          <h3 className='text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3 pl-4'>
            Account
          </h3>
          <ul className='space-y-2'>
            {authMenuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 ${
                    item.id === "logout"
                      ? "text-red-300 hover:bg-red-900 hover:text-red-100"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <span
                    className={
                      item.id === "logout" ? "text-red-400" : "text-gray-400"
                    }
                  >
                    {item.icon}
                  </span>
                  <span className='font-medium'>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Support Section */}
        <div className='p-4 border-t border-gray-700'>
          <button className='w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors'>
            <FiHelpCircle size={20} />
            <span className='font-medium'>Help & Support</span>
          </button>
        </div>

        {/* Footer Section */}
        <div className='w-full p-4 border-t border-gray-700 bg-gray-850'>
          <div className='text-center'>
            <p className='text-gray-400 text-sm'>2-6 poloniextrade.online</p>
            <div className='flex items-center justify-center mt-2 space-x-4'>
              <div
                className={`w-3 h-3 rounded-full ${
                  isAuthenticated ? "bg-green-500" : "bg-yellow-500"
                }`}
              ></div>
              <p
                className={`text-sm font-medium ${
                  isAuthenticated ? "text-green-500" : "text-yellow-500"
                }`}
              >
                {getCurrentTime()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
