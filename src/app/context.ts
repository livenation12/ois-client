import { createContext } from "react";
import type {  NavContextType } from "./contexts/nav-context";
import type { User } from "@/types/user.types";

export const NavContext = createContext<NavContextType | null>(null);

export const AuthContext = createContext<User | null>(null);