import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Clock, FileText, TrendingUp, Upload, Plus, Eye, Download } from 'lucide-react';

// Sample data structures
const sampleContract = {
  id: 1,
  contractor: "Jordan Martinez",
  role: "Community Engagement Specialist",
  startDate: "2024-01-15",
  obligations: [
    {
      id: 1,
      clause: "Submit weekly engagement reports documenting partner interactions, outreach activity, and follow-through actions",
      frequency: "Weekly",
      category: "Documentation"
    },
    {
      id: 2,
      clause: "Collect client service feedback and submit engagement documentation for each client interaction",
      frequency: "Per interaction",
      category: "Client Engagement"
    },
    {
      id: 3,
      clause: "Maintain positive engagement quality and client satisfaction",
      frequency: "Ongoing",
      category: "Quality"
    }
  ]
};

const sampleKPIs = [
  {
    id: 1,
    obligationId: 1,
    name: "Weekly Engagement Reports",
    target: 46,
    actual: 43,
    percentage: 93,
    status: "meeting",
    evidence: "43 reports submitted, 41 approved",
    trend: "stable"
  },
  {
    id: 2,
    obligationId: 2,
    name: "Client Survey Completion",
    target: 70,
    actual: 56,
    percentage: 56,
    status: "needs-improvement",
    evidence: "72 of 128 engagements (56%)",
    trend: "declining"
  },
  {
    id: 3,
    obligationId: 3,
    name: "Client Satisfaction Score",
    target: 4.0,
    actual: 4.6,
    percentage: 115,
    status: "exceeds",
    evidence: "4.6 avg, 88% rated 4+ stars",
    trend: "improving"
  }
];

const App = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedContractor, setSelectedContractor] = useState(sampleContract);

  const getStatusColor = (status) => {
    switch(status) {
      case 'exceeds': return '#D4AF37';
      case 'meeting': return '#000000';
      case 'needs-improvement': return '#f39c12';
      case 'non-compliant': return '#d63031';
      default: return '#666666';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'exceeds': return 'Exceeds Expectations';
      case 'meeting': return 'Meeting Expectations';
      case 'needs-improvement': return 'Needs Improvement';
      case 'non-compliant': return 'Non-Compliant';
      default: return 'Unknown';
    }
  };

  const StatusIndicator = ({ status, size = 'md' }) => {
    const sizeClass = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
    return (
      <div 
        className={`${sizeClass} rounded-full`}
        style={{ backgroundColor: getStatusColor(status) }}
      />
    );
  };

  const KPICard = ({ kpi }) => (
    <div className="kpi-card">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="kpi-title">{kpi.name}</h3>
          <p className="kpi-evidence">{kpi.evidence}</p>
        </div>
        <StatusIndicator status={kpi.status} size="lg" />
      </div>
      
      <div className="kpi-metrics">
        <div className="metric">
          <span className="metric-label">Target</span>
          <span className="metric-value">{kpi.target}{typeof kpi.target === 'number' && kpi.target < 10 ? '.0' : '%'}</span>
        </div>
        <div className="metric">
          <span className="metric-label">Actual</span>
          <span className="metric-value">{kpi.actual}{typeof kpi.actual === 'number' && kpi.actual < 10 ? '.0' : '%'}</span>
        </div>
        <div className="metric">
          <span className="metric-label">Status</span>
          <span className="metric-value" style={{ color: getStatusColor(kpi.status) }}>
            {kpi.percentage}%
          </span>
        </div>
      </div>

      <div className="progress-bar-container">
        <div 
          className="progress-bar"
          style={{ 
            width: `${Math.min(kpi.percentage, 100)}%`,
            backgroundColor: getStatusColor(kpi.status)
          }}
        />
      </div>

      <div className="kpi-footer">
        <span className={`trend-badge trend-${kpi.trend}`}>
          {kpi.trend === 'improving' && '↗'} 
          {kpi.trend === 'declining' && '↘'}
          {kpi.trend === 'stable' && '→'}
          {' '}{kpi.trend}
        </span>
      </div>
    </div>
  );

  const ObligationMapper = () => (
    <div className="view-container">
      <div className="view-header">
        <h2>Map Contract Obligations</h2>
        <p className="subtitle">Convert contract clauses into measurable KPIs</p>
      </div>

      <div className="upload-zone">
        <Upload size={32} />
        <h3>Upload Contract or Job Description</h3>
        <p>Supported formats: PDF, DOCX, TXT</p>
        <button className="btn-primary">Browse Files</button>
      </div>

      <div className="obligations-list">
        <h3 className="section-title">Identified Obligations</h3>
        {sampleContract.obligations.map(obligation => (
          <div key={obligation.id} className="obligation-item">
            <div className="obligation-header">
              <span className="obligation-badge">{obligation.category}</span>
              <span className="obligation-frequency">{obligation.frequency}</span>
            </div>
            <p className="obligation-text">{obligation.clause}</p>
            <button className="btn-secondary">
              <Plus size={16} />
              Create KPI
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const Dashboard = () => (
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

  const ReviewGenerator = () => (
    <div className="view-container">
      <div className="view-header">
        <h2>Performance Review Snapshot</h2>
        <p className="subtitle">Auto-generated from contract obligations and tracked data</p>
      </div>

      <div className="review-document">
        <div className="review-header-section">
          <h3>Performance Review</h3>
          <div className="review-meta">
            <div><strong>Employee:</strong> {selectedContractor.contractor}</div>
            <div><strong>Role:</strong> {selectedContractor.role}</div>
            <div><strong>Review Period:</strong> January 2024 - December 2024</div>
            <div><strong>Generated:</strong> {new Date().toLocaleDateString()}</div>
          </div>
        </div>

        <div className="review-section">
          <h4>Weekly Engagement Reports</h4>
          <div className="review-status-line">
            <StatusIndicator status="meeting" />
            <span>Meeting Expectations</span>
          </div>
          <p><strong>Requirement:</strong> Weekly submission of engagement reports documenting partner interactions and outreach activities.</p>
          <p><strong>Performance:</strong> 43 of 46 required reports completed (93%). 41 reports reviewed and approved by supervisor.</p>
          <p><strong>Assessment:</strong> Contractor demonstrates strong consistency in documentation compliance.</p>
        </div>

        <div className="review-section">
          <h4>Client Survey Completion</h4>
          <div className="review-status-line">
            <StatusIndicator status="needs-improvement" />
            <span>Needs Improvement</span>
          </div>
          <p><strong>Requirement:</strong> Collect client feedback surveys after client engagements (target: 70% completion rate).</p>
          <p><strong>Performance:</strong> 72 of 128 client engagements included completed surveys (56% completion rate).</p>
          <p><strong>Assessment:</strong> Below target threshold. Coaching recommended to increase survey collection consistency, particularly at outreach events.</p>
        </div>

        <div className="review-section">
          <h4>Client Satisfaction Quality</h4>
          <div className="review-status-line">
            <StatusIndicator status="exceeds" />
            <span>Exceeds Expectations</span>
          </div>
          <p><strong>Requirement:</strong> Maintain positive engagement quality and client satisfaction.</p>
          <p><strong>Performance:</strong> Average client rating of 4.6 with 88% of ratings at 4 stars or higher. Strong consistency across all service locations.</p>
          <p><strong>Assessment:</strong> Exceptional quality of client interactions. Partner feedback consistently positive.</p>
        </div>

        <div className="review-section">
          <h4>Supervisor Notes</h4>
          <p className="supervisor-notes">
            Contractor demonstrates strong reliability in documentation and navigation follow-through. 
            Client interactions are consistently high-quality. Primary development opportunity is 
            improving survey collection rates during high-volume outreach events. Recommend implementing 
            mobile survey tools to streamline data collection process.
          </p>
        </div>

        <div className="review-actions">
          <button className="btn-secondary">Edit Review</button>
          <button className="btn-primary">Finalize & Save</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:wght@400;500;600&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Open Sans', system-ui, -apple-system, sans-serif;
          background: #f5f7fa;
          color: #1a1a1a;
          line-height: 1.6;
        }

        .app {
          min-height: 100vh;
          display: flex;
        }

        .sidebar {
          width: 280px;
          background: linear-gradient(180deg, #000000 0%, #1a1a1a 100%);
          color: white;
          padding: 32px 24px;
          box-shadow: 4px 0 24px rgba(0,0,0,0.15);
          position: fixed;
          height: 100vh;
          overflow-y: auto;
        }

        .logo {
          font-size: 26px;
          font-weight: 800;
          margin-bottom: 2px;
          letter-spacing: 1px;
          font-family: 'Montserrat', sans-serif;
          text-transform: uppercase;
          color: #ffffff;
        }

        .logo-gold {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #D4AF37;
          text-transform: uppercase;
          font-family: 'Montserrat', sans-serif;
          margin-bottom: 8px;
        }

        .logo-subtitle {
          font-size: 11px;
          opacity: 0.75;
          font-weight: 400;
          margin-bottom: 40px;
          font-family: 'Open Sans', sans-serif;
          line-height: 1.5;
          padding-top: 8px;
          border-top: 1px solid rgba(212,175,55,0.3);
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          margin-bottom: 8px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 15px;
          font-weight: 500;
          background: transparent;
          border: none;
          color: white;
          width: 100%;
          text-align: left;
        }

        .nav-item:hover {
          background: rgba(255,255,255,0.12);
          transform: translateX(2px);
        }

        .nav-item.active {
          background: rgba(212,175,55,0.15);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border-left: 3px solid #D4AF37;
          padding-left: 13px;
        }

        .main-content {
          flex: 1;
          margin-left: 280px;
          padding: 40px 48px;
          max-width: 1400px;
        }

        .view-container {
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .view-header {
          margin-bottom: 32px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .view-header h2 {
          font-size: 32px;
          font-weight: 700;
          color: #1a1a1a;
          letter-spacing: -0.5px;
          margin-bottom: 4px;
          font-family: 'Montserrat', sans-serif;
        }

        .subtitle {
          color: #666666;
          font-size: 15px;
          font-weight: 400;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .btn-primary, .btn-secondary {
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Montserrat', sans-serif;
        }

        .btn-primary {
          background: linear-gradient(135deg, #D4AF37 0%, #C5A028 100%);
          color: #000000;
          box-shadow: 0 4px 12px rgba(212,175,55,0.3);
          font-weight: 700;
        }

        .btn-primary:hover {
          box-shadow: 0 6px 20px rgba(212,175,55,0.4);
          transform: translateY(-1px);
          background: linear-gradient(135deg, #E0BB42 0%, #D4AF37 100%);
        }

        .btn-secondary {
          background: white;
          color: #000000;
          border: 2px solid #e8eced;
        }

        .btn-secondary:hover {
          border-color: #D4AF37;
          background: #fffef8;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: white;
          padding: 24px;
          border-radius: 14px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          display: flex;
          align-items: center;
          gap: 20px;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }

        .stat-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-value {
          font-size: 32px;
          font-weight: 700;
          color: #2d3436;
          line-height: 1;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 14px;
          color: #636e72;
          font-weight: 500;
        }

        .section-title {
          font-size: 20px;
          font-weight: 700;
          color: #2d3436;
          margin-bottom: 20px;
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 24px;
        }

        .kpi-card {
          background: white;
          padding: 28px;
          border-radius: 16px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          border: 1px solid #f1f3f5;
        }

        .kpi-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          transform: translateY(-4px);
        }

        .kpi-title {
          font-size: 18px;
          font-weight: 700;
          color: #2d3436;
          margin-bottom: 8px;
        }

        .kpi-evidence {
          font-size: 14px;
          color: #636e72;
          margin-bottom: 20px;
        }

        .kpi-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }

        .metric {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .metric-label {
          font-size: 12px;
          text-transform: uppercase;
          font-weight: 600;
          color: #95a5a6;
          letter-spacing: 0.5px;
        }

        .metric-value {
          font-size: 24px;
          font-weight: 700;
          font-family: 'DM Mono', monospace;
        }

        .progress-bar-container {
          width: 100%;
          height: 8px;
          background: #f1f3f5;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 16px;
        }

        .progress-bar {
          height: 100%;
          border-radius: 4px;
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .kpi-footer {
          display: flex;
          justify-content: flex-end;
        }

        .trend-badge {
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          text-transform: capitalize;
        }

        .trend-improving {
          background: #FFF8E1;
          color: #C5A028;
        }

        .trend-declining {
          background: #ffeaa7;
          color: #f39c12;
        }

        .trend-stable {
          background: #f5f5f5;
          color: #000000;
        }

        .upload-zone {
          background: white;
          border: 3px dashed #e8eced;
          border-radius: 12px;
          padding: 60px;
          text-align: center;
          margin-bottom: 40px;
          transition: all 0.3s ease;
        }

        .upload-zone:hover {
          border-color: #D4AF37;
          background: #fffef8;
        }

        .upload-zone svg {
          color: #999999;
          margin-bottom: 20px;
        }

        .upload-zone h3 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #1a1a1a;
          font-family: 'Montserrat', sans-serif;
        }

        .upload-zone p {
          color: #666666;
          margin-bottom: 24px;
        }

        .obligations-list {
          background: white;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
        }

        .obligation-item {
          padding: 24px;
          border: 2px solid #f1f3f5;
          border-radius: 10px;
          margin-bottom: 16px;
          transition: all 0.3s ease;
        }

        .obligation-item:hover {
          border-color: #D4AF37;
          box-shadow: 0 4px 16px rgba(212,175,55,0.15);
        }

        .obligation-header {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }

        .obligation-badge {
          padding: 6px 12px;
          background: #FFF8E1;
          color: #C5A028;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }

        .obligation-frequency {
          padding: 6px 12px;
          background: #f1f3f5;
          color: #666666;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }

        .obligation-text {
          color: #1a1a1a;
          margin-bottom: 16px;
          line-height: 1.7;
        }

        .review-document {
          background: white;
          border-radius: 16px;
          padding: 48px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
        }

        .review-header-section {
          border-bottom: 2px solid #f1f3f5;
          padding-bottom: 24px;
          margin-bottom: 32px;
        }

        .review-header-section h3 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 16px;
          color: #2d3436;
        }

        .review-meta {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          font-size: 15px;
          color: #636e72;
        }

        .review-section {
          margin-bottom: 32px;
          padding-bottom: 32px;
          border-bottom: 1px solid #f1f3f5;
        }

        .review-section:last-of-type {
          border-bottom: none;
        }

        .review-section h4 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
          color: #1a1a1a;
          font-family: 'Montserrat', sans-serif;
        }

        .review-status-line {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          font-weight: 600;
          font-size: 15px;
        }

        .review-section p {
          margin-bottom: 12px;
          color: #333333;
          line-height: 1.8;
        }

        .supervisor-notes {
          background: #fffef8;
          padding: 20px;
          border-radius: 10px;
          border-left: 4px solid #D4AF37;
          font-style: italic;
        }

        .review-actions {
          display: flex;
          gap: 16px;
          justify-content: flex-end;
          margin-top: 32px;
          padding-top: 32px;
          border-top: 2px solid #f1f3f5;
        }

        .section-title {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 20px;
          font-family: 'Montserrat', sans-serif;
        }

        .kpi-title {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 8px;
          font-family: 'Montserrat', sans-serif;
        }

        .kpi-evidence {
          font-size: 14px;
          color: #666666;
          margin-bottom: 20px;
        }

        .stat-value {
          font-size: 32px;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1;
          margin-bottom: 4px;
          font-family: 'Montserrat', sans-serif;
        }

        .stat-label {
          font-size: 14px;
          color: #666666;
          font-weight: 500;
        }

        .metric-value {
          font-size: 24px;
          font-weight: 700;
          font-family: 'Montserrat', sans-serif;
        }

        .review-header-section h3 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 16px;
          color: #1a1a1a;
          font-family: 'Montserrat', sans-serif;
        }

        .review-meta {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          font-size: 15px;
          color: #666666;
        }
      `}</style>

      <div className="sidebar">
        <div className="logo">BLACK</div>
        <div className="logo-gold">MEN'S HEALTH CLINIC</div>
        <div className="logo-subtitle">Contract-Aligned Performance System • Care You Can Trust</div>
        
        <button 
          className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveView('dashboard')}
        >
          <TrendingUp size={20} />
          Dashboard
        </button>
        
        <button 
          className={`nav-item ${activeView === 'mapper' ? 'active' : ''}`}
          onClick={() => setActiveView('mapper')}
        >
          <FileText size={20} />
          Map Obligations
        </button>
        
        <button 
          className={`nav-item ${activeView === 'review' ? 'active' : ''}`}
          onClick={() => setActiveView('review')}
        >
          <Eye size={20} />
          Generate Review
        </button>
      </div>

      <div className="main-content">
        {activeView === 'dashboard' && <Dashboard />}
        {activeView === 'mapper' && <ObligationMapper />}
        {activeView === 'review' && <ReviewGenerator />}
      </div>
    </div>
  );
};

export default App;
