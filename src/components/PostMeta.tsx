import type { PostProps } from "../types";

export default function PostMeta({author,createdAt}:Pick<PostProps, "author" | "createdAt">){
  return(
  <div className="flex items-center gap-2 text-sm text-mauve-300">
    <span>{author.login}</span>
    <span>·</span>
    <time  dateTime={new Date(createdAt).toLocaleDateString("ru-RU")}>{new Date(createdAt).toLocaleDateString("ru-RU")}</time>
  </div>
)
}