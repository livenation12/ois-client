import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { DialogProps } from '@/types/common-types'
import { useEffect, useState } from 'react'
import { Field, FieldLabel, FieldSeparator, FieldSet } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import type { RevertDocumentRequest } from '@/types/document.types'
import useFetch from '@/hooks/use-fetch'
import { getDocumentDetails, revertDocument } from '@/features/documents/services/document.service'
import { Loader2, User } from 'lucide-react'

interface RoutingSlipDialogProps extends DialogProps {
     documentId: string
     onRevert?: () => void
}

const initialData: RevertDocumentRequest = {
     remarks: '',
     additionalRemarks: '',
}

export default function RevertDialog(props: RoutingSlipDialogProps) {
     const { execute, data, loading } = useFetch(getDocumentDetails)
     const { execute: executeRevert, loading: revertLoading } = useFetch(revertDocument, {
          onSuccess: () => {
               props.onRevert && props.onRevert();
               props.setOpen(false);
          }
     })
     const [formData, setFormData] = useState(initialData);

     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          const { name, value } = e.target;
          setFormData({
               ...formData,
               [name]: value,
          });
     }
     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          executeRevert(props.documentId, formData);
     }

     // Fetch any necessary data when the dialog opens
     useEffect(() => {
          if (props.open && props.documentId) {
               execute(props.documentId);
          }
     }, [props.open]);


     return (
          <Dialog open={props.open} onOpenChange={props.setOpen}>
               <DialogContent>
                    <DialogHeader>
                         <DialogTitle>Revert document</DialogTitle>
                         <DialogDescription>
                              Revert this document to the previous sender.
                         </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                         {
                              loading ? (
                                   <Loader2 className='animate-spin mx-auto' />
                              ) :
                                   (
                                        <div className="space-y-1 text-sm">
                                             <h5 className="font-semibold">
                                                  <span className="text-muted-foreground">#{data?.documentCode}</span> {data?.title}
                                             </h5>
                                             <h6>{data?.sourceName}</h6>
                                             <div className='flex items-center gap-1'>
                                                  <User size={16} /> {data?.activeLog?.from.name}
                                             </div>
                                        </div>
                                   )
                         }
                         <FieldSeparator className='my-1' />
                         <FieldSet>
                              <Field>
                                   <FieldLabel>Remarks</FieldLabel>
                                   <Textarea rows={5} onChange={handleChange} name='remarks' />
                              </Field>
                              <Field>
                                   <FieldLabel>Additional Remarks</FieldLabel>
                                   <Textarea onChange={handleChange} name='additionalRemarks' />
                              </Field>
                              <Field>
                                   <Button type='submit' loading={revertLoading}>Revert</Button>
                              </Field>
                         </FieldSet>
                    </form>
               </DialogContent>
          </Dialog>
     )
}
