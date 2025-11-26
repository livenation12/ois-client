import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import type { DialogProps } from "@/types/common-types"
import type { OfficeForm } from "@/types/office-types"
import { useState } from "react"
import { createOffice } from "../services/office-service"
import useFetch from "@/hooks/use-fetch"

interface OfficeDialogProps extends DialogProps {
     onCreate: () => void
}

const initialData = {
     name: "",
     code: "",
     department: "",
}

export default function OfficeDialog(props: OfficeDialogProps) {
     const [formData, setFormData] = useState<OfficeForm>(initialData);
     const { execute, loading } = useFetch(createOffice, {
          onSuccess: () => {
               setFormData(initialData);
               props.setOpen(false);
               props.onCreate();
          }
     });

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          e.stopPropagation();
          execute(formData);
     }

     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setFormData({
               ...formData,
               [name]: value,
          });
     }
     return (
          <Dialog open={props.open} onOpenChange={props.setOpen}>
               <DialogContent>
                    <DialogHeader>
                         <DialogTitle>Add office</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                         <FieldSet>
                              <FieldGroup>
                                   <Field>
                                        <FieldLabel htmlFor="name">Office name <span className="text-red-500">*</span></FieldLabel>
                                        <Input onChange={handleChange} name="name" id="name" />
                                   </Field>
                                   <Field>
                                        <FieldLabel htmlFor="code">Code/Abbr</FieldLabel>
                                        <Input onChange={handleChange} name="code" id="code" />
                                   </Field>
                                   <Field>
                                        <FieldLabel htmlFor="department">Department</FieldLabel>
                                        <Input onChange={handleChange} name="department" id="department" />
                                   </Field>
                                   <Field>
                                        <Button loading={loading} loadingText="Adding office..." type="submit">Submit</Button>
                                   </Field>
                              </FieldGroup>
                         </FieldSet>
                    </form>
               </DialogContent>
          </Dialog>
     )
}
