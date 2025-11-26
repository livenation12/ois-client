import type { Office } from "./office-types";

export type User = {
     id: string;
     username: string;
     roles: string[];
     office: Office;
     fullName: string;
};

export type UserMin = {
     id: string;
     name: string;
}