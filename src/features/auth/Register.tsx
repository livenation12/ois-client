import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { register } from "./services/auth.service";
import { redirect } from "react-router-dom";
export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await register(formData);
      if(res.success){
        redirect("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="max-w-md w-full p-5 border shadow rounded">
        <form onSubmit={handleSubmit}>
          <FieldSet>
            <FieldLegend>Register</FieldLegend>
            <FieldDescription>Create a new account.</FieldDescription>
            <FieldGroup className="gap-2">
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input onChange={handleChange} name="username" id="username" autoComplete="on" />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input onChange={handleChange} name="password" id="password" type="password" />
              </Field>
              <Field>
                <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                <Input onChange={handleChange} name="confirmPassword" id="confirmPassword" type="password" />
              </Field>
              <Field orientation="horizontal" className="mt-3">
                <Button type="submit" className="w-full">Submit</Button>
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      </div>
    </div>
  )
}
