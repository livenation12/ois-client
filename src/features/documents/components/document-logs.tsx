import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item, ItemContent, ItemHeader, ItemTitle } from "@/components/ui/item";
import type { DocumentAction } from "@/types/document.types";
import { Forward } from "lucide-react";
import { useState } from "react";
import DocumentLogDetailsDialog from "./document-log-details-dialog";
import useFetch from "@/hooks/use-fetch";
import { getDocumentLogs } from "../services/document.service";
import ItemSkeleton from "@/components/skeletons/item-skeleton";
import { getEntityDisplayName } from "@/utils/document-utils";

export default function DocumentLogs({ documentId }: { documentId: string }) {
     const { data: logs, loading } = useFetch(getDocumentLogs, {
          auto: true,
          params: [documentId]
     })
     const [openLogDialog, setOpenLogDialog] = useState({
          open: false,
          actionId: ''
     });
     const handleClickView = (actionId: string, action: DocumentAction) => {
          //only view non received logs
          if (action.toLowerCase() === 'received') {
               return;
          }
          setOpenLogDialog({
               open: true,
               actionId
          })
     }

     const handleOpenChangeDetailsDialog = (open: boolean) => {
          setOpenLogDialog({ open, actionId: '' });
     }

     return (
          <>
               <Card>
                    <CardHeader>
                         <CardTitle>Logs</CardTitle>
                    </CardHeader>
                    <CardContent className="max-h-[400px] overflow-y-auto space-y-2 *:hover:border-accent">
                         {
                              loading ? <ItemSkeleton length={5} />
                                   :
                                   (logs && logs?.length === 0) ? (
                                        <span className="text-sm text-muted-foreground">No logs found.</span>
                                   )
                                        :
                                        logs?.map((item, index) =>
                                        (
                                             <Item
                                                  onClick={() => handleClickView(item.id, item.action)}
                                                  key={index}
                                                  className="rela hover:border-accent transition-colors duration-200 group"
                                             >
                                                  <ItemHeader className="flex items-center justify-between">
                                                       <div className="inline-flex gap-2">
                                                            <Badge variant="secondary" className="flex items-center gap-1">
                                                                 <Forward size={14} /> {item.action}
                                                            </Badge>
                                                            {item.isActive &&
                                                                 <Badge className="bg-green-500 flex items-center gap-1">
                                                                      Active
                                                                 </Badge>
                                                            }
                                                       </div>
                                                       <span className="text-xs text-muted-foreground">{item.createdAt}</span>
                                                  </ItemHeader>
                                                  <ItemContent>
                                                       <ItemTitle className="text-nowrap">
                                                            {item.action.toLowerCase() !== 'received' && <>{getEntityDisplayName(item.from)} <span className="text-muted-foreground">to</span></>}  {getEntityDisplayName(item.to)}
                                                            {item.action.toLowerCase() === 'received' && <><span className="text-muted-foreground">from</span> {getEntityDisplayName(item.from)}</>}
                                                       </ItemTitle>
                                                       {
                                                            item.attachedRouting && (
                                                                 <div>
                                                                      <h6 className="text-muted-foreground"> #{item.attachedRouting.docTin}</h6>
                                                                 </div>
                                                            )
                                                       }
                                                       {item.action.toLowerCase() !== 'received' && <p className="opacity-0 group-hover:opacity-100 transition-all ease duration-200 text-xs text-end text-muted-foreground">View more</p>}
                                                  </ItemContent>
                                             </Item>
                                        ))
                         }
                    </CardContent>
               </Card>
               <DocumentLogDetailsDialog open={openLogDialog.open} setOpen={handleOpenChangeDetailsDialog} documentActionId={openLogDialog.actionId} />
          </>
     )
}
