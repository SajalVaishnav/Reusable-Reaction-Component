// components/BottomRibbon.tsx
import React from 'react';

interface BottomRibbonProps {
  username: string;
  createdAt: string; // Assuming createdAt is a string, adjust accordingly
}

const BottomRibbon: React.FC<BottomRibbonProps> = ({ username, createdAt }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span>{username}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span>{createdAt}</span>
      </div>
    </div>
  );
};

export default BottomRibbon;
