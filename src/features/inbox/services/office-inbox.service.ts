import api from "@/lib/api";

export const doReceiveOfficePendingDocument = async (documentId: string) => {
     const res = await api.post(`/documents/${documentId}/office-receive`,);
     return res.data;
}

export const getOfficePendingDocuments = async () => {
     const res = await api.get(`/documents/office-pendings`);
     return res.data;
}
export const getOfficeReceivedDocuments = async () => {
     const res = await api.get(`/documents/office-received`);
     return res.data;
}
