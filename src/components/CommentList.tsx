import type { CommentProps } from "../types";
import { useAuth } from "../context/AuthContext";

interface CommentListProps {
  comments: CommentProps[];
  postAuthorId: number;
  deletingId: number | null;
  onDelete: (commentId: number) => void;
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("ru-RU", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function CommentList({
  comments,
  postAuthorId,
  deletingId,
  onDelete,
}: CommentListProps) {
  const { user } = useAuth();

  if (comments.length === 0) {
    return <p className="text-sm text-mauve-300">No comments yet.</p>;
  }

  return (
    <ul className="flex flex-col gap-4">
      {comments.map((comment) => {
        const canDelete =
          user?.id === comment.authorId || user?.id === postAuthorId;

        return (
          <li
            key={comment.id}
            className="rounded-lg border border-mauve-400 bg-mauve-700 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-mauve-50">
                  {comment.author.login}
                </p>
                <time
                  dateTime={comment.createdAt}
                  className="text-xs text-mauve-300"
                >
                  {formatDateTime(comment.createdAt)}
                </time>
              </div>
              {canDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(comment.id)}
                  disabled={deletingId === comment.id}
                  className="rounded-md border border-red-400 px-3 py-1 text-xs text-red-300 transition hover:border-red-300 hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {deletingId === comment.id ? "Deleting..." : "Delete"}
                </button>
              )}
            </div>
            <p className="mt-3 whitespace-pre-line text-sm text-mauve-100">
              {comment.content}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
