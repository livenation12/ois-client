
export const uploadsConcat = (uri?: string) => {
     const uploadBaseUrl = import.meta.env.VITE_UPLOADS_URL;
     if (!uri) return uploadBaseUrl;
     return `${uploadBaseUrl}${!uri.startsWith("/") ? `/${uri}` : uri}`;
}


