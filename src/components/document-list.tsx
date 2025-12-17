import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemTitle } from "@/components/ui/item";
import { DocumentActionType, type Document, type DocumentActionGroupMenuProps, type DocumentActionItem } from "@/types/document.types";
import { File, Archive, Ellipsis, Paperclip, ReceiptText, CornerUpLeft } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { uploadsConcat } from "@/utils/utils";
import { Badge } from "@/components/ui/badge";
import ListSkeleton from "./skeletons/list-skeleton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React, { createContext, useContext } from "react";
import NoDocumentFound from "../features/documents/components/no-document-found";


const DocumentItemContext = createContext<Document | null>(null);

interface DocumentListProps {
     loading: boolean;
     data: Document[] | undefined;
     children?: React.ReactNode;
}

export default function DocumentList({ loading, data, children }: DocumentListProps) {

     if (loading) return <ListSkeleton />;
     if (data?.length === 0) return <NoDocumentFound title="No documents found" />;

     return (
          <div className="space-y-3">
               {data?.map((item, index) => (
                    <Item variant="outline" key={index}>
                         <ItemContent>
                              <div className="flex flex-col lg:flex-row items-start">
                                   <div className="inline-flex flex-col w-full lg:w-1/3 lg:pe-5">
                                        <ItemTitle className="font-semibold w-full">
                                             <span className="text-muted-foreground">#{item.documentCode}</span>
                                             <h6 className="truncate">{item.title}</h6>
                                        </ItemTitle>
                                        {item.sourceName}
                                   </div>
                                   <ItemDescription className="text-start w-full lg:w-2/3">
                                        {item.description}
                                   </ItemDescription>
                              </div>
                         </ItemContent>
                         <ItemActions>
                              <DocumentItemContext
                                   value={item}
                              >
                                   {children && children}
                              </DocumentItemContext>
                         </ItemActions>

                         <ItemFooter>
                              <div className="flex items-center gap-2">
                                   <Avatar>
                                        <AvatarFallback>AD</AvatarFallback>
                                   </Avatar>
                                   <a href={uploadsConcat(item.attachments?.[0]?.filePath)} download target="__blank">
                                        <Badge variant="secondary" className="max-w-[10rem] h-8 items-center gap-1">
                                             <File className="shrink-0" />
                                             <span className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">
                                                  {item.attachments?.[0]?.originalName}
                                             </span>
                                        </Badge>
                                   </a>
                              </div>
                         </ItemFooter>
                    </Item>
               ))}
          </div>
     );
}

export const defaultActionMenu: DocumentActionItem[] = [
     { label: "Revert", icon: CornerUpLeft, action: DocumentActionType.REVERT },
     { label: "Attach routing", icon: Paperclip, action: DocumentActionType.ATTACH_ROUTING },
     { label: "Archive", icon: Archive, action: DocumentActionType.ARCHIVE },
];


export function DocumentItemActionGroupMenu({ disableAllMenuItems = true, ...props }: DocumentActionGroupMenuProps) {
     const context = useContext(DocumentItemContext);
     if (!context) throw new Error("ActionGroupMenu must be used within a DocumentItemContext in DocumentList.");

     const menuItems = [...defaultActionMenu, ...(props.additionalMenuItems || [])];

     return (
          <ButtonGroup aria-label="Action buttons">
               <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                         <Button variant="outline" size="sm">
                              <Ellipsis />
                         </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                         <DropdownMenuGroup>
                              <Link to={`/documents/${context.id}`}>
                                   <DropdownMenuItem>
                                        <ReceiptText /> View Details
                                   </DropdownMenuItem>
                              </Link>

                              <DropdownMenuSeparator />

                              {menuItems.map((item, idx) => (
                                   <DropdownMenuItem
                                        key={idx}
                                        onClick={() => props.onActionMenuClick?.(context.id, item.action)}
                                        disabled={props.disabledItems?.includes(item.action)
                                             || (props.enabledItems ? !props.enabledItems.includes(item.action) : false
                                                  || disableAllMenuItems
                                             )}
                                   >
                                        <item.icon /> {item.label}
                                   </DropdownMenuItem>
                              ))}
                         </DropdownMenuGroup>
                    </DropdownMenuContent>
               </DropdownMenu>

               {props.primaryActionButton && (
                    <Button
                         size="sm"
                         variant="outline"
                         onClick={() => props.onActionMenuClick?.(context.id, props.primaryActionButton!.action)}
                         {...props.primaryActionProps?.(context.id)}
                    >
                         <props.primaryActionButton.icon /> {props.primaryActionButton.label}
                    </Button>
               )}
          </ButtonGroup>
     );
}
