import React from 'react';
import Post from './components/Post';
import { getAllPosts } from './actions/post';
import ReactionModal from './components/ReactionModal';
import PopoverButton from './components/reaction/LikeButton';

export default async function Home() {
  const posts = await getAllPosts();

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
            postId={post.id}
            userId={post.user.id}
          />
        ))}
      </div>
    </div>
  );
  // return (
  //   <ReactionModal postId={6} />
  // );
};