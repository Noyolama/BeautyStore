// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { useForm } from "@tanstack/react-form";
import { SmartForm } from "@/components/custom/SmartForm";
import { Button } from "@/components/ui/button";
import { useLogin, useRegister } from "@/lib/auth/authConfig";
import { toast } from "sonner";
import { useAuth } from "@/hooks";

const LoginFormSchema = z.object({
  email: z.email().min(1, 'Required'),
  password: z.string().min(1, 'Required')
})

const SignUpFormSchema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.email().min(1, 'Required'),
  password: z.string().min(1, 'Required')
})

export default function Auth() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const signIn = useLogin({
    onSuccess: (data) => {
      toast.success('User logged in successfully.')
      login(data)
      if(data.role === 'admin') {
        navigate('/admin')
      }else {
        navigate('/')
      }
    }
  })
  const signUp = useRegister({
    onSuccess: (data) => {
      toast.success('User signed up successfully.')
      login(data)
      navigate('/')
    }
  })

  const [isSignup, setIsSignup] = useState(false);

  const validatorSchema = useMemo(() => isSignup ? SignUpFormSchema : LoginFormSchema, [isSignup])

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
    validators: {
      onSubmit: validatorSchema
    },
    onSubmit: ({ value }) => {
      if (isSignup) {
        signUp.mutate(value)
      } else {
        signIn.mutate(value)
      }
    },
    formId: 'auth-form'
  })

  const inputItems = useMemo(() => {
    const defaultItems = [
      {
        key: 'email',
        label: 'Email',
      },
      {
        key: 'password',
        label: 'Password',
        type: 'password'
      }
    ]

    return isSignup ? [
      {
        key: 'name',
        label: 'Name',
      },
      ...defaultItems
    ] : defaultItems
  }, [isSignup])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        <SmartForm
          form={form}
          inputItems={inputItems}
        />

        <Button
          type="submit"
          form="auth-form"
          className="w-full bg-pink-500 text-white py-2  mt-4 rounded hover:bg-pink-600"
        >
          {isSignup ? "Sign Up" : "Login"}
        </Button>

        <p className="mt-4 text-sm text-center">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            type="submit"
            onClick={() => setIsSignup(!isSignup)}
            className="text-pink-500 hover:underline"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
