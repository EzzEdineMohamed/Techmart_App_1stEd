import { Category, Product } from "@/interfaces";
import { formatprice } from "@/lib/utils";
import Link from "next/link";

/* fetch category details */

async function getCategoryDetails(categoryId: String): Promise<Category> {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories/" + categoryId
  ).then((res) => res.json());
  console.log(response);
  return response.data;
}

/* fetch products of category */
async function getCategoryProducts(categoryId: String): Promise<Product> {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`
  ).then((res) => res.json());
  console.log(response);
  return response.data;
}

type categoryProps = {
  params: Promise<{ categoryId: string }>;
};

export default async function BrandPage(props: categoryProps) {
  const categoryId = (await props.params).categoryId;

  const category = await getCategoryDetails(categoryId);
  const products = await getCategoryProducts(categoryId);

  return (
    <div className="w-11/12 mx-auto py-10 min-h-full">
      <h1 className="text-3xl font-bold mb-6">Category: {category.name}</h1>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {products.map((product: Product) => (
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
                {formatprice(product.price)} EGP
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
