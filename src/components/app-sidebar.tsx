import { Calendar, ChartNoAxesGantt, ChevronDown, Home, Inbox, LogOut, Settings, User } from "lucide-react"
import {
     Sidebar,
     SidebarContent,
     SidebarFooter,
     SidebarGroup,
     SidebarGroupContent,
     SidebarGroupLabel,
     SidebarHeader,
     SidebarMenu,
     SidebarMenuButton,
     SidebarMenuItem,
     useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import Icon from "@/assets/dasmo-icon.jpg"
import { NavLink } from "react-router-dom"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { logout } from "@/features/auth/services/auth.service"
import { useAuth } from "@/hooks/use-auth"
import useGlobal from "@/hooks/use-global"
import DocumentsMenu from "./sidebar-includes/documents-menu"
import InboxMenu from "./sidebar-includes/inbox-menu"


const items = [
     {
          title: "Home",
          url: "",
          icon: Home,
     },
     {
          title: "Calendar",
          url: "calendar",
          icon: Calendar,
     },
     {
          title: "Manage",
          url: "manage",
          icon: ChartNoAxesGantt,
          accessRole: ["SUPER_ADMIN"],
     },
     {
          title: "Settings",
          url: "settings",
          icon: Settings,
     },
]
export function AppSidebar() {
     const { open } = useSidebar();
     const user = useAuth();
     const { dispatch: dispatchGlobal } = useGlobal();

     const filteredRoutes = items.filter(item => {
          if (item.accessRole) {
               return item.accessRole.some(role => user.roles.includes(role));
          }
          return true;
     });

     return (
          <Sidebar collapsible="icon">
               <SidebarHeader>
                    <div className="flex items-center gap-2">
                         <img src={Icon} alt="App icon" className={`${open ? "size-10" : "size-8"} transition-all ease-in duration-300 rounded-lg object-cover`} />
                         <div className="flex flex-col gap-2">
                              {open ? (
                                   <>
                                        <p className="text-sm font-medium leading-none">Integrated Systems</p>
                                        <p className="text-xs leading-none text-muted-foreground">{user.office.department}</p>
                                   </>
                              ) : null}
                         </div>
                    </div>
               </SidebarHeader>
               <SidebarContent>
                    <SidebarGroup>
                         <SidebarGroupLabel>Menu</SidebarGroupLabel>
                         <SidebarGroupContent>
                              <SidebarMenu>
                                   {filteredRoutes.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                             <SidebarMenuButton asChild>
                                                  <NavLink to={item.url}>
                                                       <item.icon />
                                                       <span>{item.title}</span>
                                                  </NavLink>
                                             </SidebarMenuButton>
                                        </SidebarMenuItem>
                                   ))}
                                   <InboxMenu />
                                   <DocumentsMenu />
                              </SidebarMenu>
                         </SidebarGroupContent>
                    </SidebarGroup>
               </SidebarContent>
               <SidebarFooter className="mb-2">
                    <DropdownMenu>
                         <DropdownMenuTrigger asChild>
                              <div className="flex items-center gap-2">
                                   <Avatar>
                                        <AvatarImage />
                                        <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                                   </Avatar>
                                   <div className="flex flex-col gap-2">
                                        <p className="text-sm font-medium leading-none capitalize">{user.username}</p>
                                        <p className="text-xs leading-none text-muted-foreground flex gap-1">
                                             <span>{user.office.department}</span> - <span>{user.office.name}</span>
                                        </p>
                                   </div>
                              </div>
                         </DropdownMenuTrigger>
                         <DropdownMenuContent className="w-[var(--sidebar-width)]">
                              <DropdownMenuItem><User /> Profile</DropdownMenuItem>
                              <DropdownMenuItem><Settings /> Settings</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => logout()}><LogOut /> Logout</DropdownMenuItem>
                         </DropdownMenuContent>
                    </DropdownMenu>
               </SidebarFooter>
          </Sidebar>
     )
}
