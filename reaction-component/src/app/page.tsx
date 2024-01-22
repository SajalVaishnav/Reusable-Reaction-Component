import React from 'react';
import { getAllPosts, getReactions } from '@/prisma/db_utils';
import { PrismaClient } from '@prisma/client';

export default async function Home() {
  const prisma = new PrismaClient();
  const posts = await getAllPosts(prisma);
  const reactions = await getReactions(posts[0].id, 3, prisma);
  return (
    <div>
      <h1>Reactions</h1>
      <ul>
        {reactions.map((reaction, index) => (
            <li key={index}>{reaction.user.username}{reaction.reactionEmoji.typeDetails}</li>
        ))}
      </ul>
    </div>
  );
}
