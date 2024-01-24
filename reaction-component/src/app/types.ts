// db_utils.ts
import { Post, Reaction, User, ReactionEmoji } from '@prisma/client';

export type PostWithUserAndReactionCount = Post & {
    user: { username: string };
    _count: { reactions: number };
};

export type ReactionWithUserAndReactionEmoji = Omit<Reaction, "id"> & {
    user: { username: string };
    reactionEmoji: { typeDetails: string };
};

export type UserWithoutCredentials = Omit<User, "id">;

export type ReactionEmojiWithoutId = Omit<ReactionEmoji, "id">;
