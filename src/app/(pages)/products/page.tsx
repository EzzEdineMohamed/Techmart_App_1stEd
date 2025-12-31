
import { ProductCard } from "@/Components";
import { Product } from "@/interfaces";

export default async function productspage() {
  async function getProductsFromApi(): Promise<Product[]> {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/products/"
    );

    const data = await response.json();

    return data.data;
  }

  const products = await getProductsFromApi();

  return (
    <div className="w-[85%] mx-auto min-h-screen pb-8">
      <h1 className="text-4xl font-bold text-center py-3"> products </h1>
      <div
        className="grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      gap-7
      mt-7"
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
