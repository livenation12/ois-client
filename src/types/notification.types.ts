import type { User } from "./user.types";

export interface Notification {
     id: string;
     title: string;
     message: string;
     sender: User
     targetName: string;
     isUnread: boolean;
     createdAt: string;
     subjectType: string;
     subjectId: string;
     additionalData?: {
          [key: string]: any;
     }
}

export const SubjectType = {
    DOCUMENT: "Document",
} as const;
