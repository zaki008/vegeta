"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { hover } from "@/lib/hover";
import { cn } from "@/lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

type UserAuthForm = {
  email: string;
  password: string;
};

const schemaLogin = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

function SignInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAuthForm>({
    resolver: yupResolver(schemaLogin),
  });

  const onSubmit: SubmitHandler<UserAuthForm> = async (data) => {
    try {
      setLoading(true);
      const user = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: searchParams.get("callbackUrl") || "/",
        redirect: false,
      });
      console.log("sukses login", user);
      setLoading(false);
      if (!user?.error) {
        console.log("user url", user?.url);
        router.push(`${user?.url}/` || "/");
        return;
      }
      toast({
        title: "Something went wrong",
        description: "Please Check Email Or Password",
        variant: "destructive",
        duration: 2000,
      });
    } catch (error) {
      setLoading(false);
      console.log("error login", error);
    }
  };

  return (
    <form
      className="flex flex-col w-[100%] gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-[100%] text-3xl font-semibold tracking-widest mb-2 text-center">
        Masuk akun anda
      </div>
      <div className="w-[100%] relative mt-4">
        <Input
          className="w-[100%]"
          type="text"
          placeholder="Email"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>
      <div className="w-[100%] relative mt-2">
        <Input
          className="w-[100%]"
          type={showPassword ? "text" : "password"}
          placeholder="Kata Sandi"
          suffix="Eye"
          onPressSuffix={() => setShowPassword(!showPassword)}
          {...register("password")}
          error={errors.password?.message}
        />
      </div>
      <Button
        className={cn("w-[320px] bg-leaf mt-6 mx-auto", hover.shadow)}
        type="submit"
        disabled={loading}
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 text-white mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
            ></path>
          </svg>
        ) : (
          "Masuk"
        )}
      </Button>
    </form>
  );
}

export default SignInForm;
