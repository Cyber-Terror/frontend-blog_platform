import PostList from "../components/PostList";
import Spinner from "../components/Spinner";
import postApi from "../api/posts";
import { Link, useLoaderData, useNavigation } from "react-router";
import type { PostProps } from "../types";

export async function postLoader({ request }: { request: Request }) {
  const tag = new URL(request.url).searchParams.get("tag") || null;
  const res = await postApi.getPosts(undefined, tag ?? undefined);
  return { posts: res.data.data as PostProps[], tag };
}

export default function PostsPage() {
  const { posts, tag } = useLoaderData<{
    posts: PostProps[];
    tag: string | null;
  }>();
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <Spinner label="Loading posts..." />;
  }

  if (posts.length === 0) {
    return (
      <p className="text-mauve-300">
        {tag === null ? "No posts yet." : `No posts tagged "${tag}".`}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {tag !== null && (
        <div className="flex flex-wrap items-center gap-3 text-sm text-mauve-300">
          <span>
            Filtered by tag{" "}
            <span className="font-semibold text-mauve-50">{tag}</span>
          </span>
          <Link to="/" className="underline transition hover:text-mauve-50">
            Clear filter
          </Link>
        </div>
      )}
      <PostList posts={posts} />
    </div>
  );
}
