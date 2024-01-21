import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// get all posts, max limit = 10
export async function getAllPosts() {
    return await prisma.post.findMany({
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
}

// get all reactions for a post
export async function getReactionsForPost(postId: number) {
    return await prisma.reaction.findMany({
        where: {
            postId: postId,
        },
        include: {
            reactionEmoji: true,
        },
    });
}

// create new user with upsert
export async function createUser(username: string) {
    return await prisma.user.upsert({
        where: {
            username: username,
        },
        update: {},
        create: {
            username: username,
        },
    });
}