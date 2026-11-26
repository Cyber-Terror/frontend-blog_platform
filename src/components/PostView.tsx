import { getImageUrl } from "../api/client";
import type { PostProps } from "../types";
import PostMeta from "./PostMeta";
import TagList from "./TagList";

export default function PostView({ post }: { post: PostProps }) {
  return (
    <article className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight text-mauve-50">
        {post.title}
      </h1>
      <PostMeta author={post.author} createdAt={post.createdAt} />
      <TagList tags={post.tags} />
      <div className="leading-relaxed whitespace-pre-line">{post.content}</div>
      {post.imageUrl && (
        <img
          src={getImageUrl(post.imageUrl)}
          alt={post.title}
          className="w-full aspect-video rounded object-cover sm:w-48 sm:shrink-0"
        />
      )}
    </article>
  );
}
