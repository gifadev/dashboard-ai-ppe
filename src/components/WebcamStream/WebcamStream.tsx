import React from 'react';
import './WebcamStream.css';

interface WebcamStreamProps {
  streamUrl: string;
}

const WebcamStream: React.FC<WebcamStreamProps> = ({ streamUrl }) => {
  return (
    <div className="webcam-container">
      <iframe
        src={streamUrl}
        title="Smart Detection Stream"
        className="webcam-iframe"
        allow="camera *"
        allowFullScreen
      />
    </div>
  );
};

export default WebcamStream;
