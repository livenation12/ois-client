import type { User } from "@/types/user.types";
import { createContext } from "react";
import { useLoaderData } from "react-router-dom";

export const AuthContext = createContext<User | null>(null);

interface AuthProviderProps {
     children: React.ReactNode
}

export default function AuthProvider(props: AuthProviderProps) {
     const data = useLoaderData();
     return (
          <AuthContext value={data}>
               {props.children}
          </AuthContext>
     )
}
