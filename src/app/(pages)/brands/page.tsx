import React from "react";
import Link from "next/link";
import { Brand } from "@/interfaces";

export default async function Brands() {
  async function getBrands(): Promise<Brand[]> {
    const data = await fetch(
      "https://ecommerce.routemisr.com/api/v1/brands"
    ).then((res) => res.json());
    return data.data;
  }
  const brands = await getBrands();

  return (
    <div className="w-[85%] my-4 mx-auto py-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-center"> Brands </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <Link
            key={brand._id}
            href={`/brands/${brand._id}`}
            className="border rounded-lg p-4 flex flex-col items-center gap-3 hover:shadow-lg transition-shadow"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-28 h-28 object-contain"
            />
            <h2 className="text-lg font-semibold">{brand.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
