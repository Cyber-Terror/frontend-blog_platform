import { Link } from "react-router";
import type { PostListProps } from "../types/index";
import PostCard from "./PostCard";

export default function PostList({ posts }: PostListProps) {
  return (
    <ul className="flex flex-col gap-6">
      {posts.map((post) => (
        <li key={post.id} className="flex flex-col">
          <Link to={`/posts/${post.id}`} className="block">
            <PostCard post={post} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
