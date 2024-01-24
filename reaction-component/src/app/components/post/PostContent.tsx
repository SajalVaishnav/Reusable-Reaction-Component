import React from 'react';

interface PostContentProps {
  content: string;
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
  const postContentStyles: React.CSSProperties = {
    alignSelf: 'stretch',
    color: '#525866',
    fontFeatureSettings: "'ss11' on, 'cv09' on, 'liga' off, 'calt' off",
    fontFamily: 'Inter',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '-0.084px',
  };

  return (
    <div className="my-4" style={postContentStyles}>
      {content}
    </div>
  );
};

export default PostContent;
