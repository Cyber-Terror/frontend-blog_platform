export interface ApiResponse<T> {
  data: T;
  meta: { timestamp: string };
}

export interface ApiError {
  statusCode: number;
  message: string | string[];
  timestamp: string;
  path: string;
}

export interface TagsProps {
  id: number;
  name: string;
}

export interface CreatePostProps {
  title: string;
  content: string;
  tags: TagsProps[];
  imageUrl: string | null;
}

export interface PostProps {
  id: number;
  authorId: number;
  title: string;
  content: string;
  author: { login: string };
  tags: TagsProps[];
  createdAt: string;
  imageUrl: string | null;
  commentsCount: number;
}

export interface CommentProps {
  id: number;
  postId: number;
  authorId: number;
  content: string;
  author: { login: string };
  createdAt: string;
  updatedAt: string;
}
export type CommentWithoutAuthor = Omit<CommentProps, "author">;

export interface HeaderProps {
  title: string;
  onToggleSidebar: () => void;
}

export interface PostListProps {
  posts: PostProps[];
}

export interface RegisterProps {
  email: string;
  login: string;
  password: string;
}

export interface LoginProps {
  login: string;
  password: string;
}

export interface PostInput {
  title: string;
  content: string;
  imageUrl?: string;
  tags?: string[];
}

export interface CommentInput {
  postId: number;
  content: string;
}

export interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export interface AuthUser {
  id: number;
  login: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (credentials: LoginProps) => Promise<void>;
  logout: () => void;
}
