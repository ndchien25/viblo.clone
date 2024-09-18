import React from "react";
import { Post } from "@/models/Post"; // Assuming you have a Post type defined
import { PostFeedItem } from "./PostFeedItem";

interface PostListProps {
  posts: Post[];
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div>
      {posts.length > 0 ? (
        <>
          {posts.map((post) => (
            <PostFeedItem post={post} />
          ))}
        </>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};
