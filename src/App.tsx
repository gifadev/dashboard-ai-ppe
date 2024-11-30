import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './components/Sidebar/Sidebar.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Accidents from './pages/Accidents.tsx';
import VideoArchive from './pages/VideoArchive.tsx';
import Settings from './pages/Settings.tsx';
import LiveView from './pages/LiveView.tsx';
import './App.css';

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Router>
      <div className="app">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="mobile-menu-button"
        >
          <MenuIcon />
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
        />

        {/* Sidebar */}
        <Sidebar onCloseMobile={toggleMobileMenu} isOpen={isMobileMenuOpen} />

        {/* Main Content */}
        <main className="main-content">
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/live" element={<LiveView />} />
              <Route path="/accidents" element={<Accidents />} />
              <Route path="/archive" element={<VideoArchive />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
