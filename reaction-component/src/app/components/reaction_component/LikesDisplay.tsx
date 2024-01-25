import React from 'react';
import ReactionModal from '../ReactionModal';

interface LikesDisplayProps {
  postId: number;
  likesCount: number;
}

const LikesDisplay: React.FC<LikesDisplayProps> = ({ postId, likesCount }) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div onClick={openModal} style={{ cursor: 'pointer' }}>
        {likesCount}
      </div>
      <ReactionModal
        postId={postId}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      />
    </>
  );
};

export default LikesDisplay;