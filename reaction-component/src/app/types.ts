// db_utils.ts
import { Post, Reaction } from '@prisma/client';

export type PostWithUserAndReactionCount = Post & {
    user: { username: string, id: number};
};

export type ReactionWithUserAndReactionEmoji = Omit<Reaction, "id"> & {
    user: { username: string };
    reactionEmoji: { emojiString: string };
};

