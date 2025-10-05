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
import AboutUs from "./components/AboutUs";
import AuthModal from "./components/AuthModal";
import Sidebar from "./components/Sidebar";

function AppContent() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [dashboardReset, setDashboardReset] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();

  // --- FORCE LOGIN BEFORE SHOWING APP ---
  if (!isAuthenticated) {
    return (
      <div className="App flex items-center justify-center min-h-screen bg-poloniex-section text-poloniex-text">
        <AuthModal
          mode="login"
          onClose={() => {}}
          onSuccess={() => setActiveTab("dashboard")}
          alwaysOpen={true} // prevent closing until login
        />
      </div>
    );
  }

  // Handle tab navigation
  const handleNavigation = (tab) => {
    if (tab === "dashboard") setDashboardReset((prev) => !prev);
    setActiveTab(tab);
    setShowSidebar(false);
  };

  // Handle auth modal success
  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setActiveTab("dashboard");
  };

  // Open login/signup modal manually
  const handleAuthAction = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  // Render the main content based on active tab
  const renderContent = () => {
    const commonProps = { setShowSidebar, onNavigate: handleNavigation };

    switch (activeTab) {
      case "dashboard":
        return <Dashboard {...commonProps} resetSignal={dashboardReset} />;
      case "markets":
        return <Markets {...commonProps} />;
      case "trade":
      case "tradeFromDashboard":
        return <Trading {...commonProps} />;
      case "finance":
        return <Finance {...commonProps} />;
      case "assets":
        return <Assets {...commonProps} />;
      case "settings":
        return <Settings {...commonProps} />;
      case "aboutus":
        return <AboutUs onBack={() => handleNavigation("dashboard")} />;
      default:
        return <Dashboard {...commonProps} />;
    }
  };

  return (
    <div className="App min-h-screen bg-poloniex-section text-poloniex-text">
      {/* Header only on Dashboard */}
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

      {/* Main content */}
      <div className="container mx-auto px-4 py-6 pb-20">
        {renderContent()}
      </div>

      {/* Bottom navigation (hide on AboutUs) */}
      {activeTab !== "aboutus" && (
        <Navigation activeTab={activeTab} setActiveTab={handleNavigation} />
      )}

      {/* Auth modal */}
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />
      )}

      {/* Sidebar */}
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
