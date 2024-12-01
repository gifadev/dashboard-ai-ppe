import React, { useState } from 'react';
import './LiveView.css';
import WebcamStream from '../components/WebcamStream/WebcamStream.tsx';
import Modal from '../components/Modal/Modal.tsx';

interface CameraData {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  violations: number;
  stream: string;
}

const sampleCameras: CameraData[] = [
  {
    id: 'CAM-01',
    name: 'Smart Detection Camera',
    location: 'Main Detection Area',
    status: 'online',
    violations: 0,
    stream: 'https://smartdetection.ap.ngrok.io/webcam',
  }
];

interface CameraCardProps {
  camera: CameraData;
  onCardClick: () => void;
}

const CameraCard: React.FC<CameraCardProps> = ({ camera, onCardClick }) => {
  return (
    <div className="camera-card" onClick={onCardClick}>
      <div className="camera-preview">
        <WebcamStream 
          streamUrl={camera.stream}
        />
      </div>
      <div className="camera-info">
        <div className="camera-header">
          <h3>{camera.name}</h3>
          <span className={`status ${camera.status}`}>{camera.status}</span>
        </div>
        <p className="location">{camera.location}</p>
        <div className="violations">
          <span>Violations: {camera.violations}</span>
        </div>
      </div>
    </div>
  );
};

const LiveView: React.FC = () => {
  const [selectedCamera, setSelectedCamera] = useState<CameraData | null>(null);

  const handleCardClick = (camera: CameraData) => {
    setSelectedCamera(camera);
  };

  const handleCloseModal = () => {
    setSelectedCamera(null);
  };

  return (
    <div className="live-view">
      <div className="live-view-header">
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
          <div
            key={camera.id}
            className="camera-card"
            onClick={() => handleCardClick(camera)}
          >
            <div className="camera-preview">
              <WebcamStream streamUrl={camera.stream} />
            </div>
            <div className="camera-info">
              <h3>{camera.name}</h3>
              <p>{camera.location}</p>
              <div className="camera-status">
                <span className={`status ${camera.status}`}>
                  {camera.status}
                </span>
                <span className="violations">
                  Violations: {camera.violations}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={!!selectedCamera} onClose={handleCloseModal}>
        {selectedCamera && (
          <div className="modal-camera-view">
            <WebcamStream streamUrl={selectedCamera.stream} />
            <div className="modal-camera-info">
              <h2>{selectedCamera.name}</h2>
              <p>{selectedCamera.location}</p>
              <div className="modal-status">
                <span className={`status ${selectedCamera.status}`}>
                  {selectedCamera.status}
                </span>
                <span className="violations">
                  Violations: {selectedCamera.violations}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LiveView;
