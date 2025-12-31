"use client";
import { formatprice } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import LoadingSpinnerTwo from "../Shared/LoadingSpinnerTwo";
import CartItem from "./cartitem";
import { CartResponse } from "@/interfaces/CartResponse";

type CartWrapperProps = {
  cartResponse: CartResponse;
};

export default function CartWrapper({ cartResponse }: CartWrapperProps) {
  const [InnerCartResponse, setInnerCartResponse] = useState(cartResponse);
  const [isClearing, setisclearing] = useState(false);

  async function clearCart() {
    setisclearing(true);
    const response: CartResponse = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzczN2ExMjAzN2YwZDI5MDIxYjdjNiIsIm5hbWUiOiJFenpFZGluZSBNb2hhbWVkIE1vc3RhZmEiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2NjY4MjQ2MCwiZXhwIjoxNzc0NDU4NDYwfQ.crPRXV_utx1zPoqM_4Mfr9WfhGMfCrQCKU8HsqXRsqE",
        },
        method: "delete",
      }
    ).then((res) => res.json());
    setisclearing(false);
    setInnerCartResponse(response);
    console.log(response);
  }

  async function clearSpecificItemFromCart(cartItemId: String) {
    // setisDeleting(true)
    const response: CartResponse = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart/" + cartItemId,
      {
        headers: {
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzczN2ExMjAzN2YwZDI5MDIxYjdjNiIsIm5hbWUiOiJFenpFZGluZSBNb2hhbWVkIE1vc3RhZmEiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2NjY4MjQ2MCwiZXhwIjoxNzc0NDU4NDYwfQ.crPRXV_utx1zPoqM_4Mfr9WfhGMfCrQCKU8HsqXRsqE",
        },
        method: "delete",
      }
    ).then((res) => res.json());
    // setisDeleting(false)
    setInnerCartResponse(response);
    console.log(response);
  }

  console.log(InnerCartResponse.data.products);

  async function updateCartItemCount(cartItemId: String, count: number) {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart/" + cartItemId,
      {
        headers: {
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzczN2ExMjAzN2YwZDI5MDIxYjdjNiIsIm5hbWUiOiJFenpFZGluZSBNb2hhbWVkIE1vc3RhZmEiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2NjY4MjQ2MCwiZXhwIjoxNzc0NDU4NDYwfQ.crPRXV_utx1zPoqM_4Mfr9WfhGMfCrQCKU8HsqXRsqE",
          "content-type": "application/json",
        },
        method: "put",
        body: JSON.stringify({
          count,
        }),
      }
    ).then((res) => res.json());

    setInnerCartResponse(response);

    console.log(response);
  }

  if (!InnerCartResponse.data || InnerCartResponse.data.products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="text-center py-12">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-400" />
          <h2 className="text-2xl font-bold mb-4">Your Cart Is Empty</h2>
          <p className="text-xl mb-6 text-gray-600">Go To Buy Products</p>
          <Button className="mt-3 text-xl font-medium">
            <Link href={"/products"}> products </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-3">
        <p className="text-muted-foreground">
          {InnerCartResponse.numberOfCartItem} item
          {InnerCartResponse.numberOfCartItem !== 1 ? "s" : ""} in cart
        </p>
      </div>
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 mt-3 mb-5">
        <div className="lg-col-span-2">
          <div className="space-y-4">
            {InnerCartResponse.data.products.map((item: any, index) => (
              <CartItem
                key={index}
                item={item}
                clearSpecificItemFromCart={clearSpecificItemFromCart}
                updateCartItemCount={updateCartItemCount}
              />
            ))}
            <Button
              variant={"default"}
              className="cursor-pointer mt-4 sm:w-full md:w-fit"
              onClick={clearCart}
              disabled={isClearing}
            >
              {isClearing ? <LoadingSpinnerTwo /> : "Clear Cart"}
            </Button>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-4">
            <h3 className="text-lg font-semibold mb-4"> Order Summary </h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span> Shipping </span>
                <span className="text-green-600"> Free </span>
              </div>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <span>
                Subtotal
                <span className="text-red-500">
                  {InnerCartResponse.data.products.length}
                </span>
                items
              </span>
              <span>
                total is : {formatprice(InnerCartResponse.data.totalCartPrice)}
              </span>
            </div>
            <Button className="w-full mt-3 cursor-pointer" size={"lg"}>
              <Link href={"/checkout/" + cartResponse.cartId}>
                Proceed To Checkout
              </Link>
            </Button>
            <Button className="w-full mt-3 cursor-pointer">
              <Link href="/products"> Continue Shopping </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
