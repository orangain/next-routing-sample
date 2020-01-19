import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";

import Link from "next/link";

import { Post } from "../../src/domain/post";
import { getPost } from "../../src/api/post";
import { prevUrl } from "../../src/util/router";

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

  const handleBack = () => {
    if (prevUrl) {
      window.history.back();
    } else {
      Router.push("/posts");
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <article>
      <a href="#" onClick={handleBack}>
        ←
      </a>

      <h1>{post.title}</h1>
      <div>{post.body}</div>
    </article>
  );
};

export default PostDetailPage;
