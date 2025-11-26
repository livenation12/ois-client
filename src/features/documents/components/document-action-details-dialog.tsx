import { useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { DialogProps } from '@/types/common-types'
import DetailItem from '@/components/detail-item'
import useFetch from '@/hooks/use-fetch'
import { getDocumentActionFullDetails } from '../services/document.service'
import { Separator } from '@/components/ui/separator'
import UrgencyBadge from '@/components/layout/urgency-badge'

interface DocumentActionDetailsDialogProps extends DialogProps {
     documentActionId: string
}

export default function DocumentActionDetailsDialog(props: DocumentActionDetailsDialogProps) {
     const { data, execute } = useFetch(getDocumentActionFullDetails);
     useEffect(() => {
          if (props.documentActionId && props.open) {
               execute(props.documentActionId);
          }
     }, [props.documentActionId, props.open]);

     return (
          <Dialog open={props.open} onOpenChange={props.setOpen}>
               {
                    data && (
                         <DialogContent>
                              <DialogHeader>
                                   <DialogTitle>{data.action}</DialogTitle>
                              </DialogHeader>
                              {
                                   data.attachedRouting &&
                                   (
                                        <>
                                             <h6>Routing Slip Details</h6>
                                             <DetailItem label='Document TIN' value={data.attachedRouting?.docTin} />
                                             <DetailItem label='Title' value={data.attachedRouting?.title} />
                                             <DetailItem label='Subject' value={data.attachedRouting?.subject} />
                                             <DetailItem label='Urgency' value={<UrgencyBadge urgency={data.attachedRouting?.urgency}/>} />
                                             
                                             <Separator />
                                        </>
                                   )}
                              <DetailItem label='From' value={data.fromOffice.name} />
                              <DetailItem label='To' value={data.toOffice.name} />
                              <DetailItem label='Remarks' value={data.remarks} />
                              <DetailItem label='Additional Remarks' value={data.additionalRemarks} />
                              <DetailItem label='Created At' value={data.createdAt} />
                         </DialogContent>
                    )
               }
          </Dialog>
     )
}
