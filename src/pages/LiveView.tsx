import React from 'react';
import './LiveView.css';

interface CameraData {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  violations: number;
  stream: string; // URL to video stream
}

const sampleCameras: CameraData[] = [
  {
    id: 'CAM-01',
    name: 'Building A - Main Entrance',
    location: 'Building A - Floor 1',
    status: 'online',
    violations: 2,
    stream: '/videos/video.mp4', // Sample video for demo
  },
  {
    id: 'CAM-02',
    name: 'Production Line Safety Check',
    location: 'Building B - Production',
    status: 'online',
    violations: 0,
    stream: '/videos/video.mp4',
  },
  {
    id: 'CAM-03',
    name: 'Storage Area Monitoring',
    location: 'Storage Facility',
    status: 'online',
    violations: 1,
    stream: '/videos/video.mp4',
  },
  {
    id: 'CAM-04',
    name: 'Storage Area Monitoring',
    location: 'Storage Facility',
    status: 'online',
    violations: 1,
    stream: '/videos/video.mp4',
  },
  {
    id: 'CAM-05',
    name: 'Storage Area Monitoring',
    location: 'Storage Facility',
    status: 'online',
    violations: 1,
    stream: '/videos/video.mp4',
  },
];

const CameraCard: React.FC<{
  camera: CameraData;
}> = ({ camera }) => {
  return (
    <div className="camera-card">
      <div className="camera-feed">
        <video autoPlay loop muted>
          <source src={camera.stream} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="camera-overlay">
          <div className="camera-info">
            <h3>{camera.name}</h3>
            <p>{camera.location}</p>
          </div>
          <div className={`status-badge ${camera.status}`}>{camera.status}</div>
        </div>
      </div>
    </div>
  );
};

const LiveView: React.FC = () => {
  return (
    <div className="live-view">
      <div className="live-header">
        <h1>Live View</h1>
        <div className="time-filter">
          <select defaultValue="today">
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      <div className="camera-grid">
        {sampleCameras.map((camera) => (
          <CameraCard key={camera.id} camera={camera} />
        ))}
      </div>
    </div>
  );
};

export default LiveView;
