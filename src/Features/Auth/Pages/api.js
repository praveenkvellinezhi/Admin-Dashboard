import { API_END_POINTS, BASE_URL } from "../../../lib/constants";
import axiosInstance from "../axiosinstance";

export const getPOsts = async () => {
  const response = await axiosInstance.get(API_END_POINTS.Posts);
  return response.data;
};
export const AddData = async (data) => {
  const response = await axiosInstance.post(API_END_POINTS.Posts,data);
  return response.data;
 

 
};
 export const DeleteData = async (id) => {
   const response = await axiosInstance.delete(`/posts/${id}`)
   return response.data;
  }
  export const EditData = async (id,data) => {
   const response = await axiosInstance.put(`/posts/${id}`,data);
   return  response.data;
  }
  
