import { PrismaClient, Prisma } from '@prisma/client';
import { User, Post, Reaction } from '@prisma/client'; // Import types

export async function getAllPosts(prisma: PrismaClient): Promise<any[]> {
  try {
    const posts = await prisma.post.findMany({
      include: {
        reactions: {
            include: {
                reactionEmoji: true,
            },
        },
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error; // Re-throw to handle gracefully
  } finally {
    await prisma.$disconnect();
  }
}

// create new user with upsert
export async function createUser(username: string, prisma: PrismaClient): Promise<User> {
    try {
        const user = await prisma.user.upsert({
        where: { username },
        update: {},
        create: { username },
        });
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error; // Re-throw to handle gracefully
    } finally {
        await prisma.$disconnect();
    }
}