import Link from "next/link";
import { Brand } from "@/interfaces/Brand";
import { Product } from "@/interfaces/Product";

/* Fetch Brand Details */
async function getBrandDetails(brandId: string): Promise<Brand> {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`
  );
  const data = await res.json();
  return data.data;
}

/* Fetch Products of this Brand */
async function getBrandProducts(brandId: string): Promise<Product[]> {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`
  );
  const data = await res.json();
  return data.data;
}

/* -------- Component -------- */

type BrandPageProps = {
  params: Promise<{ brandId: string }>;
};

export default async function BrandPage(props: BrandPageProps) {
  const brandId = (await props.params).brandId;

  const brand = await getBrandDetails(brandId);
  const products = await getBrandProducts(brandId);

  return (
    <div className="w-[85%] mx-auto py-8 min-h-screen">
      {/* Brand Header */}
      <div className="flex items-center gap-6 mb-10">
        <img
          src={brand.image}
          alt={brand.name}
          className="w-24 h-24 object-cover rounded-lg border"
        />
        <div>
          <h1 className="text-4xl font-bold">{brand.name}</h1>
          <p className="text-muted-foreground capitalize">{brand.slug}</p>
        </div>
      </div>

      {/* Products Grid */}
      <h2 className="text-3xl font-semibold mb-6">Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product._id}`}
            className="block border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={product.imageCover}
              alt={product.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-primary font-bold text-lg">
                {product.price} EGP
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
