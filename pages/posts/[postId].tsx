import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Link from "next/link";

import { Post } from "../../src/domain/post";
import { getPost } from "../../src/api/post";

const PostDetailPage: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);

  const router = useRouter();
  const postId = router.query.postId as string;

  useEffect(() => {
    if (!postId) {
      return;
    }
    getPost(postId).then(setPost);
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <article>
      <Link href="/posts">
        <a>←</a>
      </Link>

      <h1>{post.title}</h1>
      <div>{post.body}</div>
    </article>
  );
};

export default PostDetailPage;
