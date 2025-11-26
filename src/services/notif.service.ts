import api from "@/lib/api";
import type { ApiResponse } from "@/types/api-response.types";
import type { Notification } from "@/types/notification.types";

export const getUnreadNotificationsCount = async (): Promise<ApiResponse<number>> => {
     const res = await api.get('/notifications/unread-count');
     return res.data;
}

export const getAllNotifications = async (): Promise<ApiResponse<Notification[]>> => {
     const res = await api.get('/notifications');
     return res.data;
}

export const markAllNotifsAsRead = async (): Promise<ApiResponse<null>> => {
     const res = await api.post('/notifications/mark-all-as-read');
     return res.data;
}