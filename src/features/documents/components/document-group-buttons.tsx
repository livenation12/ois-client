import { defaultActionMenu } from '@/components/document-list'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import type { DocumentActionGroupMenuProps } from '@/types/document.types'
import { ChevronDown, Forward, Pen } from 'lucide-react'

const forwardAction = { label: 'Forward', icon: Forward, action: 'forward' }
export default function DocumentActionButtons({ disableAllMenuItems = true, documentId, ...props }: DocumentActionGroupMenuProps & { documentId: string }) {
     
     const menuItems =  [ forwardAction, ...defaultActionMenu,  ...(props.additionalMenuItems || [])];

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
