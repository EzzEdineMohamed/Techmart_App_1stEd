"use client";

import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import LoadingSpinnerTwo from "@/Components/Shared/LoadingSpinnerTwo";
import { toast, Toaster } from "sonner";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.rePassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Error signing up");
        return;
      }

      toast.success("User signed up successfully!");
      setFormData({
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phone: "",
      });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Error signing up");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded bg-gray-50 focus:outline-blue-500"
          required
        />

        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded bg-gray-50 focus:outline-blue-500"
          required
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded bg-gray-50 focus:outline-blue-500"
          required
        />

        <Input
          type="password"
          name="rePassword"
          placeholder="Confirm Password"
          value={formData.rePassword}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded bg-gray-50 focus:outline-blue-500"
          required
        />

        <Input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full mb-6 p-3 border rounded bg-gray-50 focus:outline-blue-500"
          required
        />

        <Button
          type="submit"
          disabled={loading}
          className={`w-full cursor-pointer p-3 rounded text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-gray-900"
          }`}
        >
          {loading ? <LoadingSpinnerTwo /> : "Sign Up"}
        </Button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?
          <a href="/auth/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>

      {/* Sonner toaster */}
      <Toaster position="top-right" />
    </div>
  );
}
