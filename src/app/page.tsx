import { Button } from "@/Components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-40 text-black flex flex-col items-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight lg:text-6xl">
          Welcome To ShopMart
        </h1>
        <p className="text-xl text-black max-w-2xl text-center mx-auto">
          discover the latest technology , fashion , and lifestyle products .
          quality guaranteed with fast shopping and excellent customer service
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-5">
        <Button className="text-lg px-8">
          <Link href="/products"> ShopNow </Link>
        </Button>
        <Button className="text-lg px-8">
          <Link href="/categories"> Browse categories </Link>
        </Button>
      </div>
    </div>
  );
}
