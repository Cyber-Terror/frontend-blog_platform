import { useState } from "react";
import type { CommentInput } from "../types";
import { getErrorMessage } from "../api/client";
import { useAuth } from "../context/AuthContext";

interface CommentFormProps {
  postId: number;
  onSubmit: (input: CommentInput) => Promise<void>;
}

export default function CommentForm({ postId, onSubmit }: CommentFormProps) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user) {
    return (
      <p className="text-sm text-mauve-300">
        <a href="/login" className="underline transition hover:text-mauve-50">
          Log in
        </a>
        , to make a comment.
      </p>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;

    setIsSubmitting(true);
    setError(null);
    try {
      await onSubmit({ postId, content: trimmed });
      setContent("");
    } catch (err) {
      setError(getErrorMessage(err, "Failed to post comment"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label className="flex flex-col gap-1 text-sm text-mauve-300">
        Add a comment
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="rounded-md border border-mauve-400 bg-mauve-900 p-3 text-mauve-50 outline-none transition focus:border-mauve-200"
          placeholder="Write your comment..."
        />
      </label>
      {error && <p className="text-xs text-red-300">{error}</p>}
      <div>
        <button
          type="submit"
          disabled={isSubmitting || content.trim().length === 0}
          className="rounded-md bg-mauve-300 px-4 py-2 text-sm font-medium text-mauve-900 transition hover:bg-mauve-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Posting..." : "Post comment"}
        </button>
      </div>
    </form>
  );
}
