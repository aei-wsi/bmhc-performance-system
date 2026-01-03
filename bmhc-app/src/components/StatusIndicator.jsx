import React from 'react';
import { getStatusColor } from '../utils/statusHelpers';

const StatusIndicator = ({ status, size = 'md' }) => {
  const sizeClass = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

  return (
    <div
      className={`${sizeClass} rounded-full`}
      style={{ backgroundColor: getStatusColor(status) }}
    />
  );
};

export default StatusIndicator;
