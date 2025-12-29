import React from 'react';
import StatusIndicator from './StatusIndicator';
import { getStatusColor } from '../utils/statusHelpers';

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

export default KPICard;
