'use server';
import { PostWithUserAndReactionCount } from '@/app/types';
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