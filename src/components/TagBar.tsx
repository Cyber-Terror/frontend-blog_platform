import { useEffect, useState } from "react";
import { getErrorMessage } from "../api/client";
import tagsApi from "../api/tags";
import type { TagsProps } from "../types";
import Spinner from "./Spinner";
import TagList from "./TagList";

interface TagBarProps {
  className?: string;
}

export default function TagBar({ className = "" }: TagBarProps) {
  const [tags, setTags] = useState<TagsProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    tagsApi
      .getTags()
      .then((res) => {
        if (!cancelled) setTags(res.data.data);
      })
      .catch((err) => {
        if (!cancelled) setError(getErrorMessage(err, "Failed to load tags"));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <Spinner label="Loading tags..." />;
  if (error) return <p className="text-sm text-red-300">{error}</p>;
  if (tags.length === 0)
    return <p className="text-sm text-mauve-300">No tags yet.</p>;

  return (
    <div className={className}>
      <TagList tags={tags} />
    </div>
  );
}
