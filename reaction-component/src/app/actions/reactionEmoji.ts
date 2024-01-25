'use server';
import { PrismaClient, ReactionEmoji } from '@prisma/client';
import { PostWithUserAndReactionCount,  ReactionWithUserAndReactionEmoji  } from '@/app/types';
import prisma from '@/lib/prisma';

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
