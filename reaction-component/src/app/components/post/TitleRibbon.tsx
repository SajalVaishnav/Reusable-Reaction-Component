// components/TitleRibbon.tsx
import React from 'react';

interface TitleRibbonProps {
  title: string;
}

const TitleRibbon: React.FC<TitleRibbonProps> = ({ title }) => {
  return (
    <div className="bg-blue-500 text-white p-2">
      {title}
    </div>
  );
};

export default TitleRibbon;
