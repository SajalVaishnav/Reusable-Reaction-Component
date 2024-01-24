import React from 'react';
import TitleRibbon from './post/TitleRibbon';
import PostContent from './post/PostContent';
import BottomRibbon from './post/BottomRibbon';
// import ReactionComponent from './ReactionComponent';

interface PostProps {
  title: string;
  content: string;
  author: string;
  createdTime: Date;
}

const Post: React.FC<PostProps> = ({ title, content, author, createdTime }) => {
  const postStyles: React.CSSProperties = {
    display: 'flex',
    width: '562px',
    padding: '16px',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    borderRadius: '8px',
    border: '1px solid #E2E4E9',
  };

  const userAvatarStyles: React.CSSProperties = {
    borderRadius: '125px',
    border: '2.5px solid #FFF',
    background: 'linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 100%), #FCFAF4',
    width: '40px',
    height: '40px'
  };

  const postAndAvatarContainerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
  };

  return (
    <div style={postAndAvatarContainerStyles}>
      <div style={userAvatarStyles} />
      <div style={postStyles}>
        <TitleRibbon title={title} />
        <PostContent content={content} />
        <BottomRibbon username={author} createdAt={createdTime} />
        {/* <ReactionComponent /> */}
      </div>
    </div>
  );
};

export default Post;
