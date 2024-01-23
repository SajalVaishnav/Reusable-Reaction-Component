// components/Post.tsx
import React from 'react';
import TitleRibbon from './post/TitleRibbon';
import PostContent from './post/PostContent';
import BottomRibbon from './post/BottomRibbon';
// import ReactionComponent from './ReactionComponent';

interface PostProps {
  title: string;
  content: string;
  author: string;
  createdTime: string;
}

const Post: React.FC<PostProps> = ({ title, content, author, createdTime }) => {
  return (
    <div className="border p-4 my-4">
      <TitleRibbon title={title} />
      <PostContent content={content} />
      <BottomRibbon username={author} createdAt={createdTime} />
      {/* <ReactionComponent /> */}
    </div>
  );
};

export default Post;
