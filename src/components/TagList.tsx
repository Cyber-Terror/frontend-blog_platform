import { Link, useSearchParams } from "react-router";
import type { TagsProps } from "../types";

export default function TagList({ tags }: { tags: TagsProps[] }) {
  const [searchParams] = useSearchParams();
  const activeTag = searchParams.get("tag") || null;

  return (
    <ul className="flex list-none flex-wrap gap-2">
      {tags.map((tag) => {
        const isActive = tag.name === activeTag;
        return (
          <li key={tag.id}>
            <Link
              to={`/?tag=${encodeURIComponent(tag.name)}`}
              className={`inline-block rounded-full border px-3 py-1 text-sm font-medium transition ${
                isActive
                  ? "border-mauve-400 bg-mauve-900 text-mauve-50"
                  : "border-transparent bg-mauve-300 text-mauve-900 hover:bg-mauve-400"
              }`}
            >
              {tag.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
