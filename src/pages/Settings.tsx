import React, { useState } from 'react';
import {
  Notifications,
  Security,
  Storage,
  Language,
  CameraAlt,
  Build,
  Save,
} from '@mui/icons-material';
import './Settings.css';

interface SettingSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  settings: SettingItem[];
}

interface SettingItem {
  id: string;
  label: string;
  type: 'toggle' | 'select' | 'input' | 'button';
  value: any;
  options?: string[];
}

const Settings: React.FC = () => {
  const [settingSections, setSettingSections] = useState<SettingSection[]>([
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <Notifications />,
      settings: [
        {
          id: 'email-notifications',
          label: 'Email Notifications',
          type: 'toggle',
          value: true,
        },
        {
          id: 'alert-sound',
          label: 'Alert Sound',
          type: 'toggle',
          value: true,
        },
      ],
    },
    {
      id: 'security',
      title: 'Security',
      icon: <Security />,
      settings: [
        {
          id: 'two-factor',
          label: 'Two-Factor Authentication',
          type: 'toggle',
          value: false,
        },
        {
          id: 'session-timeout',
          label: 'Session Timeout (minutes)',
          type: 'select',
          value: '30',
          options: ['15', '30', '60', '120'],
        },
      ],
    },
    {
      id: 'storage',
      title: 'Storage & Backup',
      icon: <Storage />,
      settings: [
        {
          id: 'auto-backup',
          label: 'Auto Backup',
          type: 'toggle',
          value: true,
        },
        {
          id: 'retention-period',
          label: 'Video Retention Period',
          type: 'select',
          value: '30',
          options: ['7', '14', '30', '90'],
        },
      ],
    },
    {
      id: 'camera',
      title: 'Camera Settings',
      icon: <CameraAlt />,
      settings: [
        {
          id: 'resolution',
          label: 'Default Resolution',
          type: 'select',
          value: '1080p',
          options: ['720p', '1080p', '1440p', '4K'],
        },
        {
          id: 'frame-rate',
          label: 'Frame Rate',
          type: 'select',
          value: '30',
          options: ['24', '30', '60'],
        },
      ],
    },
  ]);

  const handleSettingChange = (sectionId: string, settingId: string, newValue: any) => {
    setSettingSections(sections =>
      sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              settings: section.settings.map(setting =>
                setting.id === settingId
                  ? { ...setting, value: newValue }
                  : setting
              ),
            }
          : section
      )
    );
  };

  const handleSave = () => {
    // Implement save functionality
    console.log('Saving settings:', settingSections);
  };

  const renderSettingInput = (section: SettingSection, setting: SettingItem) => {
    switch (setting.type) {
      case 'toggle':
        return (
          <label className="setting-toggle">
            <input
              type="checkbox"
              checked={setting.value}
              onChange={(e) =>
                handleSettingChange(section.id, setting.id, e.target.checked)
              }
            />
            <span className="toggle-slider"></span>
          </label>
        );
      case 'select':
        return (
          <select
            value={setting.value}
            onChange={(e) =>
              handleSettingChange(section.id, setting.id, e.target.value)
            }
            className="setting-select"
          >
            {setting.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <button className="save-button" onClick={handleSave}>
          <Save />
          Save Changes
        </button>
      </div>

      <div className="settings-grid">
        {settingSections.map((section) => (
          <div key={section.id} className="settings-card">
            <div className="settings-card-header">
              {section.icon}
              <h2>{section.title}</h2>
            </div>
            <div className="settings-card-content">
              {section.settings.map((setting) => (
                <div key={setting.id} className="setting-item">
                  <span className="setting-label">{setting.label}</span>
                  {renderSettingInput(section, setting)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
