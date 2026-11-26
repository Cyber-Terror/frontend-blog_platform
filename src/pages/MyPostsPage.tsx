import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router";
import PostList from "../components/PostList";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/AuthContext";
import postApi from "../api/posts";
import { getErrorMessage } from "../api/client";
import type { PostProps } from "../types";

export default function MyPostsPage() {
  const { user, loading } = useAuth();
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    let cancelled = false;
    setPostsLoading(true);
    setError(null);

    postApi
      .getPosts(user.id)
      .then((res) => {
        if (!cancelled) setPosts(res.data.data as PostProps[]);
      })
      .catch((err) => {
        if (!cancelled)
          setError(getErrorMessage(err, "Failed to load your posts"));
      })
      .finally(() => {
        if (!cancelled) setPostsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

  if (loading) return <Spinner label="Loading..." />;
  if (!user) return <Navigate to="/login" replace />;
  if (postsLoading) return <Spinner label="Loading your posts..." />;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-mauve-50">My posts</h1>
        <Link
          to="/posts/create"
          className="rounded-md bg-mauve-300 px-4 py-2 text-sm font-medium text-mauve-900 transition hover:bg-mauve-200"
        >
          Create post
        </Link>
      </div>

      {error && <p className="text-sm text-red-300">{error}</p>}

      {posts.length === 0 ? (
        <p className="text-mauve-300">You have not created any posts yet.</p>
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  );
}
