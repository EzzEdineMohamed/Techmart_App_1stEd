"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addProductToCart } from "@/lib/productsUtill";

type AddToCartProps = {
  productId: string;
};

export default function AddToCartBtn({ productId }: AddToCartProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  // const { data: session } = useSession();
  // const router = useRouter();

  async function handleAddToCart() {
    // const token = session?.user?.token;

    // if (!token) {
    //   router.push("/auth/login");
    //   return;
    // }

    setIsAddingToCart(true);

    await addProductToCart(productId);

    setIsAddingToCart(false);
    setIsAdded(true);

    setTimeout(() => setIsAdded(false), 2000);
  }

  return (
    <Button
      className={`flex justify-center w-full py-2 rounded-md transition cursor-pointer
        ${isAdded ? "bg-green-900 text-white" : "bg-black text-white"}`}
      onClick={handleAddToCart}
      disabled={isAddingToCart}
    >
      {isAddingToCart ? "Adding..." : isAdded ? "Added" : "Add to Cart"}
    </Button>
  );
}
