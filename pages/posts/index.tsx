import { useEffect, useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import Router, { useRouter } from "next/router";

import { Post } from "../../src/domain/post";
import { getPosts } from "../../src/api/post";

const PostListPage: NextPage = () => {
  const router = useRouter();
  const [q, setQ] = useState((router.query.q as string) || "");
  const [posts, setPosts] = useState<Post[]>([]);
  const [activePostId, setActivePostId] = useState<number>(-1);

  console.log(router.query);
  console.log(activePostId);

  // 初回ロード時に、フラグメントをactivePostIdに設定する
  useEffect(() => {
    const id = window.location.hash.substr(1);
    if (!id) {
      return;
    }
    setActivePostId(parseInt(id));
  }, []);

  // クエリパラメータが変わった時にpostsを取得する
  useEffect(() => {
    const q = router.query.q as string;
    getPosts(q).then(setPosts);
  }, [router.query]);

  // postsが変わった時に active な要素にスクロールする
  useEffect(() => {
    window.document
      .querySelector("li.active")
      ?.scrollIntoView({ block: "center" });
  }, [posts]);

  const handleSubmit = () => {
    setActivePostId(-1); // activePostIdをリセットする
    Router.push(`/posts?q=${q}`);
  };

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="search"
          name="q"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {posts.map(post => (
          <li
            key={post.id}
            className={post.id === activePostId ? "active" : ""}
          >
            <span
              onClick={() => {
                const route = {
                  pathname: router.pathname,
                  query: router.query,
                  hash: String(post.id)
                };
                Router.replace(route);
                setActivePostId(post.id);
              }}
            >
              {post.id}: {post.title}
            </span>
            {post.id === activePostId && (
              <Link href="/posts/[postId]" as={`/posts/${post.id}`}>
                <a>詳細</a>
              </Link>
            )}
          </li>
        ))}
      </ul>
      <style jsx>{`
        li.active {
          background-color: #eee;
        }
      `}</style>
    </>
  );
};

// Automatic Static Optimizationが有効な場合、初回にrouter.queryが取得できず、
// getPostsを2度実行することになってしまい、動作がおかしくなるので無効にする。
PostListPage.getInitialProps = async () => {
  return {};
};

export default PostListPage;
