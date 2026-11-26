import { useState } from "react";
import { NavLink } from "react-router";
import type { SidebarProps } from "../types";
import { useAuth } from "../context/AuthContext";
import TagBar from "./TagBar";

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const [tagsOpen, setTagsOpen] = useState(false);

  return (
    <>
      {open && (
        <div onClick={onClose} className="fixed inset-0 z-30 bg-black/50" />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-60 transform
          bg-mauve-800 p-4 text-mauve-100 transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <p className="px-2 pb-4 text-sm uppercase tracking-wide text-mauve-300">
          Navigation
        </p>
        <nav className="flex flex-col gap-2">
          <NavLink to="/" className={"hover:bg-gray-800"} end onClick={onClose}>
            View posts
          </NavLink>
          <NavLink to="/my-posts" className={"hover:bg-gray-800"} onClick={onClose}>
            My posts
          </NavLink>
          <NavLink
            to="/posts/create"
            className={"hover:bg-gray-800"}
            onClick={onClose}
          >
            Create Post
          </NavLink>

          <div className="mt-2 flex flex-col gap-2 border-t border-mauve-500 pt-4">
            <button
              type="button"
              onClick={() => setTagsOpen((prev) => !prev)}
              className="flex items-center justify-between text-left hover:bg-gray-800"
            >
              <span>Tags</span>
              <span className="text-xs text-mauve-300">
                {tagsOpen ? "Hide" : "Show"}
              </span>
            </button>
            {tagsOpen && (
              <div className="max-h-56 overflow-y-auto pr-1" onClick={onClose}>
                <TagBar />
              </div>
            )}
          </div>

          <div className="mt-auto flex flex-col gap-2 border-t border-mauve-500 pt-4">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className={"text-left hover:bg-gray-800"}
              >
                Logout
              </button>
            ) : (
              <NavLink to="/login" className={"hover:bg-gray-800"} onClick={onClose}>
                Login
              </NavLink>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
}
