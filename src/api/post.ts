import { Post } from "../domain/post";

export const getPosts = async (): Promise<Post[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return await res.json();
};

export const getPost = async (postId: string): Promise<Post> => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  return await res.json();
};
