import React, { useState } from "react";
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

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const renderContent = () => {
    const commonProps = { setShowSidebar };

    switch (activeTab) {
      case "dashboard":
        return <Dashboard {...commonProps} />;
      case "markets":
        return <Markets {...commonProps} />;
      case "trade":
        return <Trading {...commonProps} />;
      case "finance":
        return <Finance {...commonProps} />;
      case "assets":
        return <Assets {...commonProps} />;
      case "settings":
        return (
          <Settings {...commonProps} setShowAuthModal={setShowAuthModal} />
        );
      default:
        return <Dashboard {...commonProps} />;
    }
  };

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    setShowSidebar(false);
  };

  return (
    <div className='App min-h-screen bg-poloniex-section text-poloniex-text'>
      <Header setShowSidebar={setShowSidebar} />
      <div className='container mx-auto px-4 py-6 pb-20'>{renderContent()}</div>
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      {showSidebar && (
        <Sidebar
          activeTab={activeTab}
          onNavigate={handleNavigation}
          onClose={() => setShowSidebar(false)}
        />
      )}
    </div>
  );
}

export default App;
