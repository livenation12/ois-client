import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { DialogProps } from '@/types/common-types'
import { useState } from 'react'
import { Field, FieldLabel, FieldSet } from '@/components/ui/field'
import type { RoutingSlipRequest } from '@/types/routing-slip.types'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useFetch from '@/hooks/use-fetch'
import { createRoutingSlip } from '../services/routing-slip.service'
import { Textarea } from '@/components/ui/textarea'

interface RoutingSlipDialogProps extends DialogProps {
     documentId: string
     onSuccess?: () => void
}

const initialData: RoutingSlipRequest = {
     attachment: null,
     title: '',
     subject: '',
     urgency: 'low',
     actionRequested: '',
     documentId: '',

}

export default function RoutingSlipDialog({ closeOnSucceed = true, ...props }: RoutingSlipDialogProps) {
     const { execute } = useFetch(createRoutingSlip, {
          onSuccess: (res) => {
               if (res.success) {
                    props.onSuccess?.();
                    if (closeOnSucceed) props.setOpen(false);
               }
          }
     });
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
          const fn = new FormData();
          Object.entries(formData).forEach(([key, value]) => {
               if (!value) return;
               fn.append(key, value)
          })
          fn.append('documentId', props.documentId);
          execute(fn);
     }

     const handleSelectValueChange = (value: string, name: string) => {
          setFormData({
               ...formData,
               [name]: value
          })
     }

     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setFormData({
               ...formData,
               attachment: file,
          });
     }
     return (
          <Dialog open={props.open} onOpenChange={props.setOpen}>
               <DialogContent>
                    <DialogHeader>
                         <DialogTitle>Attach Routing Slip</DialogTitle>
                         <DialogDescription>
                              Attach a routing slip for this document
                         </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                         <FieldSet>
                              <Field>
                                   <FieldLabel htmlFor="title">Title</FieldLabel>
                                   <Textarea rows={2} onChange={handleChange} name='title' id='title' />
                              </Field>
                              <Field>
                                   <FieldLabel htmlFor="subject">Subject</FieldLabel>
                                   <Textarea rows={3} onChange={handleChange} name='subject' id='subject' />
                              </Field>
                              <Field>
                                   <FieldLabel htmlFor="attachment">Attachment</FieldLabel>
                                   <Input type='file' onChange={handleFileChange} name='attachment' id='attachment' />
                              </Field>
                              <Field>
                                   <FieldLabel htmlFor="urgency">Urgency</FieldLabel>
                                   <Select defaultValue='low' onValueChange={(val) => handleSelectValueChange(val, 'urgency')}>
                                        <SelectTrigger className="w-[180px]">
                                             <SelectValue placeholder="Urgency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                             <SelectItem value="low">Low</SelectItem>
                                             <SelectItem value="medium">Medium</SelectItem>
                                             <SelectItem value="high">High</SelectItem>
                                        </SelectContent>
                                   </Select>
                              </Field>
                              <Field>
                                   <FieldLabel htmlFor="actionRequested">Action requested</FieldLabel>
                                   <Select defaultValue='low' onValueChange={(val) => handleSelectValueChange(val, 'actionRequested')}>
                                        <SelectTrigger className="w-[180px]">
                                             <SelectValue placeholder="Action requested" />
                                        </SelectTrigger>
                                        <SelectContent>
                                             <SelectItem value="low">Low</SelectItem>
                                             <SelectItem value="medium">Medium</SelectItem>
                                             <SelectItem value="high">High</SelectItem>
                                        </SelectContent>
                                   </Select>
                              </Field>
                              <Field>
                                   <Button type='submit'>Forward</Button>
                              </Field>
                         </FieldSet>
                    </form>
               </DialogContent>
          </Dialog>
     )
}
