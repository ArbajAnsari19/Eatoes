
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  className = '' 
}) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-6 w-6',
    large: 'h-10 w-10'
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`loader ${sizeClasses[size]} ${className}`}></div>
    </div>
  );
};

export default LoadingSpinner;
