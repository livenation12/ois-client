import type { Office } from "./office-types";
import type { User } from "./user.types";


export type Entity = Partial<User> | Partial<Office> | null;