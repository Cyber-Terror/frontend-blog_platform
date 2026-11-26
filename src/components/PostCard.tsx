import type { PostProps } from "../types/index";
import PostMeta from "./PostMeta";
import TagList from "./TagList";
import { getImageUrl } from "../api/client";

export default function PostCard({ post }: { post: PostProps }) {
  return (
    <article className="flex flex-col gap-4 rounded-lg border border-mauve-400 bg-mauve-700 p-4 transition hover:border-mauve-300 hover:bg-mauve-600 sm:flex-row">
      {post.imageUrl && (
        <img
          src={getImageUrl(post.imageUrl)}
          alt={post.title}
          className="w-full aspect-video rounded object-cover sm:w-48 sm:shrink-0"
        />
      )}
      <div className="flex min-w-0 flex-col gap-2">
        <h3 className="text-xl font-semibold text-mauve-50">{post.title}</h3>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <PostMeta author={post.author} createdAt={post.createdAt} />
          <span className="text-sm text-mauve-300">
            {post.commentsCount} comment{post.commentsCount === 1 ? "" : "s"}
          </span>
        </div>
        <TagList tags={post.tags} />
        <p className="line-clamp-3">{post.content}</p>
      </div>
    </article>
  );
}
