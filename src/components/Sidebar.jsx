import React, { useEffect, useState } from "react";
import {
  FiUser,
  FiShield,
  FiInfo,
  FiGlobe,
  FiDollarSign,
  FiLogOut,
} from "react-icons/fi";
import PersonalInfoModal from "./PersonalInfoModal"; 
import AuthenticationModal from "./AuthenticationModal"; // 👈 Import Authentication Modal

const Sidebar = ({ onClose, user, onLogout }) => {
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showAuth, setShowAuth] = useState(false); // 👈 New state for Authentication

  // Disable background scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className="absolute left-0 top-0 h-full w-80 bg-gray-900 shadow-2xl transform transition-transform duration-300 overflow-y-auto">
        {/* Header / Profile */}
        <div className="p-6 border-b border-gray-700 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
            {user?.name ? user.name.charAt(0) : "U"}
          </div>
          <h2 className="text-white mt-3 font-semibold text-lg">
            {user?.name || "Guest User"}
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Balance: {user?.balance || 0}
          </p>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {/* 👇 Authentication button opens modal */}
          <button
            onClick={() => setShowAuth(true)}
            className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-800 transition"
          >
            <FiShield size={18} />
            <span>Authentication</span>
          </button>

          {/* 👇 Personal Info button opens modal */}
          <button
            onClick={() => setShowPersonalInfo(true)}
            className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-800 transition"
          >
            <FiUser size={18} />
            <span>Personal Information</span>
          </button>

          <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-800 transition">
            <FiDollarSign size={18} />
            <span>Default Fiat Currency</span>
            <span className="ml-auto text-gray-400 text-sm">USDT</span>
          </button>

          <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-800 transition">
            <FiGlobe size={18} />
            <span>Select Language</span>
            <span className="ml-auto text-gray-400 text-sm">English</span>
          </button>

          <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-800 transition">
            <FiInfo size={18} />
            <span>About Us</span>
          </button>
        </nav>

        {/* Footer / Exit */}
        <div className="mt-auto p-4 border-t border-gray-700">
          <button
            onClick={onLogout}
            className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition flex items-center justify-center space-x-2"
          >
            <FiLogOut size={18} />
            <span>Exit</span>
          </button>
        </div>
      </div>

      {/*Modals */}
      <AuthenticationModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
      />
      <PersonalInfoModal
        isOpen={showPersonalInfo}
        onClose={() => setShowPersonalInfo(false)}
        user={user}
      />
    </div>
  );
};

export default Sidebar;
