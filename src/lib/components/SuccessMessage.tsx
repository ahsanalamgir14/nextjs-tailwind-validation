"use client";

import React from 'react';

export interface SuccessMessageProps {
  message?: string;
  className?: string;
  showIcon?: boolean;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message = 'Valid',
  className = '',
  showIcon = true
}) => {
  const containerClasses = `
    mt-1 text-sm text-green-600
    ${className}
  `;

  const iconClasses = `
    inline-block w-4 h-4 mr-1 text-green-500
  `;

  return (
    <div className={containerClasses}>
      <div className="flex items-start">
        {showIcon && (
          <svg 
            className={iconClasses} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
              clipRule="evenodd" 
            />
          </svg>
        )}
        <span>{message}</span>
      </div>
    </div>
  );
}; 