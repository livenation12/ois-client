import api from "@/lib/api";

export const doReceivePendingDocument = async (documentId: string) => {
     const res = await api.post(`/documents/${documentId}/receive`,);
     return res.data;
}

export const getUserPendingDocuments = async () => {
     const res = await api.get(`/documents/user/pendings`);
     return res.data;
}

export const getUserReceivedDocuments = async () => {
     const res = await api.get(`/documents/user/received`);
     return res.data;
}
export const getUserForwardedDocuments = async () => {
     const res = await api.get(`/documents/user/forwarded`);
     return res.data;
}
