import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-start gap-4">
      <p className="text-sm uppercase tracking-wide text-mauve-300">404</p>
      <h1 className="text-3xl font-semibold text-mauve-50">Page not found</h1>
      <p className="text-mauve-300">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="rounded-md bg-mauve-300 px-4 py-2 text-sm font-medium text-mauve-900 transition hover:bg-mauve-200"
      >
        Go home
      </Link>
    </div>
  );
}
