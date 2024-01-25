'use server';
import { PrismaClient, ReactionEmoji } from '@prisma/client';
import { PostWithUserAndReactionCount,  ReactionWithUserAndReactionEmoji  } from '@/app/types';
import prisma from '@/lib/prisma';

// load all posts with user and reaction count
export async function getAllPosts(): Promise<PostWithUserAndReactionCount[]> {
    try {
    const posts = await prisma.post.findMany({
      include: {
          user: {
            select: { username: true, id: true},
          },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });

    // map to PostWithUserAndReactionCount
    const postsWithUserAndReactionCount = posts.map((post) => {
        return {
            ...post,
            user: post.user,
        };
    });
    return postsWithUserAndReactionCount;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error; // Re-throw to handle gracefully
  } 
}

// given postId load reactions 
export async function getReactions(postId: number): Promise<ReactionWithUserAndReactionEmoji[]> {
    try {
        const reactions = await prisma.reaction.findMany({
            where: { postId },
            include: {
                user: {
                    select: { username: true },
                },
                reactionEmoji: {
                    select: { emojiString: true },
                },
            },
            orderBy: {
              createdAt: 'desc',
            }
        });
        // map to ReactionWithUserAndReactionEmoji
        const reactionsWithUserAndReactionEmoji = reactions.map((reaction) => ({
          ...reaction,
          user: reaction.user,
          reactionEmoji: reaction.reactionEmoji,
        }));
        
        return reactionsWithUserAndReactionEmoji;
    } catch (error) {
        console.error('Error fetching reactions:', error);
        throw error; // Re-throw to handle gracefully
    } 
}

// given postId get num of reactions on the post
export async function getReactionCount(postId: number): Promise<number> {
    try {
        const reactionCount = await prisma.reaction.count({
            where: { postId },
        });
        return reactionCount;
    } catch (error) {
        console.error('Error fetching reaction count:', error);
        throw error; 
    } 
}

// given postId and userId create a reaction, return total reaction count for the post
export async function createReaction(postId: number, userId: number, reactionEmojiId: number): Promise<number> {
    try {
        const reaction = await prisma.reaction.create({
          data: {
              postId,
              userId,
              reactionEmojiId,
          }
        });
        const reactionCount = await getReactionCount(postId);
        return reactionCount;
    } catch (error) {
      console.error('Error fetching reaction count:', error);
      throw error; 
    } 
}

// delete reaction given postId and userId, return total reaction count for the post
export async function deleteReaction(postId: number, userId: number): Promise<number> {
    try {
            const reaction = await prisma.reaction.delete({
                where: {
                    userId_postId: {
                        userId,
                        postId
                    }
                }
            });
            const reactionCount = await getReactionCount(postId);
            return reactionCount;
    } catch (error) {
        console.error('Error fetching reaction count:', error);
        throw error; 
    } 
}

// given userId and postId, check if user has reacted to a post
export async function hasUserReacted(postId: number, userId: number): Promise<boolean> {
    try {
        const reaction = await prisma.reaction.findFirst({
            where: {
                postId,
                userId
            }
        });
        return reaction !== null;
    } catch (error) {
        console.error('Error checking user reaction:', error);
        throw error; 
    } 
}

// get all reactionEmojis
export async function getReactionEmojis(): Promise<ReactionEmoji[]> {
    try {
        const reactionEmojis = await prisma.reactionEmoji.findMany({});
        return reactionEmojis;
    } catch (error) {
        console.error('Error fetching reactionEmojis:', error);
        throw error; // Re-throw to handle gracefully
    } 
}
