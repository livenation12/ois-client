import api from "@/lib/api";
import type { ApiResponse } from "@/types/api-response.types";
import type { Office, OfficeForm } from "@/types/office-types";

export const createOffice = async (payload: OfficeForm): Promise<ApiResponse<void>> => {
     const res = await api.post('/offices', payload);
     return res.data;
}

export const getAllOffices = async (): Promise<ApiResponse<Office[]>> => {
     const res = await api.get('/offices');
     return res.data;
}


export const getAllOfficesExceptPrincipalOffice = async (): Promise<ApiResponse<Office[]>> => {
     const res = await api.get('/offices/except-principal-office');
     return res.data;
}