import React from 'react';
import { getAllPosts } from '@/prisma/db_utils';
import { PrismaClient } from '@prisma/client';

export default async function Home() {
  const prisma = new PrismaClient();
  const posts = await getAllPosts(prisma);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}+{post.content}+{post.reactions[0].reactionEmoji.typeDetails}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}
