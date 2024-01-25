// components/BottomRibbon.tsx
import React from 'react';
import { formatDate } from '../../../utils/timestampDisplay';
interface UsernameAndPostedTimeProps {
  username: string;
  createdAt: Date; 
}

const UsernameAndPostedTime: React.FC<UsernameAndPostedTimeProps> = ({ username, createdAt }) => {
    
    // const containerStyle: React.CSSProperties = {
    //     flex: '1 0 0'
    // };

    const bottomRibbonStyle: React.CSSProperties = {
        flex: '1 0 0',
        fontFeatureSettings: 'ss11 on, cv09 on, liga off, calt off',
        fontFamily: 'Inter',
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: '12px', 
        letterSpacing: '0.28px',
    };

    const usernameStyles: React.CSSProperties = {
        color: '#525866',
        textTransform: 'lowercase'
    };

    const delimiterStyles: React.CSSProperties = {
        color: 'var(--Light-Grey, #868C98)',
        textTransform: 'uppercase'
    };

    const timestampStyles: React.CSSProperties = {
        color: 'var(--Light-Grey, #868C98)',
    };

    const delimiter = " • "; 
    const createdAtText = formatDate(createdAt);
    
    return (
        <div style={bottomRibbonStyle}>
            <span style={usernameStyles}>{username}</span>
            <span style={delimiterStyles}>{delimiter}</span>
            <span style={timestampStyles}>{createdAtText}</span>
        </div>
    );
};

export default UsernameAndPostedTime;
