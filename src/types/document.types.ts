import type { LucideProps } from "lucide-react";
import type { Attachment } from "./attachment.types";
import type { Entity } from "./entity.types";
import type { RoutingSlip } from "./routing-slip.types";
import type { User } from "./user.types";

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

export type DocumentStatus = "completed" | "pending" | "approved" | "archived";
export type DocumentAction = "forwarded" | "approved" | "received" | "reverted";

export interface DocumentLog {
     id: string;
     action: DocumentAction;
     documentId: string;
     from: Entity;
     to: Entity;
     remarks: string;
     additionalRemarks: string;
     createdAt: string;
     attachedRouting?: RoutingSlip
     isActive: boolean;
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

export interface DocumentActionItem {
     label: string;
     icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
     action: string;
}


export interface DocumentActionGroupMenuProps {
     onActionMenuClick?: (documentId: string, menu: string) => void;
     additionalMenuItems?: DocumentActionItem[];
     disabledItems?: string[];
     disableAllMenuItems?: boolean;
     enabledItems?: string[];
     primaryActionButton?: DocumentActionItem;
     primaryActionProps?: (id: string) => {
          loading: boolean;
          loadingText: string;
     };
}
