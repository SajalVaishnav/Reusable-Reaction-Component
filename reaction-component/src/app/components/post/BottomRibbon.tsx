// components/BottomRibbon.tsx
import React from 'react';
import UsernameAndPostedTime from './bottom_ribbon/UsernameAndPostedTime';
interface BottomRibbonProps {
  username: string;
  createdAt: Date; // Assuming createdAt is a string, adjust accordingly
}

const BottomRibbon: React.FC<BottomRibbonProps> = ({ username, createdAt }) => {
  const bottomRibbonStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    fontFeatureSettings: 'ss11 on, cv09 on, liga off, calt off'
  };

  return (
    <div style={bottomRibbonStyles}>
      <UsernameAndPostedTime username={username} createdAt={createdAt} />
    </div>
  );
};

export default BottomRibbon;
