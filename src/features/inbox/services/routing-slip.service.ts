import api from "@/lib/api";

export const createRoutingSlip = async (payload: FormData) => {
     const res = await api.post('/routing-slips', payload);
     return res.data;
}