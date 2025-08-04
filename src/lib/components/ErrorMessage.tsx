"use client";

import React from 'react';

export interface ErrorMessageProps {
  error?: string | null;
  errors?: string[];
  className?: string;
  showIcon?: boolean;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  errors,
  className = '',
  showIcon = true
}) => {
  const errorMessages = errors || (error ? [error] : []);
  
  if (errorMessages.length === 0) {
    return null;
  }

  const containerClasses = `
    mt-1 text-sm text-red-600
    ${className}
  `;

  const iconClasses = `
    inline-block w-4 h-4 mr-1 text-red-500
  `;

  return (
    <div className={containerClasses}>
      {errorMessages.map((message, index) => (
        <div key={index} className="flex items-start">
          {showIcon && (
            <svg 
              className={iconClasses} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                clipRule="evenodd" 
              />
            </svg>
          )}
          <span>{message}</span>
        </div>
      ))}
    </div>
  );
}; 