import React from 'react';
import Post from './components/Post';
import { getAllPosts } from '@/prisma/db_utils';
import { PrismaClient } from '@prisma/client';

export default async function Home() {
  const prisma = new PrismaClient();
  const posts = await getAllPosts(prisma);

  return (
    <div style={{ paddingTop: '20px' }}>
      <div style={{ margin: '0 auto', maxWidth: '600px' }}>
        {posts.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            content={post.content}
            author={post.user.username}
            createdTime={post.createdAt}
          />
        ))}
      </div>
    </div>
  );
};