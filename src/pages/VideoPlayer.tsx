import React from 'react';
import './VideoPlayer.css';

const VideoPlayer: React.FC = () => {
  return (
    <div className="video-player-page">
      <div className="video-player-header">
        <h1>Video Analysis</h1>
        <p>Upload and analyze video for safety detection</p>
      </div>

      <div className="video-player-container">
        <iframe
          src="https://smartdetection.ap.ngrok.io/player"
          className="video-player-iframe"
          title="Video Player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
