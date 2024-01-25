'use server';
import { PrismaClient, ReactionEmoji } from '@prisma/client';
import { PostWithUserAndReactionCount, ReactionEmojiWithoutId, ReactionWithUserAndReactionEmoji, UserWithoutCredentials,  } from '@/app/types';

// load all posts with user and reaction count
export async function getAllPosts(): Promise<PostWithUserAndReactionCount[]> {
  const prisma = new PrismaClient();
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
  } finally {
    await prisma.$disconnect();
  }
}

// given postId load reactions 
export async function getReactions(postId: number): Promise<ReactionWithUserAndReactionEmoji[]> {
    const prisma = new PrismaClient();
    try {
        const reactions = await prisma.reaction.findMany({
            where: { postId },
            include: {
                user: {
                    select: { username: true },
                },
                reactionEmoji: {
                    select: { typeDetails: true },
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
    } finally {
        await prisma.$disconnect();
    }
}

// given postId get num of reactions on the post
export async function getReactionCount(postId: number): Promise<number> {
    const prisma = new PrismaClient();
    try {
        const reactionCount = await prisma.reaction.count({
            where: { postId },
        });
        return reactionCount;
    } catch (error) {
        console.error('Error fetching reaction count:', error);
        throw error; 
    } finally {
        await prisma.$disconnect();
    }
}

// given postId and userId create a reaction, return total reaction count for the post
export async function createReaction(postId: number, uId: number, reactionEmojiId: number): Promise<number> {
    const prisma = new PrismaClient();
    try {
        const reaction = await prisma.reaction.create({
          data: {
              postId,
              uId,
              reactionEmojiId,
          }
        });
        const reactionCount = await getReactionCount(postId);
        return reactionCount;
    } catch (error) {
      console.error('Error fetching reaction count:', error);
      throw error; 
    } finally {
        await prisma.$disconnect();
    }
}

// delete reaction given postId and userId, return total reaction count for the post
export async function deleteReaction(postId: number, uId: number): Promise<number> {
    const prisma = new PrismaClient();
    try {
            const reaction = await prisma.reaction.delete({
                where: {
                    uId_postId: {
                        uId,
                        postId
                    }
                }
            });
            const reactionCount = await getReactionCount(postId);
            return reactionCount;
    } catch (error) {
        console.error('Error fetching reaction count:', error);
        throw error; 
    } finally {
            await prisma.$disconnect();
    }
}

// given uId and postId, check if user has reacted to a post
export async function hasUserReacted(postId: number, uId: number): Promise<boolean> {
    const prisma = new PrismaClient();
    try {
        const reaction = await prisma.reaction.findFirst({
            where: {
                postId,
                uId
            }
        });
        return reaction !== null;
    } catch (error) {
        console.error('Error checking user reaction:', error);
        throw error; 
    } finally {
        await prisma.$disconnect();
    }
}

// get all reactionEmojis
export async function getReactionEmojis(): Promise<ReactionEmoji[]> {
    const prisma = new PrismaClient();
    try {
        const reactionEmojis = await prisma.reactionEmoji.findMany({});
        return reactionEmojis;
    } catch (error) {
        console.error('Error fetching reactionEmojis:', error);
        throw error; // Re-throw to handle gracefully
    } finally {
        await prisma.$disconnect();
    }
}
