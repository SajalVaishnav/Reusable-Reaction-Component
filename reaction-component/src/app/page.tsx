// pages/index.tsx
import React from 'react';
import Post from './components/Post';
import { getAllPosts, getReactions } from '@/prisma/db_utils';
import { PrismaClient } from '@prisma/client';

interface HomeProps {
  posts: Array<{
    id: number;
    title: string;
    content: string;
    author: string;
    createdTime: string;
  }>;
}

export default async function Home() {
  const prism = new PrismaClient();
  const posts = await getAllPosts(prism);
  const reactions = await getReactions(posts[0].id, 3, prism);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <Post
          key={post.id}
          title={post.title}
          content={post.content}
          author={post.user.username}
          createdTime={post.createdAt.toDateString()}
        />
      ))}

      {/* Display Reactions for the first post */}
      <h2>Reactions</h2>
      <ul>
        {reactions.map((reaction, index) => (
          <li key={index}>
            {reaction.user.username} {reaction.reactionEmoji.typeDetails}
          </li>
        ))}
      </ul>
    </div>
  );
};