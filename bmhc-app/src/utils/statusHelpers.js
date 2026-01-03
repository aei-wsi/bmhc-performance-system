// Status utility functions for KPI tracking

export const getStatusColor = (status) => {
  switch(status) {
    case 'exceeds': return '#D4AF37';
    case 'meeting': return '#000000';
    case 'needs-improvement': return '#f39c12';
    case 'non-compliant': return '#d63031';
    default: return '#666666';
  }
};

export const getStatusLabel = (status) => {
  switch(status) {
    case 'exceeds': return 'Exceeds Expectations';
    case 'meeting': return 'Meeting Expectations';
    case 'needs-improvement': return 'Needs Improvement';
    case 'non-compliant': return 'Non-Compliant';
    default: return 'Unknown';
  }
};
