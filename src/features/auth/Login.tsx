import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { login } from "./services/auth.service";
import { useNavigate } from "react-router-dom";
import LoginImg from "@/assets/login.svg";
import useFetch from "@/hooks/use-fetch";
export default function Login() {
  const navigate = useNavigate();
  const { loading, execute } = useFetch(login, {
    onSuccess: (response) => {
      if (response.success) {
        navigate("/");
      }
    },
  });
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
    execute(formData);
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-50">
      <div className="flex flex-col sm:flex-row h-auto lg:h-[70vh] w-[90vw] lg:w-[80vw] p-3 shadow-lg rounded-2xl bg-white overflow-hidden">
        
        {/* Left Illustration */}
        <div className="w-full sm:w-[50%] lg:w-[60%] flex justify-center items-center p-8">
          <img
            src={LoginImg}
            alt="Login Illustration"
            className="max-w-[80%] h-auto"
          />
        </div>

        {/* Right Form */}
        <div className="w-full lg:w-[40%] p-3 flex justify-center items-center">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <FieldSet>
              <FieldTitle className="font-semibold text-xl md:text-2xl lg:text-3xl">Sign in</FieldTitle>
              <FieldDescription>
                Sign in to your account.
              </FieldDescription>

              <FieldGroup className="gap-1 lg:gap-2">
                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input
                    onChange={handleChange}
                    name="username"
                    id="username"
                    className="h-12"
                    autoComplete="on"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    onChange={handleChange}
                    name="password"
                    id="password"
                    className="h-12"
                    type="password"
                  />
                </Field>

                <Field orientation="horizontal" className="mt-4">
                  <Button loadingText="Logging in..." loading={loading} size="lg" type="submit" className="w-full">
                    Login
                  </Button>
                </Field>
              </FieldGroup>
            </FieldSet>
          </form>
        </div>
      </div>
    </div>

  )
}
