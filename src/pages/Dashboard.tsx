import React from 'react';
import {
  Warning,
  Videocam,
  People,
  Assessment,
  TrendingUp,
  TrendingDown,
  Schedule,
  LocationOn,
} from '@mui/icons-material';
import './Dashboard.css';

interface StatCard {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isUp: boolean;
  };
  color?: string;
}

interface ViolationData {
  type: string;
  count: number;
  trend: number;
  severity: 'high' | 'medium' | 'low';
}

interface LocationData {
  name: string;
  violations: number;
  cameras: number;
  status: 'active' | 'warning' | 'critical';
}

const Dashboard: React.FC = () => {
  const stats: StatCard[] = [
    {
      title: 'Active Cameras',
      value: '24/30',
      icon: <Videocam />,
      trend: { value: 2, isUp: true },
      color: '#4CAF50',
    },
    {
      title: 'Total Violations',
      value: 147,
      icon: <Warning />,
      trend: { value: 12, isUp: false },
      color: '#FF5252',
    },
    {
      title: 'Workers Present',
      value: 89,
      icon: <People />,
      trend: { value: 5, isUp: true },
      color: '#2196F3',
    },
    {
      title: 'Safety Score',
      value: '92%',
      icon: <Assessment />,
      trend: { value: 3, isUp: true },
      color: '#FFC107',
    },
  ];

  const recentViolations: ViolationData[] = [
    {
      type: 'No Helmet',
      count: 45,
      trend: 12,
      severity: 'high',
    },
    {
      type: 'No Safety Vest',
      count: 32,
      trend: -8,
      severity: 'medium',
    },
    {
      type: 'Restricted Area',
      count: 28,
      trend: 5,
      severity: 'high',
    },
    {
      type: 'No Safety Goggles',
      count: 22,
      trend: -3,
      severity: 'low',
    },
  ];

  const locations: LocationData[] = [
    {
      name: 'Building A - Floor 1',
      violations: 12,
      cameras: 8,
      status: 'active',
    },
    {
      name: 'Building B - Production',
      violations: 45,
      cameras: 12,
      status: 'critical',
    },
    {
      name: 'Building A - Floor 3',
      violations: 28,
      cameras: 6,
      status: 'warning',
    },
    {
      name: 'Storage Facility',
      violations: 15,
      cameras: 4,
      status: 'active',
    },
  ];

  const timeData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    violations: [4, 8, 15, 12, 20, 10],
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Safety Dashboard</h1>
        <div className="time-filter">
          <Schedule />
          <select defaultValue="today">
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ '--accent-color': stat.color } as any}>
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20` }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <div className="stat-value">
                <span>{stat.value}</span>
                {stat.trend && (
                  <div className={`trend ${stat.trend.isUp ? 'up' : 'down'}`}>
                    {stat.trend.isUp ? <TrendingUp /> : <TrendingDown />}
                    {stat.trend.value}%
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="violations-card">
          <div className="card-header">
            <h2>Recent Violations</h2>
          </div>
          <div className="violations-list">
            {recentViolations.map((violation, index) => (
              <div key={index} className="violation-item">
                <div className="violation-info">
                  <div className={`severity-indicator ${violation.severity}`} />
                  <span className="violation-type">{violation.type}</span>
                </div>
                <div className="violation-stats">
                  <span className="violation-count">{violation.count}</span>
                  <div className={`trend ${violation.trend > 0 ? 'up' : 'down'}`}>
                    {violation.trend > 0 ? <TrendingUp /> : <TrendingDown />}
                    {Math.abs(violation.trend)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="locations-card">
          <div className="card-header">
            <h2>Location Overview</h2>
          </div>
          <div className="locations-list">
            {locations.map((location, index) => (
              <div key={index} className="location-item">
                <div className="location-header">
                  <LocationOn />
                  <h3>{location.name}</h3>
                </div>
                <div className="location-stats">
                  <div className="location-stat">
                    <Warning />
                    <span>{location.violations} violations</span>
                  </div>
                  <div className="location-stat">
                    <Videocam />
                    <span>{location.cameras} cameras</span>
                  </div>
                  <div className={`status-badge ${location.status}`}>
                    {location.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="time-distribution-card">
          <div className="card-header">
            <h2>Violations by Time</h2>
          </div>
          <div className="time-chart">
            <div className="chart-bars">
              {timeData.violations.map((value, index) => (
                <div
                  key={index}
                  className="chart-bar"
                  style={{ height: `${(value / Math.max(...timeData.violations)) * 100}%` }}
                >
                  <span className="bar-value">{value}</span>
                </div>
              ))}
            </div>
            <div className="chart-labels">
              {timeData.labels.map((label, index) => (
                <span key={index} className="time-label">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
