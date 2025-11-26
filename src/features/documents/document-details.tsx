import { useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import { getDocumentActions, getDocumentFullDetails, getDocumentRoutings } from "./services/document.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { uploadsConcat } from "@/utils/utils";
import { Badge } from "@/components/ui/badge";
import { Download, File, Forward } from "lucide-react";
import DetailItem from "@/components/detail-item";
import { Item, ItemActions, ItemContent, ItemHeader, ItemTitle } from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import DocumentActionDetailsDialog from "./components/document-action-details-dialog";
import { Avatar } from "@radix-ui/react-avatar";
interface DocumentParams {
     documentId: string;
}

export const documentDetailsLoader = async ({ params }: LoaderFunctionArgs<DocumentParams>) => {
     const { documentId } = params;

     if (!documentId) {
          throw new Response("Document ID is required", { status: 400 });
     }

     return await Promise.all([
          getDocumentFullDetails(documentId)
          , getDocumentActions(documentId)
          , getDocumentRoutings(documentId)
     ]);
};

export default function DocumentDetails() {
     const [{ data }, { data: actions }] = useLoaderData<Awaited<ReturnType<typeof documentDetailsLoader>>>();
     const [openDetailsDialog, setOpenDetailsDialog] = useState({
          open: false,
          actionId: ''
     });

     const handleOpenChangeDetailsDialog = (open: boolean) => {
          setOpenDetailsDialog({ open, actionId: '' });
     }

     const handleClickView = (actionId: string) => {
          setOpenDetailsDialog({
               open: true,
               actionId
          })
     }
     return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
               <div className="grid gap-4 lg:col-span-2">
                    <Card>
                         <CardHeader>
                              <CardTitle>Document Information</CardTitle>
                         </CardHeader>
                         <CardContent className="space-y-4">
                              <DetailItem label="Title" value={data.title} />
                              <DetailItem label="Document ID" value={<>#{data.documentCode}</>} />
                              <DetailItem label="Type" value={data.sourceType} />
                              <DetailItem label="Status" value={data.status} />
                              <DetailItem label="Description" value={data.description} />
                              <DetailItem label="Created by" value={data.createdBy?.fullName} />
                              <DetailItem label="Created at" value={data.createdAt} />
                              <DetailItem label="Attachments" value={
                                   <>
                                        {
                                             data.attachments?.length === 0 ? (
                                                  <span className="text-sm text-muted-foreground">No attachments available.</span>
                                             ) :
                                                  data.attachments?.map((attachment, index) => (
                                                       <a key={index} href={uploadsConcat(attachment.filePath)} download target="__blank" className="w-full group">
                                                            <Badge variant="secondary" className="px-2 py-3 w-full flex justify-between items-center">
                                                                 <div className="inline-flex gap-1 items-center">
                                                                      <File size={16} className="shrink-0" />
                                                                      <span className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">
                                                                           {data.attachments?.[0]?.originalName}
                                                                      </span>
                                                                 </div>
                                                                 <span className="inline-flex gap-1 opacity-0 group-hover:opacity-100 transition-all group-hover:-translate-x-2.5 ease-in duration-200">
                                                                      <Download size={16} /> Download
                                                                 </span>
                                                            </Badge>
                                                       </a>
                                                  ))
                                        }
                                   </>
                              } />
                         </CardContent>
                    </Card>
                    <Card>
                         <CardHeader>
                              <CardTitle>Routing attachments</CardTitle>
                         </CardHeader>
                         <CardContent className="space-y-4">
                              {
                                   <Item>
                                        <ItemHeader>
                                             <Avatar>

                                             </Avatar>
                                        </ItemHeader>
                                   </Item>
                              }
                         </CardContent>
                    </Card>
               </div>
               <div className="grid gap-4">
                    <Card>
                         <CardHeader>
                              <CardTitle>Routing history</CardTitle>
                         </CardHeader>
                         <CardContent className="max-h-[400px] overflow-y-auto space-y-2 *:hover:border-accent">
                              {
                                   actions && actions?.length === 0 ? (
                                        <span className="text-sm text-muted-foreground">No activities available.</span>
                                   )
                                        :
                                        actions.map((item, index) =>
                                        (
                                             <Item
                                                  key={index}
                                                  className="rela hover:border-accent transition-colors duration-200"
                                             >
                                                  <ItemHeader className="flex items-center justify-between">
                                                       <Badge variant="secondary" className="flex items-center gap-1">
                                                            <Forward size={14} /> {item.action}
                                                       </Badge>
                                                       <span className="text-xs text-muted-foreground">{item.createdAt}</span>
                                                  </ItemHeader>
                                                  <ItemContent>
                                                       <ItemTitle>
                                                            {item.fromOffice.name} → {item.toOffice.name}
                                                       </ItemTitle>
                                                       {
                                                            item.attachedRouting && (
                                                                 <div>
                                                                      <h6 className="text-muted-foreground"> #{item.attachedRouting.docTin}</h6>
                                                                 </div>
                                                            )
                                                       }
                                                       {/* <SeeMoreText text={item.remarks} /> */}
                                                  </ItemContent>
                                                  <ItemActions>
                                                       <Button variant="outline" size="sm" onClick={() => handleClickView(item.id)}>
                                                            View
                                                       </Button>
                                                  </ItemActions>
                                             </Item>

                                        ))
                              }
                         </CardContent>
                    </Card>
               </div>
               <DocumentActionDetailsDialog open={openDetailsDialog.open} setOpen={handleOpenChangeDetailsDialog} documentActionId={openDetailsDialog.actionId} />
          </div>
     )
}

