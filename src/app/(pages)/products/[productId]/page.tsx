import { AddToCartBtn } from "@/Components";
import { Button } from "@/Components/ui/button";
import { Product } from "@/interfaces";
import { addProductToCart } from "@/lib/productsUtill";
import { formatprice, renderStars } from "@/lib/utils";
import { get } from "http";
import { Heart, RotateCcw, Shield, Truck } from "lucide-react";
import { getSession } from "next-auth/react";
import Link from "next/link";
import React from "react";


type ProductDetailsprops = {
  params: Promise<{ productId: String }>;
};

export default async function Productdetailspage(props: ProductDetailsprops) {
  /* store product id */

  const Productid = await props.params.then((res) => res.productId);

  /* fetch product details from api  */

  async function getProductDetails(productId: string): Promise<Product> {
    const data = await fetch(
      "https://ecommerce.routemisr.com/api/v1/products/" + productId
    ).then((res) => res.json());
    return data.data;
  }

  /* parse both to wrap in product card */

  const ProductDetails = await getProductDetails(Productid.toString());

  const session = getSession()
  console.log("session", session);

  return (
    <div className="w-11/12 mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <img
              src={ProductDetails.imageCover}
              alt={ProductDetails.title}
              className="object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-2 overflow-hidden">
            {ProductDetails.images.map((image, index) => (
              <button
                key={index}
                className={`relative w-20 h-20 shrink-0 rounded-md overflow-hidden border-2 ${
                  0 === index ? "border-primary" : "border-gray-200"
                }`}
              >
                <img
                  src={image}
                  alt={`${ProductDetails.title} ${index + 1}`}
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Brand */}
          <div className="text-sm text-muted-foreground uppercase tracking-wide">
            <Link
              href={`/brands/${ProductDetails.brand._id}`}
              className="hover:text-primary hover:underline transition-colors"
            >
              {ProductDetails.brand.name}
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold">{ProductDetails.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {renderStars(ProductDetails.ratingsAverage)}
              <span className="ml-2 text-sm text-muted-foreground">
                {ProductDetails.ratingsAverage} (
                {ProductDetails.ratingsQuantity} reviews)
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {ProductDetails.sold} sold
            </span>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-primary">
            {formatprice(ProductDetails.price)}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-semibold">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {ProductDetails.description}
            </p>
          </div>

          {/* Category & Subcategory */}
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/categories/${ProductDetails.category._id}`}
              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm hover:bg-secondary/80 transition-colors"
            >
              {ProductDetails.category.name}
            </Link>
            {ProductDetails.subcategory.map((sub) => (
              <span
                key={sub._id}
                className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
              >
                {sub.name}
              </span>
            ))}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Stock:</span>
            <span
              className={`text-sm ${
                ProductDetails.quantity > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {ProductDetails.quantity > 0
                ? `${ProductDetails.quantity} available`
                : "Out of stock"}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <AddToCartBtn productId={ProductDetails._id} />

            <Button variant="outline" size="lg">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Free Shipping</p>
                <p className="text-xs text-muted-foreground">
                  On orders over $50
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Secure Payment</p>
                <p className="text-xs text-muted-foreground">
                  100% secure checkout
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Easy Returns</p>
                <p className="text-xs text-muted-foreground">
                  30-day return policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
