import { PrismaClient } from '@prisma/client';
import { PostWithUserAndReactionCount, ReactionEmojiWithoutId, ReactionWithUserAndReactionEmoji, UserWithoutCredentials,  } from '@/app/types';

// load all posts with user and reaction count
export async function getAllPosts(prisma: PrismaClient): Promise<PostWithUserAndReactionCount[]> {
  try {
    const posts = await prisma.post.findMany({
      include: {
          _count: {
            select: { reactions: true },
          },
          user: {
            select: { username: true },
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
            _count: post._count,
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

// given postId and reactionCount load the 'reactionCount' most recent reactions 
export async function getReactions(postId: number, prisma: PrismaClient): Promise<ReactionWithUserAndReactionEmoji[]> {
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

// create new user with upsert
export async function createUser(username: string, prisma: PrismaClient): Promise<UserWithoutCredentials> {
    try {
        const user = await prisma.user.upsert({
        where: { username },
        update: {},
        create: { username },
        });
        // map to UserWithoutCredentials
        const { id, ...userFields } = user;
        return userFields;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error; // Re-throw to handle gracefully
    } finally {
        await prisma.$disconnect();
    }
}

// get all reactionEmojis
export async function getReactionEmojis(prisma: PrismaClient): Promise<ReactionEmojiWithoutId[]> {
    try {
        const reactionEmojis = await prisma.reactionEmoji.findMany({});
        // map to ReactionEmojiWithoutId
        const reactionEmojisWithoutId = reactionEmojis.map((reactionEmoji) => {
            const { id, ...rest } = reactionEmoji;
            return rest;
        });
        return reactionEmojisWithoutId;
    } catch (error) {
        console.error('Error fetching reactionEmojis:', error);
        throw error; // Re-throw to handle gracefully
    } finally {
        await prisma.$disconnect();
    }
}
