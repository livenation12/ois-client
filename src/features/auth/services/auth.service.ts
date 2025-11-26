import api from "@/lib/api";
import type { ApiResponse } from "@/types/api-response.types";
import type { LoginPayload, RegisterPayload } from "../auth.type";

export interface User {
  id: number;
  username: string;
  roles: string[];
}

export async function login(payload : LoginPayload): Promise<ApiResponse<User>> {
  const res = await api.post("/auth/login", payload);
  return res.data;
}

export async function fetchCurrentUser(): Promise<ApiResponse<User>> {
  const res = await api.get("/auth/me");
  return res.data;
}

export async function logout() {
  await api.post("/auth/logout");
  window.location.href = "/login";
}

export async function register(payload : RegisterPayload): Promise<ApiResponse<void>> {
  const res = await api.post("/auth/register", payload);
  return res.data;
}