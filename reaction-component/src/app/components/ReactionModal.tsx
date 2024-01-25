import React, { useState, useEffect } from 'react';
import { getReactions } from '../../../prisma/db_utils';
import { Cross2Icon } from '@radix-ui/react-icons'; 
import Modal from 'react-modal';
import { formatDate } from '../utils/timestampDisplay';
import { ReactionWithUserAndReactionEmoji } from '../types';

interface ListEntryProps {
  reactionString: string;
  username: string;
  time: Date;
}

const ListEntry: React.FC<ListEntryProps> = ({ reactionString, username, time }) => {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  };

  const leftDivStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const usernameTypography: React.CSSProperties = {
    color: '#525866',
    fontFamily: 'Inter',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '30px', /* 166.667% */
    letterSpacing: '-0.198px',
  };

  const timeStyles: React.CSSProperties = {
    color: 'var(--Light-Grey, #868C98)',
    fontFamily: 'Inter',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '30px', /* 214.286% */
    letterSpacing: '-0.154px',
  };

  return (
    <div style={containerStyles}>
      <div style={leftDivStyles}>
        <div>{reactionString}</div>
        <div style={usernameTypography}>{username}</div>
      </div>
      <div style={timeStyles}>{formatDate(time)}</div>
    </div>
  );
};

interface ReactionModalProps {
  postId: number;
  isOpen: boolean;
  onRequestClose: () => void;
}

const ReactionModal: React.FC<ReactionModalProps> = ({ postId, isOpen, onRequestClose }) => {
  const [reactions, setReactions] = useState<ReactionWithUserAndReactionEmoji[]>([]); // Replace any with your actual reaction type
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | any>(null);

  useEffect(() => {
    if (isOpen) {
      const fetchReactions = async () => {
        setLoading(current => !current);
        try {
          const fetchedReactions = await getReactions(postId);
          setReactions(fetchedReactions);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(current => !current);
        }
      };

      fetchReactions();
    }
  }, [postId, isOpen]);

  const modalContainerStyles: React.CSSProperties = {
    borderRadius: '16px',
    background: 'var(--bg-white-0, #FFF)',
    width: '440px',
    height: '300px', // Fixed height for the modal
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    padding: '0px',
    position: 'absolute', // Added to position the modal absolutely relative to the viewport
    top: '50%', // Center vertically
    left: '50%', // Center horizontally
    transform: 'translate(-50%, -50%)', // Adjust the position to truly center the modal
};

  const headerContainerStyles: React.CSSProperties = {
    padding: '20px',
    display: 'flex', // Added to align items in a row
    justifyContent: 'space-between', // Added to place items on opposite ends
    alignItems: 'center', // Added to align items vertically
  };

  const titleTextStyles: React.CSSProperties = {
    color: 'var(--text-main-900, #0A0D14)',
    fontFeatureSettings: "'ss11' on, 'cv09' on, 'liga' off, 'calt' off",
    fontFamily: 'Inter',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '24px', 
    letterSpacing: '-0.198px',
  };

  const scrollableListStyles: React.CSSProperties = {
    maxHeight: 'calc(100% - 60px)', // Adjusted to account for header/footer if any
    overflowY: 'auto',
    display: 'flex',
    padding: '12px 20px 24px 20px',
    flexDirection: 'column',
    justifyContent: 'flex-start', // Changed to flex-start to align items to the top
    alignItems: 'flex-start',
    gap: '8px',
    alignSelf: 'stretch',
  };

  const closeButtonStyles: React.CSSProperties = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={{ content: modalContainerStyles }}>
      {error && <div>Error: {error.message}</div>} {/* Display error message if error exists */}
      {loading && <div>Loading...</div>} {/* Display loading message if loading is true */}
      <div style={headerContainerStyles}>
        <div style={titleTextStyles}>
          {reactions.length} Likes
        </div>
        <div style={closeButtonStyles} onClick={onRequestClose}>
          <Cross2Icon width={16} height={16} />
        </div>
      </div>
      <div style={scrollableListStyles}>
        {reactions.map((reaction, index) => (
          <ListEntry key={index} reactionString={reaction.reactionEmoji.emojiString} username={reaction.user.username} time={reaction.createdAt} />
        ))}
      </div>
    </Modal>
  );
};

export default ReactionModal;