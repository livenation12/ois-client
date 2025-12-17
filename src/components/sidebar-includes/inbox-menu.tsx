import {
     SidebarMenuButton,
     SidebarMenuItem,
     SidebarMenuSub,
     SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { ChevronDown, Inbox } from 'lucide-react'
import { NavLink } from "react-router-dom"

export default function InboxMenu() {
     return (
          <Collapsible className="group/collapsible">
               <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                         <SidebarMenuButton>
                              <Inbox /> Inbox <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                         </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-1">
                         <SidebarMenuSub>
                              <SidebarMenuSubItem>
                                   <SidebarMenuButton asChild>
                                        <NavLink to="/inbox/personal">
                                             Personal
                                        </NavLink>
                                   </SidebarMenuButton>
                              </SidebarMenuSubItem>
                              <SidebarMenuSubItem>
                                   <SidebarMenuButton asChild>
                                        <NavLink to="/inbox/office">
                                             Office
                                        </NavLink>
                                   </SidebarMenuButton>
                              </SidebarMenuSubItem>
                         </SidebarMenuSub>
                    </CollapsibleContent>
               </SidebarMenuItem>
          </Collapsible>
     )
}
