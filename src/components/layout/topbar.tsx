import { ModeToggle } from "../mode-toggle";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import Breadcrumbs from "../bread-crumbs";
import { Button } from "../ui/button";
import { Bell, ChevronLeft, Dot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NotificationDialog from "../notification-dialog";
import { useState } from "react";
import useFetch from "@/hooks/use-fetch";
import { getUnreadNotifsCount } from "@/services/notif.service";
import useGlobal from "@/hooks/use-global";

interface TopbarProps {
  content?: React.ReactNode | string
  toolset?: React.ReactNode
  includeBackButton?: boolean

}

export default function Topbar(props: TopbarProps) {
  const { dispatch: globalDispatch } = useGlobal();
  const [openNotifDialog, setOpenNotifDialog] = useState(false);
  const navigate = useNavigate();
  const { data, loading } = useFetch<number>(getUnreadNotifsCount, {
    auto: true,
    onSuccess: (res) => {
      if (res.success) {
        globalDispatch({
          type: "SET_UNREAD_COUNT",
          payload: res.data || 0
        })
      }
    }
  });

  return (
    <div className="sticky top-0 z-50 bg-background">
      <div className="flex flex-col md:flex-row flex-wrap md:items-center md:justify-between px-4 py-2 border-b">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <Separator orientation="vertical" />
          {props.content}
          <Separator orientation="vertical" />
        </div>
        <div className="flex justify-between items-center gap-8">
          <Breadcrumbs />
          <div className="space-x-3">
            <Button variant="ghost" size="icon" onClick={() => setOpenNotifDialog(true)} className="relative">
              {
                loading ? null :
                  data && data > 0 ? <Dot className="size-10 absolute -top-2 -right-3 text-red-500" /> : null
              }
              <Bell />
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
      {(props.toolset || props.includeBackButton) &&
        <div id="toolset" className="flex justify-between items-center p-2">
          <div>
            {props.includeBackButton && <Button variant="secondary" onClick={() => navigate(-1)}> <ChevronLeft />Go Back</Button>}
          </div>
          <div>
            {props.toolset}
          </div>
        </div>
      }
      <NotificationDialog open={openNotifDialog} setOpen={setOpenNotifDialog} />
    </div>
  )
}
