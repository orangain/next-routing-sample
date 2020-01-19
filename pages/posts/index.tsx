import { useEffect, useState } from "react";
import Link from "next/link";

import { Post } from "../../src/domain/post";
import { getPosts } from "../../src/api/post";

const PostListPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <Link href="/posts/[postId]" as={`/posts/${post.id}`}>
            <a>
              {post.id}: {post.title}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PostListPage;
