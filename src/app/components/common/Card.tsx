// src/app/components/common/Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  padding?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  padding = true,
}) => {
  return (
    <div
      className={`card ${padding ? 'p-4' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;