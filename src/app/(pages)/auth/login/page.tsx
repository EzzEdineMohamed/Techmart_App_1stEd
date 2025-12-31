"use client";

import { Button } from "@/Components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import LoadingSpinnerTwo from "@/Components/Shared/LoadingSpinnerTwo";
import Link from "next/link";
import { toast, Toaster } from "sonner";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: any) {
    setLoading(true);

    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (response?.ok) {
        toast.success("Logged in successfully!");
        router.push("/");
      } else {
        // لو response.error موجود نعرضه، أو نستخدم رسالة عامة
        if (response?.error === "CredentialsSignin") {
          toast.error("This email is not registered or password is incorrect!");
        } else {
          toast.error(response?.error || "Login failed!");
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Login failed!");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md py-8 border rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <div className="w-11/12 mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@email.com"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={loading}
              >
                {loading ? <LoadingSpinnerTwo /> : "Login"}
              </Button>
            </form>
          </Form>

          <div className="text-center mt-3">
            Don't have an account?{" "}
            <Link href="/auth/signup">
              <span className="text-blue-500 cursor-pointer hover:underline underline-offset-3 w-fit">
                Register
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Sonner toaster */}
      <Toaster position="top-right" />
    </div>
  );
}
