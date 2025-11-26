import api from "@/lib/api";
import type { ApiResponse } from "@/types/api-response.types";
import type { User } from "@/types/user.types";

export const getAllUser = async (): Promise<ApiResponse<User[]>> => {
     const res = await api.get('/users');
     return res.data;
}