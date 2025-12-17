import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { ChevronDown, FilePlus, Files, List, Route } from 'lucide-react'
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { NavLink } from "react-router-dom"
import useGlobal from "@/hooks/use-global"
export default function DocumentsMenu() {
  const { dispatch: dispatchGlobal } = useGlobal();

  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <Files /> Documents <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-1">
          <SidebarMenuSub>
            <SidebarMenuSubItem>
              <SidebarMenuButton asChild>
                <Button variant="outline" onClick={() => dispatchGlobal({ type: "TOGGLE_DOCUMENT_DIALOG" })}>
                  <FilePlus /> New Document
                </Button>
              </SidebarMenuButton>
            </SidebarMenuSubItem>
            <Separator className="my-0.5" />
            <SidebarMenuSubItem>
              <SidebarMenuButton asChild>
                <NavLink to="/documents" end>
                  <List /> Listing
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuButton asChild>
                <NavLink to="/documents/routings">
                  <Route /> Routings
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}
