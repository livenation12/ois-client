import { NavContext } from "@/app/contexts/nav-context";
import { useContext } from "react";

export const useNavContext = () => {
     const navContext = useContext(NavContext);
     if(!navContext) {
          throw new Error("useNavContext must be used within a NavProvider.");
     }
     return navContext;
}