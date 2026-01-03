import React from 'react';
import { Upload, Plus } from 'lucide-react';
import { sampleContract } from '../data/sampleData';

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

export default ObligationMapper;
