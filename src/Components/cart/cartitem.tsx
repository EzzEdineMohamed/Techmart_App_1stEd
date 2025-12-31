import React, { useState } from "react";
import LoadingSpinnerOne from "../Shared/LoadingSpinnerOne";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { formatprice } from "@/lib/utils";
import Link from "next/link";
import { CartProduct, CartResponse } from "@/interfaces/CartResponse";
import LoadingSpinnerTwo from "../Shared/LoadingSpinnerTwo";

type cartItemProps = {
  item: CartProduct;
  clearSpecificItemFromCart: ( cartItemId : String) => Promise<void>;
  updateCartItemCount : ( cartItemId : String , count : number ) => Promise<void>
};

export default function cartitem({
  item,
  clearSpecificItemFromCart,
  updateCartItemCount
}: cartItemProps) {
  const [isDeleting, setisDeleting] = useState(false);
  const [isincreasing, setisincreasing] = useState(false);
  const [isDecreasing, setisDecreasing] = useState(false);

  async function handleDeleteCartItem() {
    setisDeleting(true);
    await clearSpecificItemFromCart(item.product._id);
    setisDeleting(false);
  }

  async function handleUpdateCartItem(ProductCount : number) {
    if(ProductCount > item.count) {
        setisincreasing(true);
    }
    else {
        setisDecreasing(true)
    }
    await updateCartItemCount(item.product._id , ProductCount)
    setisincreasing(false)
    setisDecreasing(false)
  }

  return (
    <div key={String(item._id)} className="flex gap-4 p-4 border rounded-lg">
      <div className="relative w-20 h-20 shrink-0">
        <img
          src={item.product?.imageCover}
          alt={item.product?.title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semiBold line-clamp-2">
          <Link
            href={`/products/${item.product._id}`}
            className="hover:text-primary transition-colors"
          >
            {item.product.title}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground">
          {item.product.brand?.name}
        </p>
        <p className="font-semiBold mt-2 text-blue-600">
          {formatprice(item.price)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button className="cursor-pointer disabled:cursor-not-allowed disabled:pointer-events-auto hover:bg-background" disabled={item.count == 1 || isDecreasing} variant={"outline"} onClick={() => handleUpdateCartItem(item.count - 1)}>
          {isDecreasing ? (<LoadingSpinnerTwo/>) : (<Minus className="h-2 w-2" />)}
        </Button>
        <span className="w-8 text-center"> {item.count} </span>
        <Button disabled={isincreasing} className="cursor-pointer disabled:cursor-not-allowed disabled:pointer-events-auto hover:bg-background " variant={"outline"} size={"sm"} onClick={() => handleUpdateCartItem(item.count + 1)}>
          {isincreasing ? (<LoadingSpinnerTwo/>) : (<Plus className="h-2 w-2" />)}
        </Button>
        {/* clear one item from cart */}
        <div>
          <Button
            className="hover:text-red-500 cursor-pointer"
            variant={"outline"}
            onClick={() => handleDeleteCartItem()}
          >
            {isDeleting ? (
              <LoadingSpinnerOne />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
