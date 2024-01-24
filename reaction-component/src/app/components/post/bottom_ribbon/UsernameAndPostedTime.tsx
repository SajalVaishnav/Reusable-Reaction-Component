// components/BottomRibbon.tsx
import React from 'react';

interface UsernameAndPostedTimeProps {
  username: string;
  createdAt: Date; 
}

const formatDate = (date: Date): string => {
    // Format date part
    const optionsDate: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    const datePart = new Date(date).toLocaleDateString('en-US', optionsDate);
  
    // Format time part
    const optionsTime: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const timePart = new Date(date).toLocaleTimeString('en-US', optionsTime);
  
    // Combine date and time
    const formattedDate = `${datePart} ${timePart}`;
  
    return formattedDate;
  };

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
