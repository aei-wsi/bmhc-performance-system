import React from 'react';
import { TrendingUp, CheckCircle, Clock, AlertCircle, FileText, Download } from 'lucide-react';
import KPICard from './KPICard';
import { sampleKPIs } from '../data/sampleData';

const Dashboard = ({ selectedContractor }) => (
  <div className="view-container">
    <div className="view-header">
      <div>
        <h2>{selectedContractor.contractor}</h2>
        <p className="subtitle">{selectedContractor.role} • Started {new Date(selectedContractor.startDate).toLocaleDateString()}</p>
      </div>
      <div className="header-actions">
        <button className="btn-secondary">
          <FileText size={18} />
          View Contract
        </button>
        <button className="btn-primary">
          <Download size={18} />
          Generate Review
        </button>
      </div>
    </div>

    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon" style={{ backgroundColor: '#f5f5f5' }}>
          <TrendingUp size={24} color="#000000" />
        </div>
        <div>
          <div className="stat-value">3</div>
          <div className="stat-label">Active KPIs</div>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon" style={{ backgroundColor: '#FFF8E1' }}>
          <CheckCircle size={24} color="#D4AF37" />
        </div>
        <div>
          <div className="stat-value">1</div>
          <div className="stat-label">Exceeding</div>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon" style={{ backgroundColor: '#f0f0f0' }}>
          <Clock size={24} color="#000000" />
        </div>
        <div>
          <div className="stat-value">1</div>
          <div className="stat-label">Meeting</div>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon" style={{ backgroundColor: '#fff4de' }}>
          <AlertCircle size={24} color="#f39c12" />
        </div>
        <div>
          <div className="stat-value">1</div>
          <div className="stat-label">Needs Attention</div>
        </div>
      </div>
    </div>

    <div className="section-title" style={{ marginTop: '32px', marginBottom: '16px' }}>
      Performance Metrics
    </div>
    <div className="kpi-grid">
      {sampleKPIs.map(kpi => <KPICard key={kpi.id} kpi={kpi} />)}
    </div>
  </div>
);

export default Dashboard;
