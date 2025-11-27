import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemTitle } from "@/components/ui/item";
import { DocumentActionType, type Document } from "@/types/document.types";
import { File, Archive, Ellipsis, Paperclip, ReceiptText, type LucideProps, CornerUpLeft } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { uploadsConcat } from "@/utils/utils";
import { Badge } from "@/components/ui/badge";
import ListSkeleton from "./list-skeleton";
import NoListFound from "./no-list-found";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React, { createContext, useContext } from "react";

export interface DocumentListActionItem {
     label: string;
     icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
     action: string;
}

const DocumentItemContext = createContext<Document | null>(null);

interface DocumentListProps {
     loading: boolean;
     data: Document[] | undefined;
     children?: React.ReactNode;
}

export default function DocumentList({ loading, data, children }: DocumentListProps) {

     if (loading) return <ListSkeleton />;
     if (data?.length === 0) return <NoListFound title="No documents found" />;

     return (
          <div className="space-y-3">
               {data?.map((item, index) => (
                    <Item variant="outline" key={index}>
                         <ItemContent>
                              <ItemTitle className="font-semibold">
                                   <span className="text-muted-foreground">#{item.documentCode}</span>
                                   {item.title}
                              </ItemTitle>
                              {item.sourceName}
                              <ItemDescription>
                                   {item.description}
                              </ItemDescription>
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

export interface DocumentActionGroupMenuProps {
     onActionMenuClick?: (documentId: string, menu: string) => void;
     additionalMenuItems?: DocumentListActionItem[];
     disabledItems?: string[];
     disableAllMenuItems?: boolean;
     enabledItems?: string[];
     primaryActionButton?: DocumentListActionItem;
     primaryActionProps?: (id: string) => {
          loading: boolean;
          loadingText: string;
     };
}

const defaultActionMenu: DocumentListActionItem[] = [
     { label: "Revert", icon: CornerUpLeft, action: DocumentActionType.REVERT },
     { label: "Attach Routing Slip", icon: Paperclip, action: DocumentActionType.ATTACH_ROUTING },
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
