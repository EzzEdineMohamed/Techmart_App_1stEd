import { Product } from "@/interfaces";
import { Category } from "@/interfaces";
import { Subcategory } from "@/interfaces";
import { Brand } from "@/interfaces";
import { formatprice, renderStars } from "@/lib/utils";
import { Heart, Star, StarHalf } from "lucide-react";
import Link from "next/link";
import { format } from "path";
import React from "react";
import { AddToCartBtn } from "@/Components";
import { addProductToCart } from "@/lib/productsUtill";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.imageCover}
          alt={product.title}
          className="w-full h-64 object-contain group-hover:scale-105 transition-transform duration-300"
        />

        {/* Sale Badge  && */}

        {product.sold > 1000 && (
          <span className="absolute top-3 left-3 text-xs px-2 py-1 rounded-md text-black bg-yellow-300 font-semibold">
            popular
          </span>
        )}

        {/* Wishlist Button */}
      </div>

      {/* Product Content */}
      <div className="p-4 space-y-2">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
          <Link href={`/products/${product._id}`}> {product.title} </Link>
        </h2>

        {/* Category */}
        <p className="text-xs text-muted-foreground mb-2">
          <Link
            href={`/categories/${product.category._id}`}
            className="hover:text-primary hover:underline transition-colors"
          >
            {product.category.name}
          </Link>
        </p>
        {/*  */}
        {/* Brand */}
        <p className="text-sm text-black hover:underline">
          <Link href={`/brands/${product.brand._id}`}>
            {product.brand.name}
          </Link>
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">{renderStars(product.ratingsAverage)}</div>
          <span className="text-xs text-muted-foreground">
            ({product.ratingsQuantity})
          </span>
        </div>

        {/* Prices */}
        <div className="flex justify-between items-center gap-2">
          <span className="text-xl font-bold text-black">
            {formatprice(product.price)}
          </span>
          <span className="text-xs text-muted-foreground">
            {product.sold > 1200 ? "1000+" : product.sold}
          </span>
        </div>

        <AddToCartBtn productId={product._id} />
      </div>
    </div>
  );
}
