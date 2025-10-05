import React, { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import Markets from "./components/Markets";
import Trading from "./components/Trading";
import Finance from "./components/Finance";
import Assets from "./components/Assets";
import Settings from "./components/Settings";
import AuthModal from "./components/AuthModal";
import Sidebar from "./components/Sidebar";

function AppContent() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [dashboardReset, setDashboardReset] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  // ✅ Handle tab navigation, trigger reset when going home
  const handleNavigation = (tab) => {
    if (tab === "dashboard") {
      setDashboardReset((prev) => !prev); // toggle reset signal
    }
    setActiveTab(tab);
    setShowSidebar(false);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setActiveTab("dashboard");
  };

  const handleAuthAction = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  // ✅ Page rendering logic
  const renderContent = () => {
    const commonProps = { setShowSidebar };

    switch (activeTab) {
      case "dashboard":
        return (
          <Dashboard
            {...commonProps}
            onNavigate={handleNavigation}
            resetSignal={dashboardReset}
          />
        );
      case "markets":
        return <Markets {...commonProps} />;
      case "trade":
        return <Trading {...commonProps} />;
      case "finance":
        return <Finance {...commonProps} />;
      case "assets":
        return <Assets {...commonProps} />;
      case "settings":
        return <Settings {...commonProps} />;
      default:
        return <Dashboard {...commonProps} />;
    }
  };

  return (
    <div className="App min-h-screen bg-poloniex-section text-poloniex-text">
      {activeTab === "dashboard" && (
        <Header
          setShowSidebar={setShowSidebar}
          isAuthenticated={isAuthenticated}
          user={user}
          onLogout={logout}
          onLogin={() => handleAuthAction("login")}
          onSignup={() => handleAuthAction("signup")}
        />
      )}

      <div className="container mx-auto px-4 py-6 pb-20">{renderContent()}</div>

      <Navigation activeTab={activeTab} setActiveTab={handleNavigation} />

      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />
      )}

      {showSidebar && (
        <Sidebar
          activeTab={activeTab}
          onNavigate={handleNavigation}
          onClose={() => setShowSidebar(false)}
          isAuthenticated={isAuthenticated}
          user={user}
          onLogin={() => handleAuthAction("login")}
          onSignup={() => handleAuthAction("signup")}
          onLogout={logout}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
