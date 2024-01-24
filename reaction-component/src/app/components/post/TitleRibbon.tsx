import React from 'react';

interface TitleRibbonProps {
  title: string;
}

const TitleRibbon: React.FC<TitleRibbonProps> = ({ title }) => {
  const titleRibbonStyles: React.CSSProperties = {
    alignSelf: 'stretch',
    color: '#0A0D14',
    fontFeatureSettings: "'ss11' on, 'cv09' on, 'liga' off, 'calt' off",
    fontFamily: 'Inter',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '24px',
    letterSpacing: '-0.27px',
  };

  return (
    <div style={titleRibbonStyles}>
      {title}
    </div>
  );
};

export default TitleRibbon;
