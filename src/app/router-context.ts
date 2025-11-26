import type { User } from "@/types/user.types";
import { createContext } from "react-router";
// [NOTE!]: This is a router context not a react context it is only used by react router
// Create a context for user data
export const userContext =
  createContext<User | null>(null);




