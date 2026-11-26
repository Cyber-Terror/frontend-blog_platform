import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PostsPage, { postLoader } from "./pages/PostsPage";
import { createBrowserRouter, RouterProvider } from "react-router";
import PostDetailPage, { postDetailLoader } from "./pages/PostDetailPage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePostPage from "./pages/CreatePostPage";
import EditPostPage from "./pages/EditPostPage";
import MyPostsPage from "./pages/MyPostsPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        Component: PostsPage,
        loader: postLoader,
        errorElement: (
          <p className="mt-1 text-sm text-red-300">Failed to load posts</p>
        ),
      },
      {
        path: "/posts/:id",
        Component: PostDetailPage,
        loader: postDetailLoader,
        errorElement: (
          <p className="mt-1 text-sm text-red-300">This post doesn't exist</p>
        ),
      },
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "/register",
        Component: RegisterPage,
      },
      {
        path: "/my-posts",
        Component: MyPostsPage,
      },
      {
        path: "*",
        Component: NotFoundPage,
      },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "/posts/create", Component: CreatePostPage },
          {
            path: "/posts/:id/edit",
            Component: EditPostPage,
            loader: postDetailLoader,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
