import React, { useState } from 'react';
import {
  WarningAmber,
  CalendarToday,
  LocationOn,
  Person,
  Construction,
  Description,
  Search,
  ErrorOutline,
} from '@mui/icons-material';
import './Accidents.css';

interface Accident {
  id: number;
  date: string;
  location: string;
  worker: string;
  equipment: string;
  description: string;
  severity: 'High' | 'Medium' | 'Low';
  ppeViolation: string;
  status: 'Open' | 'Closed' | 'Under Investigation';
}

const sampleAccidents: Accident[] = [
  {
    id: 1,
    date: '2024-01-15',
    location: 'Building A - Floor 3',
    worker: 'John Smith',
    equipment: 'Safety Harness',
    description: 'Worker failed to properly secure safety harness while working at height',
    severity: 'High',
    ppeViolation: 'Improper use of fall protection equipment',
    status: 'Closed',
  },
  {
    id: 2,
    date: '2024-01-18',
    location: 'Building B - Foundation',
    worker: 'Mike Johnson',
    equipment: 'Safety Helmet',
    description: 'Worker not wearing safety helmet in designated hard hat area',
    severity: 'Medium',
    ppeViolation: 'Missing head protection',
    status: 'Under Investigation',
  },
  {
    id: 3,
    date: '2024-01-20',
    location: 'Building A - Floor 5',
    worker: 'Sarah Williams',
    equipment: 'Safety Goggles',
    description: 'Eye injury due to not wearing safety goggles during grinding operation',
    severity: 'High',
    ppeViolation: 'Missing eye protection',
    status: 'Open',
  },
];

const AccidentCard: React.FC<{ accident: Accident }> = ({ accident }) => {
  return (
    <div className={`accident-card ${accident.severity.toLowerCase()}-severity`}>
      <div className="accident-header">
        <div className={`severity-badge ${accident.severity.toLowerCase()}`}>
          <WarningAmber />
          {accident.severity} Severity
        </div>
        <div className={`status-badge ${accident.status.toLowerCase().replace(' ', '-')}`}>
          {accident.status}
        </div>
      </div>

      <div className="accident-info">
        <div className="info-item">
          <CalendarToday />
          <div>
            <span className="label">Date</span>
            <span className="value">{accident.date}</span>
          </div>
        </div>
        <div className="info-item">
          <LocationOn />
          <div>
            <span className="label">Location</span>
            <span className="value">{accident.location}</span>
          </div>
        </div>
        <div className="info-item">
          <Person />
          <div>
            <span className="label">Worker</span>
            <span className="value">{accident.worker}</span>
          </div>
        </div>
        <div className="info-item">
          <Construction />
          <div>
            <span className="label">Equipment</span>
            <span className="value">{accident.equipment}</span>
          </div>
        </div>
      </div>

      <div className="accident-description">
        <Description />
        {accident.description}
      </div>

      <div className="violation-tag">
        <strong>
          <ErrorOutline style={{ marginRight: '8px' }} />
          PPE Violation
        </strong>
        {accident.ppeViolation}
      </div>
    </div>
  );
};

const Accidents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredAccidents = sampleAccidents.filter((accident) => {
    const matchesSearch = 
      accident.worker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      accident.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      accident.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = filterSeverity === 'all' || accident.severity === filterSeverity;
    const matchesStatus = filterStatus === 'all' || accident.status === filterStatus;

    return matchesSearch && matchesSeverity && matchesStatus;
  });

  return (
    <div className="accidents-container">
      <div className="accidents-header">
        <h1 className="accidents-title">Accident Reports</h1>
      </div>

      <div className="filters-container">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search accidents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-select-container">
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Severities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="filter-select-container">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Statuses</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="Under Investigation">Under Investigation</option>
          </select>
        </div>
      </div>

      <div className="accidents-grid">
        {filteredAccidents.map((accident) => (
          <AccidentCard key={accident.id} accident={accident} />
        ))}
      </div>
    </div>
  );
};

export default Accidents;
