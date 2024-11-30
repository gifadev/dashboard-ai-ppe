import React, { useState } from 'react';
import {
  Search,
  FilterList,
  PlayArrow,
  Warning,
  Schedule,
  LocationOn,
  CalendarToday,
} from '@mui/icons-material';
import './VideoArchive.css';

interface VideoData {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  duration: string;
  violations: number;
  thumbnail: string;
  videoUrl: string;
}

const VideoArchive: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Sample video data menggunakan video.mp4
  const videos: VideoData[] = [
    {
      id: '1',
      title: 'Building A - Main Entrance',
      date: '2024-01-15',
      time: '09:30 AM',
      location: 'Building A - Floor 1',
      duration: '2:30:00',
      violations: 3,
      thumbnail: '/videos/thumb1.jpg',
      videoUrl: '/videos/video.mp4'
    },
    {
      id: '2',
      title: 'Production Line Safety Check',
      date: '2024-01-15',
      time: '10:45 AM',
      location: 'Building B - Production',
      duration: '1:45:00',
      violations: 5,
      thumbnail: '/videos/thumb2.jpg',
      videoUrl: '/videos/video.mp4'
    },
    {
      id: '3',
      title: 'Storage Area Monitoring',
      date: '2024-01-15',
      time: '02:15 PM',
      location: 'Storage Facility',
      duration: '3:00:00',
      violations: 2,
      thumbnail: '/videos/thumb3.jpg',
      videoUrl: '/videos/video.mp4'
    }
  ];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'violations') return matchesSearch && video.violations > 0;
    return matchesSearch;
  });

  const handlePlayVideo = (videoUrl: string) => {
    // Buka video dalam tab baru
    window.open(videoUrl, '_blank');
  };

  return (
    <div className="video-archive">
      <div className="archive-header">
        <h1>Video Archive</h1>
        <div className="time-filter">
          <Schedule />
          <select defaultValue="today">
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      <div className="search-filter-container">
        <div className="search-bar">
          <Search />
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="filter-options">
          <FilterList />
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="all">All Videos</option>
            <option value="violations">With Violations</option>
          </select>
        </div>
      </div>

      <div className="videos-grid">
        {filteredVideos.map(video => (
          <div key={video.id} className="video-card">
            <div className="video-thumbnail">
              <img src={video.thumbnail} alt={video.title} />
              <div className="video-duration">
                <Schedule />
                {video.duration}
              </div>
              <button 
                className="play-button"
                onClick={() => handlePlayVideo(video.videoUrl)}
              >
                <PlayArrow />
              </button>
              {video.violations > 0 && (
                <div className="violation-badge">
                  <Warning />
                  {video.violations} violations
                </div>
              )}
            </div>
            
            <div className="video-info">
              <h3>{video.title}</h3>
              <div className="video-details">
                <div className="detail-item">
                  <LocationOn />
                  <span>{video.location}</span>
                </div>
                <div className="detail-item">
                  <CalendarToday />
                  <span>{video.date} - {video.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoArchive;
