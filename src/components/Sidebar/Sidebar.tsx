import React from 'react';
import { NavLink } from 'react-router-dom';
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

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/'
    },
    {
      title: 'Live View',
      icon: <Home />,
      path: '/live'
    },
    {
      title: 'Video Player',
      icon: <VideoLibrary />,
      path: '/video'
    },
    {
      title: 'Video Archive',
      icon: <VideoLibrary />,
      path: '/archive'
    },
    {
      title: 'Accidents',
      icon: <Warning />,
      path: '/accidents'
    },
    {
      title: 'Settings',
      icon: <Settings />,
      path: '/settings'
    }
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'active' : ''}`}>
      <div className="sidebar-header">
        <NavLink to="/" className="logo" onClick={handleLinkClick}>
          <Security />
          <span>SIMS</span>
        </NavLink>
      </div>

      <nav className="nav-menu">
        {menuItems.map((menuItem, index) => (
          <NavLink 
            key={index} 
            to={menuItem.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={handleLinkClick}
          >
            {menuItem.icon}
            <span className="nav-text">{menuItem.title}</span>
          </NavLink>
        ))}
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
