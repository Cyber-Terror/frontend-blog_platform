import type { HeaderProps } from "../types";
import { Link } from "react-router";
import { IoIosMenu } from "react-icons/io";
import { useAuth } from "../context/AuthContext";

export default function Header({ title, onToggleSidebar }: HeaderProps) {
  const { user } = useAuth();

  return (
    <>
      <h2 className="flex justify-center text-4xl font-bold text-mauve-50">
        {title}
      </h2>

      <nav className="flex gap-6">
        {user && (
          <button
            onClick={onToggleSidebar}
            aria-label="Toggle navigation"
            className="text-mauve-200 transition hover:text-mauve-50"
          >
            <IoIosMenu size={34} />
          </button>
        )}
        {!user && (
          <>
          <Link to="/login" preventScrollReset className="text-mauve-200 transition hover:text-mauve-50 ml-7">   {"LOGIN "}</Link>
          <Link to="/register" className="text-mauve-200 transition hover:text-mauve-50">
              {"REGISTER "}
            </Link>

            <Link
              to="/"
              className="text-mauve-200 transition hover:text-mauve-50"
            >
              {"HOME "}
            </Link>
          </>
        )}
      </nav>
    </>
  );
}
