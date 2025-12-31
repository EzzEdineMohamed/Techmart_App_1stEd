import { Category } from "@/interfaces";
import Link from "next/link";

/* -------- Fetch All Categories -------- */
async function getAllCategories(): Promise<Category[]> {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories"
  );
  const data = await res.json();
  return data.data;
}

/* -------- Component -------- */

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="w-[85%] mx-auto py-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-center">Categories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category._id}`} // مهم جداً
            className="block border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-xl line-clamp-2">
                {category.name}
              </h3>
              <p className="text-muted-foreground capitalize">{category.slug}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
