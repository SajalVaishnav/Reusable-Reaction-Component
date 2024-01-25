'use client';
import React, { useState, useEffect } from 'react';
import LikesDisplay from './reaction/LikesCountDisplayButton';
import PopoverButton from './reaction/LikeButton';
import { getReactionCount, createReaction, deleteReaction, hasUserReacted, getReactionEmojis } from '../../../prisma/db_utils';
import { ReactionEmoji } from '@prisma/client';

interface ReactionComponentProps {
  postId: number;
  userId: number;
}
  

const ReactionComponent: React.FC<ReactionComponentProps> = ({ postId, userId }) => {
    const [reactionCount, setReactionCount] = useState<number>(0);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [reactionEmojis, setReactionEmojis] = useState<ReactionEmoji[]>([]); 
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | any>(null);



    useEffect(() => {
        const fetchState = async () => {
            console.log('fetching state');
            setIsLoading(current => !current);
            try {
                const likeCount = await getReactionCount(postId);
                const isLikedFetched = await hasUserReacted(postId, userId); 
                const allReactions = await getReactionEmojis();
                setReactionEmojis(allReactions);
                setIsLiked(isLikedFetched);
                setReactionCount(likeCount);
            } catch (error: Error | any) {
                setError(error);
            } finally {
                setIsLoading(current => !current);
            }
        };

        fetchState();
    }, [userId, postId]);

    const handleLikeClick = async (reactionEmojiId: number = -1) => {
        try {
            if(!isLiked && reactionEmojiId !== -1) {
                const updatedLikeCount = await createReaction(postId, userId, reactionEmojiId);
                setReactionCount(updatedLikeCount);
                console.log('creating Reaction ', updatedLikeCount);
            } else if (isLiked) {
                const updatedLikeCount = await deleteReaction(postId, userId);
                setReactionCount(updatedLikeCount);
                console.log('deleting Reaction ', updatedLikeCount);
            }

            setIsLiked(current => !current);
        } catch (error) {
            console.error('Error updating like count:', error);
        }
    };
    const reactionComponentContainerStyles: React.CSSProperties = {
        display: "flex",
        alignItems: 'center',
        gap: '4px'
    };

    return (
        <div style={reactionComponentContainerStyles}>
            {isLoading && <p></p>}
            {error && <p>{error.message}</p>}     
            <LikesDisplay likesCount={reactionCount} postId={postId} />       
            <PopoverButton isLiked={isLiked} onLikeClick={handleLikeClick} emojis={reactionEmojis}/>
        </div>
    );
}

export default ReactionComponent;
