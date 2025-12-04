import type { Entity } from "@/types/entity.types";

export const uploadsConcat = (uri?: string) => {
     const uploadBaseUrl = import.meta.env.VITE_UPLOADS_URL;
     if (!uri) return uploadBaseUrl;
     return `${uploadBaseUrl}${!uri.startsWith("/") ? `/${uri}` : uri}`;
}

export function getEntityDisplayName(entity: Entity): string {
  if (!entity) return 'Unknown';

  if ('fullName' in entity) {
    return entity.fullName!;
  }

  if ('name' in entity) {
    return entity.name!;
  }

  return 'Unknown';
}