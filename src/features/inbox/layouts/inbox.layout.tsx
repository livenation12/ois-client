import Topbar from "@/components/layout/topbar";
import {
     NavigationMenu,
     NavigationMenuLink,
     NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { NavLink, Outlet } from "react-router-dom"

export default function InboxLayout() {
     return (
          <>
               <Topbar content={<InboxTopbarContent />} />
               <div className='main-content py-2'>

                    <Outlet />
               </div>
          </>

     )
}

const inboxNavs = [
     {
          label: 'Personal',
          path: '/inbox/personal'
     },
     {
          label: 'Office',
          path: '/inbox/office'
     }
]

const InboxTopbarContent = () => {

     return (
          <NavigationMenu>
               <NavigationMenuList>
                    {inboxNavs.map((link, index) => (
                         <NavigationMenuLink asChild key={index}>
                              <NavLink to={link.path}>{link.label}</NavLink>
                         </NavigationMenuLink>
                    ))}
               </NavigationMenuList>
          </NavigationMenu>
     )
}