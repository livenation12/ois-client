import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import OfficeSelect from '@/components/office-select'
import type { DialogProps } from '@/types/common-types'
import type { DocumentActionRequest } from '@/types/document.types'
import { useState } from 'react'
import { forwardDocument } from '../services/document.service'
import { Field, FieldLabel, FieldSet } from '@/components/ui/field'
import useFetch from '@/hooks/use-fetch'
import EmployeeSelect from '@/components/employee-select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Forward } from 'lucide-react'

interface DocumentForwardDialogProps extends DialogProps {
     documentId: string
     onForward?: () => void
}

const initialData: DocumentActionRequest = {
     toId: '',
     remarks: '',
     additionalRemarks: '',
     targetType: 'User',
     sourceType: 'Office'
}

export default function DocumentForwardDialog(props: DocumentForwardDialogProps) {
     const [formData, setFormData] = useState(initialData);
     const { execute, loading } = useFetch(forwardDocument, {
          onSuccess: () => {
               setFormData(initialData);
               props.setOpen(false);
               props.onForward?.();
          }
     })
     const handleSelect = (id: string) => {
          setFormData({
               ...formData,
               toId: id,
          });
     }

     const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
          const { name, value } = e.target;
          setFormData({
               ...formData,
               [name]: value,
          });
     }

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          console.log(formData);
          execute(props.documentId, formData);
     }

     const handleTabChange = (value: string) => {
          setFormData({
               ...formData,
               targetType: value,
          });
     }
     return (
          <Dialog open={props.open} onOpenChange={props.setOpen}>
               <DialogContent>
                    <DialogHeader>
                         <DialogTitle>Forward document</DialogTitle>
                         <DialogDescription>
                              Forward document to others
                         </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                         <FieldSet>
                              <Field>
                                   <FieldLabel>Remarks</FieldLabel>
                                   <Textarea onChange={handleChange} rows={3} name="remarks" />
                              </Field>
                              <Field>
                                   <h5 className="font-semibold text-md">Forward to</h5>
                                   <Tabs defaultValue="User" onValueChange={handleTabChange}>
                                        <TabsList className="my-2">
                                             <TabsTrigger value="User">Employee</TabsTrigger>
                                             <TabsTrigger value="Office">Office</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="User">
                                             <EmployeeSelect onSelect={handleSelect} />
                                        </TabsContent>
                                        <TabsContent value="Office">
                                             <OfficeSelect onSelect={handleSelect} />
                                        </TabsContent>
                                   </Tabs>
                              </Field>
                              <Field>
                                   <Button loading={loading} loadingText='Forwarding...' type='submit'><Forward /> Forward</Button>
                              </Field>
                         </FieldSet>
                    </form>
               </DialogContent>
          </Dialog>
     )
}
