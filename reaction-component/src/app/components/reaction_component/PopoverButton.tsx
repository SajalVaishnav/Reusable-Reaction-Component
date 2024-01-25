import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import LikedButton from '../../../../public/thumbs-up-filled.svg'
import UnlikedButton from '../../../../public/thumbs-up-unfilled.svg'
import './styles.css';
import Image from 'next/image';
import { Cross2Icon } from '@radix-ui/react-icons'
import { ReactionEmoji } from '@prisma/client';

interface PopoverButtonProps {
    isLiked: boolean;
    onLikeClick: (reactionEmojiId: number) => Promise<void>;
    emojis: ReactionEmoji[];
}

const PopoverButton: React.FC<PopoverButtonProps> = ({ isLiked, onLikeClick, emojis }) => {
  const [open, setOpen] = useState(false); 

  const handleClick = (id: number = -1) => {
    console.log('clicked', id);
    onLikeClick(id);
    setOpen(false);
};

  return (  
      <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger asChild>
              <button 
                className='like-button' 
                onClick={isLiked ? () => handleClick() : undefined}
              >
                  {isLiked ? <Image src={LikedButton} alt="Liked" width={20} height={20} /> : <Image src={UnlikedButton} alt="Unliked" width={20} height={20}/>}
              </button>
          </Popover.Trigger>
          {!isLiked && (
            <Popover.Portal>
                <Popover.Content className="PopoverContent inline-block" sideOffset={5}>
                    <div className="emoji-container">
                        {emojis.map((emoji, index) => (
                            <button key={index} className="emoji" onClick={() => handleClick(emoji.id)}>
                                {emoji.typeDetails}
                            </button>
                        ))}
                    </div>
                </Popover.Content>
            </Popover.Portal>
          )}
      </Popover.Root>
  );
};

export default PopoverButton;