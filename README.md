# Blog Client (React Frontend)

Frontend client for the `blog-platform` NestJS REST API.  
Built with React + TypeScript + Vite and styled with Tailwind CSS.

## Tech Stack

- React 19 + TypeScript
- Vite
- React Router
- Axios
- Tailwind CSS v4
- react-hot-toast
- react-icons

## Implemented Features

- Authentication: register, login, current user (`/auth/register`, `/auth/login`, `/auth/me`)
- Posts: list, detail view, create, edit, delete (author only)
- Image upload for posts (`POST /upload/file`)
- Comments:
  - public comment reading
  - create for authenticated users
  - delete by comment author or post author
  - load more pagination (5 comments per request)
- Tags:
  - tag list in sidebar
  - filter posts by `?tag=...`
- `My posts` page
- UI states: loading spinners, API errors, toast notifications
- Global Axios interceptors: `401` -> clear token + redirect to `/login`, `429` -> toast notification
- `404 Not Found` page

## Requirements

- Node.js 20+ (latest LTS recommended)
- Running `blog-platform` backend

## Environment Variables

Create a `.env` file in the `fr_blog-client` root:

```env
VITE_API_URL=http://localhost:3000
```

> If your backend is deployed, set `VITE_API_URL` to your backend URL.

## Installation and Run

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Build and Preview

```bash
npm run build
npm run preview
```

## Scripts

- `npm run dev` — start development server
- `npm run build` — TypeScript build + Vite production build
- `npm run lint` — run oxlint
- `npm run preview` — preview production build locally

## Project Structure (Main)

```text
src/
  api/         # Axios client and API requests (auth/posts/comments/tags/upload)
  components/  # UI components (Layout, Spinner, CommentList, etc.)
  context/     # AuthContext
  pages/       # Route pages
  types/       # Shared TypeScript types
```

## API Notes

- Backend responses are wrapped in `{ data, meta }`.
- Comments: reading is public; create/update/delete require a Bearer token.
- Image upload uses `FormData` with the `file` field.
