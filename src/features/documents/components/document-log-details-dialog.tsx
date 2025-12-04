import { useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { DialogProps } from '@/types/common-types'
import DetailItem from '@/components/detail-item'
import useFetch from '@/hooks/use-fetch'
import { getDocumentActionFullDetails } from '../services/document.service'
import { getEntityDisplayName } from '@/utils/utils'

interface DocumentActionDetailsDialogProps extends DialogProps {
     documentActionId: string
}

export default function DocumentLogDetailsDialog(props: DocumentActionDetailsDialogProps) {
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
                              <DetailItem label='From' value={getEntityDisplayName(data.from)} />
                              <DetailItem label='To' value={getEntityDisplayName(data.to)} />
                              {data.remarks && <DetailItem label='Remarks' value={data.remarks || '--'} />}
                              {/* {data.additionalRemarks && <DetailItem label='Additional Remarks' value={data.additionalRemarks} />} */}
                              <span className='flex justify-end text-muted-foreground text-xs'>
                                   {data.createdAt}
                              </span>
                         </DialogContent>
                    )
               }
          </Dialog>
     )
}
