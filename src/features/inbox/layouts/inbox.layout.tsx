import {
     NavigationMenu,
     NavigationMenuLink,
     NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { useNavContext } from "@/hooks/use-nav";
import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom"

const links = [
     {
          label: 'My Inbox',
          url: 'inbox/my-inbox'
     },
     {
          label: 'Office',
          url: 'inbox/office'
     }
];
export default function InboxLayout() {
     const { dispatch } = useNavContext();
     useEffect(() => {
          dispatch({
               type: 'SET_CONTENT', payload: (
                    <NavigationMenu>
                         <NavigationMenuList>
                              {links.map((link, index) => (
                                   <NavigationMenuLink asChild key={index}>
                                        <NavLink to={link.url}>{link.label}</NavLink>
                                   </NavigationMenuLink>
                              ))}
                         </NavigationMenuList>
                    </NavigationMenu>
               )
          });
          dispatch({
               type: "SET_TOOLSET", payload: null
          })
     }, []);
     return (
          <Outlet />
     )
}
