import React from 'react';
import StatusIndicator from './StatusIndicator';

const ReviewGenerator = ({ selectedContractor }) => (
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

export default ReviewGenerator;
