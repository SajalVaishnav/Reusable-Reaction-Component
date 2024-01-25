import React from 'react';
import Image from 'next/image'; 
import UsernameAndPostedTime from './bottom_ribbon/UsernameAndPostedTime';
import CommentIcon from '../../../../public/CommentIcon.svg';
import ReactionComponent from '../ReactionComponent';

interface BottomRibbonProps {
  username: string;
  createdAt: Date; 
  postId: number;
  userId: number;
}

const BottomRibbon: React.FC<BottomRibbonProps> = ({ username, createdAt, postId, userId}) => {
  const bottomRibbonContainerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    fontFeatureSettings: 'ss11 on, cv09 on, liga off, calt off',
  };

  const reactionAndCommentsContainerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '20px',
    flex: '1 0 0',
  };

  const commentContainerStyles: React.CSSProperties = {
    gap: '2px', 
    display: 'flex', 
    alignItems: 'center', 
  };

  const commentTypography: React.CSSProperties = {
    color: 'var(--Dark-Grey, #494E5B)',
    fontFamily: 'Inter',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
    letterSpacing: '-0.42px',
  };

  return (
    <div style={bottomRibbonContainerStyles}>
      <UsernameAndPostedTime username={username} createdAt={createdAt} />
      <span style={reactionAndCommentsContainerStyles}>
        <span style={commentContainerStyles}>
          <span>
            <Image src={CommentIcon} alt="Comment Icon" width={24} height={24} />
          </span>
          <span style={commentTypography}>42 comments</span>
        </span>
        <ReactionComponent postId={postId} userId={userId}/>
      </span>
    </div>
  );
};

export default BottomRibbon;
