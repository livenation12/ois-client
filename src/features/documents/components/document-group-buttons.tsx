import { defaultActionMenu } from '@/components/document-list'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import type { DocumentActionGroupMenuProps } from '@/types/document.types'
import { ChevronDown, Pen } from 'lucide-react'


export default function DocumentActionButtons({ disableAllMenuItems = true, documentId, ...props }: DocumentActionGroupMenuProps & { documentId: string }) {
     const menuItems = [...defaultActionMenu, ...(props.additionalMenuItems || [])];

     return (
          <div className='flex gap-2'>
               <ButtonGroup>
                    <Button variant='outline'><Pen /> Update</Button>
                    <DropdownMenu>
                         <DropdownMenuTrigger asChild>
                              <Button variant='outline'><ChevronDown /></Button>
                         </DropdownMenuTrigger>
                         <DropdownMenuContent>
                              {menuItems.map((item, idx) => (
                                   <DropdownMenuItem
                                        key={idx}
                                        onClick={() => props.onActionMenuClick?.(documentId, item.action)}
                                        disabled={props.disabledItems?.includes(item.action)
                                             || (props.enabledItems ? !props.enabledItems.includes(item.action) : false
                                                  || disableAllMenuItems
                                             )}
                                   >
                                        <item.icon /> {item.label}
                                   </DropdownMenuItem>
                              ))}
                         </DropdownMenuContent>
                    </DropdownMenu>
               </ButtonGroup>
          </div>
     )
}
