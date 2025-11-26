import { fetchCurrentUser } from "@/features/auth/services/auth.service"
import { redirect } from "react-router-dom";

export const rootLoader = async () => {
     try {
          const res = await fetchCurrentUser();
          if (res.success) {
               return res.data
          } else {
               return redirect("/login");
          }
     } catch (error) {
          return redirect("/login");
     }
}