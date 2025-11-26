import api from "@/lib/api";
import type { ApiResponse } from "@/types/api-response.types";
import type { Document, DocumentAction, DocumentActionRequest, DocumentStatus } from "@/types/document.types";
import type { RoutingSlip } from "@/types/routing-slip.types";

export const getDocuments = async () => {
     const res = await api.get('/documents');
     return res.data;
}

export const getDocumentsByStatus = async (status: DocumentStatus) => {
     const res = await api.get(`/documents?status=${status}`);
     return res.data;
}

export const createDocument = async (payload: FormData) => {
     const res = await api.post('/documents', payload);
     return res.data;
}

export const forwardDocument = async (documentId: string, payload: DocumentActionRequest) => {
     const res = await api.post(`/documents/${documentId}/forward`, payload);
     return res.data;
}

export const getDocumentFullDetails = async (documentId: string): Promise<ApiResponse<Document>> => {
     const res = await api.get(`/documents/${documentId}/full-details`);
     return res.data;
}

export const getDocumentActions = async (documentId: string): Promise<ApiResponse<DocumentAction[]>> => {
     const res = await api.get(`/documents/${documentId}/actions`);
     return res.data;
}

export const getDocumentRoutings = async (documentId: string): Promise<ApiResponse<RoutingSlip[]>> => {
     const response = await api.get(`/documents/${documentId}/routing-slips`);
     return response.data;
}

export const getDocumentActionFullDetails = async (actionId: string): Promise<ApiResponse<DocumentAction>> => {
     const response = await api.get(`/documents/actions/${actionId}`);
     return response.data;
}

export const getOfficeForwardedDocuments = async (): Promise<ApiResponse<Document[]>> => {
     const res = await api.get('/documents/office-forwarded');
     return res.data;
}

export const getEncodedDocuments = async (): Promise<ApiResponse<Document[]>> => {
     const res = await api.get('/documents/encoded');
     return res.data;
}

export const getForwardedDocuments = async (): Promise<ApiResponse<Document[]>> => {
     const res = await api.get('/documents/forwarded');
     return res.data;
}

export const getCreatedDocuments = async (): Promise<ApiResponse<Document[]>> => {
     const res = await api.get('/documents/principal');
     return res.data;
}

export const getDocumentDetails = async (documentId: string): Promise<ApiResponse<Document>> => {
     const res = await api.get(`/documents/${documentId}`);
     return res.data;
}