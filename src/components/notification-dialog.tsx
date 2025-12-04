import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogHeader,
     DialogTitle,
} from "@/components/ui/dialog"
import useFetch from "@/hooks/use-fetch"
import { getAllNotifications, markAllNotifsAsRead } from "@/services/notif.service";
import type { DialogProps } from "@/types/common-types"
import { useEffect } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Dot } from "lucide-react";
import NotifSkeleton from "./skeletons/notif-list-skeleton";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import { SubjectType } from "@/types/notification.types";
import { Button } from "./ui/button";
import useNotif from "@/hooks/use-global";

export default function NotificationDialog(props: DialogProps) {
     const { state: notifState, dispatch: notifDispatch } = useNotif();
     const { execute, data, loading } = useFetch(getAllNotifications);
     const { execute: markAllAsRead } = useFetch(markAllNotifsAsRead, {
          onSuccess: () => {
               execute();
               notifDispatch({ type: 'MARK_ALL_AS_READ' })
          }
     });

     //only fetch when dialog is opened
     useEffect(() => {
          if (props.open) {
               execute();
          }
     }, [props.open]);

     return (
          <Dialog open={props.open} onOpenChange={props.setOpen}>
               <DialogContent>
                    <DialogHeader>
                         <DialogTitle>Notifications</DialogTitle>
                         <DialogDescription className="flex justify-between">
                              Your recent notifications
                              <Button disabled={notifState.unreadCount === 0} variant='ghost' size='sm' onClick={() => markAllAsRead()}>Mark all as read</Button>
                         </DialogDescription>
                    </DialogHeader>
                    <div className="h-[55vh] overflow-y-auto space-y-2">
                         {
                              loading ? <NotifSkeleton /> :
                                   data && data.length > 0 ? data.map((notif) => (
                                        <Link to={notif.additionalData?.subject === SubjectType.DOCUMENT ? `/documents/${notif.additionalData?.subjectId}` : '#'}
                                             key={notif.id}
                                             onClick={() => props.setOpen(false)}
                                             className="block p-3 bg-secondary/10 rounded-md hover:bg-secondary/20 transition-colors">
                                             <div className="float-end">
                                                  <p className="text-xs text-muted-foreground">{notif.createdAt}</p>
                                             </div>
                                             <section className="flex md:flex-row flex-col justify-between items-center gap-2">
                                                  <div className="flex items-center gap-3">
                                                       <Avatar>
                                                            <AvatarFallback>{notif.sender?.fullName?.charAt(0).toUpperCase()}</AvatarFallback>
                                                       </Avatar>
                                                       <div className="w-full">
                                                            <h5 className="text-sm">{notif.title}</h5>
                                                            <p className="text-xs text-muted-foreground">{notif.message}</p>
                                                       </div>
                                                  </div>
                                                  <div className="flex justify-end items-center gap-2">
                                                       {notif.isUnread ? <Badge variant="secondary">Unread</Badge> : null}
                                                       <Dot size={32} />
                                                  </div>
                                             </section>
                                        </Link>
                                   )) : (
                                        <p className="text-sm text-muted-foreground">No notifications available.</p>
                                   )
                         }
                    </div>
                    <div className="flex justify-end items-center text-xs text-muted-foreground">{notifState.unreadCount ? `Unread ${notifState.unreadCount}` : `No unread notifications`}</div>
               </DialogContent>
          </Dialog >
     )
}
