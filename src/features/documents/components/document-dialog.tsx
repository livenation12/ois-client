import {
     Dialog,
     DialogContent,
     DialogHeader,
     DialogTitle,
} from "@/components/ui/dialog"
import {
     Field,
     FieldGroup,
     FieldLabel,
     FieldSet,
} from "@/components/ui/field"
import OfficeSelect from "../../../components/office-select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import type { DialogProps } from "@/types/common-types"
import { Button } from "@/components/ui/button"
import type { DocumentRequest } from "../../../types/document.types"
import { createDocument } from "../services/document.service"
import useFetch from "@/hooks/use-fetch"
import useGlobal from "@/hooks/use-global"

const initialData: DocumentRequest = {
     sourceId: "",
     title: "",
     attachment: null,
     description: "",
}

export default function DocumentDialog(props: DialogProps) {
     const { dispatch: globalDispatch } = useGlobal();
     const [formData, setFormData] = useState(initialData);
     const { execute, loading } = useFetch(createDocument, {
          onSuccess: () => {
               setFormData(initialData);
               props.setOpen(false);
               globalDispatch({ type: 'NEW_DOCUMENT_ADDED' });
          }
     });

     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const fd = new FormData();
          Object.entries(formData).forEach(([key, value]) => {
               if (!value) return;
               fd.append(key, value)
          });
          execute(fd);
     };

     const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          const { name, value } = e.target;
          setFormData({
               ...formData,
               [name]: value,
          });

     }
     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (!file) return;

          setFormData({
               ...formData,
               attachment: file,
          });
     };

     const handleSelectedOffice = (id: string) => {
          setFormData({
               ...formData,
               sourceId: id,
          });
     }

     return (
          <Dialog open={props.open} onOpenChange={props.setOpen}>
               <DialogContent>
                    <DialogHeader>
                         <DialogTitle>Add Document</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                         <FieldSet>
                              <FieldGroup>
                                   <Field>
                                        <FieldLabel htmlFor="source">Office source</FieldLabel>
                                        <OfficeSelect onSelect={handleSelectedOffice} />
                                   </Field>
                                   <Field>
                                        <FieldLabel htmlFor="title">Title</FieldLabel>
                                        <Input onChange={handleFormChange} name="title" id="title" autoComplete="off" placeholder="" />
                                   </Field>
                                   <Field>
                                        <FieldLabel htmlFor="attachment">Attachment</FieldLabel>
                                        <Input onChange={handleFileChange} type="file" name="attachment" id="attachment" autoComplete="off" placeholder="" />
                                   </Field>
                                   <Field>
                                        <FieldLabel htmlFor="description">Description</FieldLabel>
                                        <Textarea
                                             onChange={handleFormChange}
                                             name="description"
                                             id="description"
                                             placeholder="Add additional information for this document."
                                             className="max-w-xl"
                                        />
                                   </Field>
                                   <Field>
                                        <Button loading={loading} loadingText="Submitting..." type="submit">Submit</Button>
                                   </Field>
                              </FieldGroup>
                         </FieldSet>
                    </form>
               </DialogContent>
          </Dialog>
     )
}
