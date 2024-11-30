import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  VideoLibrary,
  Warning,
  Settings,
  Security,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import './Sidebar.css';

interface SidebarProps {
  onCloseMobile: () => void;
  isOpen?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile, isOpen }) => {
  const handleLinkClick = () => {
    if (window.innerWidth <= 1024) {
      onCloseMobile();
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? 'active' : ''}`}>
      <div className="sidebar-header">
        <NavLink to="/" className="logo" onClick={handleLinkClick}>
          <Security />
          <span>STRIKE</span>
        </NavLink>
      </div>

      <nav className="nav-menu">
        <NavLink 
          to="/" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          onClick={handleLinkClick}
        >
          <DashboardIcon />
          <span className="nav-text">Dashboard</span>
        </NavLink>

        <NavLink 
          to="/live" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          onClick={handleLinkClick}
        >
          <Home />
          <span className="nav-text">Live View</span>
        </NavLink>

        <NavLink 
          to="/archive" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          onClick={handleLinkClick}
        >
          <VideoLibrary />
          <span className="nav-text">Video Archive</span>
        </NavLink>

        <NavLink 
          to="/accidents" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          onClick={handleLinkClick}
        >
          <Warning />
          <span className="nav-text">Accidents</span>
        </NavLink>

        <NavLink 
          to="/settings" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          onClick={handleLinkClick}
        >
          <Settings />
          <span className="nav-text">Settings</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">
            A
          </div>
          <div className="user-details">
            <div className="user-name">Admin</div>
            <div className="user-role">Safety Manager</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
