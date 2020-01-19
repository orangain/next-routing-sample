import { Post } from "../domain/post";

export const getPosts = async (q?: string): Promise<Post[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = (await res.json()) as Post[];
  if (q) {
    return posts.filter(p => p.title.includes(q));
  }
  return posts;
};

export const getPost = async (postId: string): Promise<Post> => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  return await res.json();
};
