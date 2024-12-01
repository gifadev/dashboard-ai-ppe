import React from 'react';
import {
  Warning,
  Videocam,
  People,
  Assessment,
  TrendingUp,
  TrendingDown,
  Schedule,
} from '@mui/icons-material';
import {
  PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, ResponsiveContainer
} from 'recharts';
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
      value: '1/10',
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

  const pieData = recentViolations.map(violation => ({
    name: violation.type,
    value: violation.count
  }));

  const COLORS = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6'];
  const CHART_COLORS = {
    primary: '#EF4444',
    secondary: 'rgba(239, 68, 68, 0.15)',
    grid: 'rgba(255, 255, 255, 0.1)',
    text: 'rgba(255, 255, 255, 0.7)'
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
            <h2>PPE Violations Distribution</h2>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill={CHART_COLORS.secondary}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(30, 41, 59, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: CHART_COLORS.text
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="time-series-card">
          <div className="card-header">
            <h2>Violation Trends</h2>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeData.violations.map((value, index) => ({
                time: timeData.labels[index],
                violations: value
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
                <XAxis 
                  dataKey="time" 
                  stroke={CHART_COLORS.text}
                  tick={{ fill: CHART_COLORS.text }}
                />
                <YAxis 
                  stroke={CHART_COLORS.text}
                  tick={{ fill: CHART_COLORS.text }}
                />
                <Tooltip
                  contentStyle={{ 
                    background: 'rgba(30, 41, 59, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: CHART_COLORS.text
                  }}
                />
                <Legend 
                  wrapperStyle={{ color: CHART_COLORS.text }}
                />
                <Line 
                  type="monotone" 
                  dataKey="violations" 
                  stroke={CHART_COLORS.primary}
                  strokeWidth={2}
                  dot={{ fill: CHART_COLORS.primary }}
                  activeDot={{ r: 6, fill: CHART_COLORS.primary }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="locations-card">
          <div className="card-header">
            <h2>Violations by Location</h2>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={locations}>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
                <XAxis 
                  dataKey="name" 
                  stroke={CHART_COLORS.text}
                  tick={{ fill: CHART_COLORS.text }}
                />
                <YAxis 
                  stroke={CHART_COLORS.text}
                  tick={{ fill: CHART_COLORS.text }}
                />
                <Tooltip
                  contentStyle={{ 
                    background: 'rgba(30, 41, 59, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: CHART_COLORS.text
                  }}
                />
                <Legend
                  wrapperStyle={{ color: CHART_COLORS.text }}
                />
                <Bar 
                  dataKey="violations" 
                  fill={CHART_COLORS.primary}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
