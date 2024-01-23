// components/PostContent.tsx
import React from 'react';

interface PostContentProps {
  content: string;
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
  return (
    <div className="my-4">
      {content}
    </div>
  );
};

export default PostContent;
