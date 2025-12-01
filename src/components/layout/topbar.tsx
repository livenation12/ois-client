import { useNavContext } from "@/hooks/use-nav";
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
import useNotif from "@/hooks/use-notif";

export default function Topbar() {
  const { state } = useNavContext();
  const { dispatch: notifDispatch } = useNotif();
  const [openNotifDialog, setOpenNotifDialog] = useState(false);
  const navigate = useNavigate();
  const { data, loading } = useFetch<number>(getUnreadNotifsCount, {
    auto: true,
    onSuccess: (res) => {
      if (res.success) {
        notifDispatch({
          type: "SET_UNREAD_COUNT",
          payload: res.data || 0
        })
      }
    }
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <Separator orientation="vertical" />
          {state.content}
          <Separator orientation="vertical" />
        </div>
        <div className="flex items-center gap-8">
          {
            state.breadcrumb &&
            <Breadcrumbs />
          }
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
      {state.toolset ? (
        <div id="toolset" className="flex justify-between items-center px-4 py-2">
          <div>
            {state.toolset.isBackButtonUsed && <Button variant="secondary" onClick={() => navigate(-1)}> <ChevronLeft />Go Back</Button>}
          </div>
          {state.toolset.content}
        </div>
      ) :
        null}
      <NotificationDialog open={openNotifDialog} setOpen={setOpenNotifDialog} />
    </div>
  )
}
