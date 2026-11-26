import {
  Link,
  useLoaderData,
  useNavigate,
  type Params,
} from "react-router";
import { useEffect, useState } from "react";
import type { CommentInput, CommentProps, PostProps } from "../types";
import { useAuth } from "../context/AuthContext";
import apiPost from "../api/posts";
import commentsApi from "../api/comments";
import { getErrorMessage } from "../api/client";
import toast from "react-hot-toast";
import PostView from "../components/PostView";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import Spinner from "../components/Spinner";

export async function postDetailLoader({ params }: { params: Params<string> }) {
  const res = await apiPost.getPost(Number(params.id));
  return res.data.data;
}

export default function PostDetailPage() {
  const post = useLoaderData<PostProps>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [comments, setComments] = useState<CommentProps[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);
  const [deletingCommentId, setDeletingCommentId] = useState<number | null>(null);
  const [commentsTotal, setCommentsTotal] = useState(post.commentsCount ?? 0);

  const isAuthor = user?.login === post.author.login;
  const pageSize = 5;

  useEffect(() => {
    let cancelled = false;
    setComments([]);
    setCommentsLoading(true);
    setCommentsError(null);
    setCommentsTotal(post.commentsCount ?? 0);

    commentsApi
      .getComments(post.id, 0, pageSize)
      .then((res) => {
        if (cancelled) return;
        const data = res.data.data;
        setComments(data);
        setCommentsTotal((prev) => Math.max(post.commentsCount ?? 0, prev, data.length));
      })
      .catch((err) => {
        if (!cancelled) {
          setCommentsError(getErrorMessage(err, "Failed to load comments"));
        }
      })
      .finally(() => {
        if (!cancelled) setCommentsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [post.id, post.commentsCount]);

  async function onDelete() {
    if (!window.confirm("Delete this post? This cannot be undone.")) return;

    setIsDeleting(true);
    setError(null);
    try {
      await apiPost.deletePost(post.id);
      toast.success("Post deleted");
      navigate("/");
    } catch (err) {
      const message = getErrorMessage(err, "Failed to delete post");
      setError(message);
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  }

  async function handleCreateComment(input: CommentInput) {
    if (!user) return;

    const tempId = -Date.now();
    const now = new Date().toISOString();
    const optimisticComment: CommentProps = {
      id: tempId,
      postId: post.id,
      authorId: user.id,
      content: input.content,
      author: { login: user.login },
      createdAt: now,
      updatedAt: now,
    };

    setComments((prev) => [...prev, optimisticComment]);
    setCommentsTotal((prev) => prev + 1);

    try {
      const res = await commentsApi.createComment(input);
      const created = res.data.data;
      setComments((prev) =>
        prev.map((comment) => (comment.id === tempId ? created : comment)),
      );
    } catch (err) {
      setComments((prev) => prev.filter((comment) => comment.id !== tempId));
      setCommentsTotal((prev) => Math.max(0, prev - 1));
      throw err;
    }
  }

  async function handleDeleteComment(commentId: number) {
    if (!window.confirm("Delete this comment?")) return;

    const snapshot = comments;
    setDeletingCommentId(commentId);
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    setCommentsTotal((prev) => Math.max(0, prev - 1));

    try {
      await commentsApi.deleteComment(post.id, commentId);
      toast.success("Comment deleted");
    } catch (err) {
      setComments(snapshot);
      setCommentsTotal(post.commentsCount ?? snapshot.length);
      setCommentsError(getErrorMessage(err, "Failed to delete comment"));
    } finally {
      setDeletingCommentId(null);
    }
  }

  async function handleLoadMore() {
    setCommentsError(null);
    setLoadingMore(true);
    try {
      const res = await commentsApi.getComments(
        post.id,
        comments.length,
        pageSize,
      );
      const next = res.data.data;
      setComments((prev) => [...prev, ...next]);
      if (next.length < pageSize) {
        setCommentsTotal(comments.length + next.length);
      }
    } catch (err) {
      setCommentsError(getErrorMessage(err, "Failed to load more comments"));
    } finally {
      setLoadingMore(false);
    }
  }

  const hasMoreComments = comments.length < commentsTotal;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div className="flex items-center justify-between gap-3">
        <Link
          to="/"
          className="text-sm text-mauve-300 transition hover:text-mauve-50"
        >
          ← Back to posts
        </Link>
        {isAuthor && (
          <div className="flex items-center gap-3">
            <Link
              to={`/posts/${post.id}/edit`}
              className="rounded-md border border-mauve-400 px-4 py-1.5 text-sm text-mauve-200 transition hover:border-mauve-300 hover:bg-mauve-600 hover:text-mauve-50"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={onDelete}
              disabled={isDeleting}
              className="rounded-md border border-red-400 px-4 py-1.5 text-sm text-red-300 transition hover:border-red-300 hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDeleting ? "Deleting…" : "Delete"}
            </button>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-300">{error}</p>}
      <PostView post={post} />

      <section className="flex flex-col gap-4 border-t border-mauve-500 pt-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-mauve-50">Comments</h2>
          <span className="text-sm text-mauve-300">{commentsTotal} total</span>
        </div>

        <CommentForm postId={post.id} onSubmit={handleCreateComment} />

        {commentsError && <p className="text-xs text-red-300">{commentsError}</p>}

        {commentsLoading ? (
          <Spinner label="Loading comments..." />
        ) : (
          <>
            <CommentList
              comments={comments}
              postAuthorId={post.authorId}
              deletingId={deletingCommentId}
              onDelete={handleDeleteComment}
            />
            {hasMoreComments && (
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="self-start rounded-md border border-mauve-400 px-4 py-2 text-sm text-mauve-200 transition hover:border-mauve-300 hover:bg-mauve-600 hover:text-mauve-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loadingMore ? "Loading..." : "Load more"}
              </button>
            )}
          </>
        )}
      </section>
    </div>
  );
}
