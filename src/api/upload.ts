import type { ApiResponse } from "../types";
import api from "./client";

const  uploadFile = async(file:File)=>{
  const formData= new FormData();
  formData.append("file",file);
  const response = await api.post<ApiResponse<{url:string}>>('/upload/file', formData);
  return response;
}

export default {uploadFile};


