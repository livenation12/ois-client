import { useLoaderData, useParams, type LoaderFunctionArgs } from "react-router-dom";
import { getDocumentFullDetails } from "./services/document.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { uploadsConcat } from "@/utils/utils";
import { Badge } from "@/components/ui/badge";
import { Download, File } from "lucide-react";
import DetailItem from "@/components/detail-item";
import DocumentLogs from "./components/document-logs";
import DocumentRoutings from "./components/document-routings";
import DocumentActionButtons from "./components/document-group-buttons";
import NoDocumentFound from "@/features/documents/components/no-document-found";
import Topbar from "@/components/layout/topbar";
interface DocumentParams {
     documentId: string;
}

export const documentDetailsLoader = async ({ params }: LoaderFunctionArgs<DocumentParams>) => {
     const { documentId } = params;

     if (!documentId) {
          throw new Response("Document ID is required", { status: 400 });
     }

     return await getDocumentFullDetails(documentId)

};

export default function DocumentDetails() {
     const { documentId } = useParams();
     const { data } = useLoaderData<Awaited<ReturnType<typeof documentDetailsLoader>>>();

     if (!documentId) {
          return <NoDocumentFound title="Invalid document" />
     }

     return (
          <>
               <Topbar
                    includeBackButton
                    content={data.title}
                    toolset={<DocumentActionButtons documentId={documentId} />}
               />
               <div className="main-content">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                         <div className="grid gap-4 lg:col-span-2">
                              <Card>
                                   <CardHeader>
                                        <CardTitle>Document Information</CardTitle>
                                   </CardHeader>
                                   <CardContent>
                                        <DetailItem label="Title" value={data.title} />
                                        <DetailItem label="Document ID" value={<>#{data.documentCode}</>} />
                                        <DetailItem label="Type" value={data.sourceType} />
                                        <DetailItem label="Status" value={data.status} />
                                        <DetailItem label="Description" value={data.description} />
                                        <DetailItem label="Encoded by" value={data.createdBy?.fullName} />
                                        <DetailItem label="Encoded at" value={data.createdAt} />
                                        <DetailItem applyHoverEffect={false} label="Attachments" value={
                                             <>
                                                  {
                                                       data.attachments?.length === 0 ? (
                                                            <span className="text-sm text-muted-foreground">No attachments available.</span>
                                                       ) :
                                                            data.attachments?.map((attachment, index) => (
                                                                 <a key={index} href={uploadsConcat(attachment.filePath)} download target="__blank" className="w-full group relative">
                                                                      <Badge variant="secondary" className="px-2 py-3 w-full flex justify-between items-center">
                                                                           <div className="inline-flex gap-1 items-center relative z-10 group-hover:opacity-30 transition-all duration-300 ease-in-out">
                                                                                <File size={16} className="shrink-0" />
                                                                                <span className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">
                                                                                     {data.attachments?.[0]?.originalName}
                                                                                </span>
                                                                           </div>

                                                                           {/* Overlay effect for dimming */}
                                                                           <div className="absolute inset-0 bg-black opacity-30 transition-opacity duration-300 group-hover:opacity-50 z-0" />

                                                                           <span className="inline-flex gap-1 opacity-0 group-hover:opacity-100 group-hover:bg-background/70 p-2 transition-all group-hover:-translate-x-2.5 ease-in duration-300 z-10 rounded">
                                                                                <Download size={16} />Click to download
                                                                           </span>
                                                                      </Badge>
                                                                 </a>

                                                            ))
                                                  }
                                             </>
                                        } />
                                   </CardContent>
                              </Card>
                              <DocumentRoutings documentId={documentId} />
                         </div>
                         <div>
                              <DocumentLogs documentId={documentId} />
                         </div>
                    </div>
               </div>
          </>
     )
}

