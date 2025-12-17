import { DocumentActionType, type DocumentAction } from "@/types/document.types";
import type { Entity } from "@/types/entity.types";

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

export const getAllowedActions = (action: DocumentAction): string[] => {
     // Define the allowed actions and map them to arrays of DocumentActionType values
     const allowedAction: Record<DocumentAction, string[]> = {
          "forwarded": [DocumentActionType.ARCHIVE],
          "approved": [DocumentActionType.ARCHIVE],
          "received": [DocumentActionType.REVERT, DocumentActionType.FORWARD, DocumentActionType.ATTACH_ROUTING],
          "reverted": [DocumentActionType.ARCHIVE],
          "archived": [],
          "encoded": [DocumentActionType.FORWARD, DocumentActionType.ARCHIVE]
     };

     return allowedAction[action];
};