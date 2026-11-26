import type { ApiResponse, TagsProps } from "../types";
import api from "./client";

const getTags = () => api.get<ApiResponse<TagsProps[]>>("/tags");

export default { getTags };
