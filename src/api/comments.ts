import type {
  ApiResponse,
  CommentInput,
  CommentProps,
  CommentWithoutAuthor,
} from "../types";
import api from "./client";

const getComments = (postId: number, skip = 0, take = 5) =>
  api.get<ApiResponse<CommentProps[]>>(`/posts/${postId}/comments`, {
    params: { skip, take },
  });

const findComment = (postId: number, id: number) =>
  api.get<ApiResponse<CommentProps | null>>(`/posts/${postId}/comments/${id}`);

const createComment = ({ postId, content }: CommentInput) =>
  api.post<ApiResponse<CommentProps>>(`/posts/${postId}/comments`, { content });

const updateComment = ({
  postId,
  id,
  content,
}: CommentInput & { id: number }) =>
  api.patch<ApiResponse<CommentProps>>(`/posts/${postId}/comments/${id}`, {
    content,
  });

const deleteComment = (postId: number, id: number) =>
  api.delete<ApiResponse<CommentWithoutAuthor>>(
    `/posts/${postId}/comments/${id}`,
  );

export default {
  getComments,
  findComment,
  createComment,
  updateComment,
  deleteComment,
};
