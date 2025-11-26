import type { Attachment } from "./attachment.types";
import type { OfficeMin } from "./office-types";
import type { RoutingSlip } from "./routing-slip.types";
import type { User, UserMin } from "./user.types";

export interface Document {
     id: string;
     sourceId: string;
     title: string;
     documentCode: string;
     description?: string;
     sourceName: string;
     sourceType: string;
     status?: DocumentStatus
     attachments?: DocumentAttachment[];
     createdBy: User;
     createdAt: string;
     activeLog?: DocumentAction;
}

export type DocumentStatus = "received" | "forwarded" | "pending" | "approved";
export type RoutingAction = "forwarded" | "approved" | "received" | "reverted";

export interface DocumentAction {
     id: string;
     action: RoutingAction;
     documentId: string;
     from: OfficeMin | UserMin;
     to: OfficeMin | UserMin;
     remarks: string;
     additionalRemarks: string;
     createdAt: string;
     attachedRouting?: RoutingSlip
}

export interface DocumentAttachment extends Attachment {
     documentId: string;
}

export interface DocumentRequest {
     title: string;
     description: string;
     sourceId: string;
     attachment: File | null;
};



export interface DocumentActionRequest {
     toId: string;
     remarks?: string;
     additionalRemarks?: string;
     targetType: string;
}

export const DocumentActionType = {
     FORWARD: "forward",
     APPROVE: "approve",
     RECEIVE: "receive",
     REVERT: "revert",
     ARCHIVE: "archive",
     ATTACH_ROUTING: "attach-routing"
} as const;

export interface DocumentActionDialog {
     open: string | undefined | null;
     documentId: string;
}

export interface RevertDocumentRequest {
     remarks: string;
     additionalRemarks?: string;
}