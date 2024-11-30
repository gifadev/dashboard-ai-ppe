import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton, Typography, Paper } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import './VideoPlayer.css';

interface Detection {
  id: number;
  type: string;
  bbox: { x: number; y: number; width: number; height: number };
  color: string;
}

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showHoverTime, setShowHoverTime] = useState(false);
  const [hoverTime, setHoverTime] = useState(0);
  const [hoverPosition, setHoverPosition] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [detections] = useState<Detection[]>([
    { 
      id: 1, 
      type: 'Person', 
      bbox: { x: 20, y: 30, width: 100, height: 200 },
      color: '#FFD700'
    },
    // Add more mock detections as needed
  ]);

  useEffect(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      setCurrentTime(current);
      setProgress((current / duration) * 100);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      const newTime = (duration * percentage) / 100;
      videoRef.current.currentTime = newTime;
      setProgress(percentage);
    }
  };

  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      const time = (duration * percentage) / 100;
      setHoverTime(time);
      setHoverPosition(x);
      setShowHoverTime(true);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="video-container">
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-video-bg rounded-lg overflow-hidden shadow-lg">
        <video
          ref={videoRef}
          className="video-player"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
          src="/videos/video.mp4"
        />
        
        <div className="video-controls">
          <div 
            className="progress-container" 
            ref={progressRef}
            onClick={handleProgressClick}
            onMouseMove={handleProgressHover}
            onMouseLeave={() => setShowHoverTime(false)}
          >
            <div className="progress-bar" style={{ width: `${progress}%` }} />
            {showHoverTime && (
              <div 
                className="progress-hover"
                style={{ left: hoverPosition }}
              >
                {formatTime(hoverTime)}
              </div>
            )}
          </div>
          
          <div className="controls-row">
            <div className="controls-left">
              <button
                onClick={togglePlay}
                className="control-button"
                type="button"
              >
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </button>
              
              <button
                onClick={toggleMute}
                className="control-button"
                type="button"
              >
                {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
              </button>
              
              <span className="time-display">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Thumbnail Preview */}
      <div className="flex gap-3 mt-4 overflow-x-auto pb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="w-40 h-20 bg-gray-500 flex-shrink-0 cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
