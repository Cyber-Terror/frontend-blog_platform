import type { ApiResponse, PostInput, PostProps } from "../types";
import api from "./client";

const getPosts = async (authorId?: number, tag?: string) => {
  const response = await api.get("/posts", {
    params: {
      authorId,
      tag,
    },
  });
  return response;
};

const getPost = async (id: number) => {
  const response = await api.get(`/posts/${id}`);
  return response;
};

const deletePost = async (id: number) => {
  const response = await api.delete(`/posts/${id}`);
  return response;
};

const createPost = async ({ title, content, imageUrl, tags }: PostInput) => {
  const response = await api.post<ApiResponse<PostProps>>(`/posts`, {
    title,
    content,
    imageUrl,
    tags,
  });
  return response;
};

const updatePost = async ({ id,title, content, imageUrl, tags }: PostInput & {id:number}) => {
  const response = await api.patch(`/posts/${id}`, {
     title, content, imageUrl, tags ,
  });
  return response;
};

export default { getPosts, getPost, createPost, deletePost, updatePost };
