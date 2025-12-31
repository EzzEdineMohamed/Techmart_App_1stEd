"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Heart,
  LogOut,
  LogOutIcon,
  Menu,
  SeparatorHorizontal,
  ShoppingBasket,
} from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Loading from "@/app/loading";
import LoadingSpinnerTwo from "../Shared/LoadingSpinnerTwo";
// import LoadingSpinnerTwo from "../Shared/LoadingSpinnerTwo";

export default function Navbar() {
  const pathName = usePathname();
  const navItems = [
    { name: "Products", href: "/products" },
    { name: "Brands", href: "/brands" },
    { name: "Categories", href: "/categories" },
  ];

  const session = useSession();
  console.log(session);

  // async function getUserSession() {
  //   const session = await getSession();
  //   console.log(session);
  // }

  // useEffect(() => {
  //   getUserSession();
  // }, []);

  return (
    <header className="py-2.5 sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="w-[85%] mx-auto flex items-center justify-between py-4">
        {/* Left Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-black"
        >
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">T</span>
          </div>
          TechMart
        </Link>

        {/* Middle Links – Desktop */}

        <div className="mx-auto hidden md:block">
          <ul className="flex flex-wrap gap-3">
            {/* mapping on buttons */}
            {navItems.map((item) => (
              <li key={item.name}>
                <Button
                  variant="outline"
                  className={pathName == item.href ? "bg-black text-white" : ""}
                >
                  <Link href={item.href}> {item.name} </Link>
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-left hidden md:flex justify-center items-center gap-6">
          {session.status == "loading" ? (
            <LoadingSpinnerTwo />
          ) : session.status == "authenticated" ? (
            <>
              <span className="text-gray-500">Hello , {session.data.user?.name}</span>
              {/* logout function from next-auth */}
              <Button className="cursor-pointer" onClick={() => signOut()} title="signout">
                <LogOutIcon />
              </Button>
              <div className="relative cursor-pointer">
                <Link href={`/cart`} className="relative">
                  <ShoppingBasket className="hover:text-blue-500" />
                  <span className="absolute -top-2 -right-2  bg-red-600 text-white  text-xs font-semibold  w-3.5 h-3.5 flex items-center justify-center rounded-full ">
                    0
                  </span>
                </Link>
              </div>
            </>
          ) : (
            ""
          )}
          {session.status == "unauthenticated" && (
            <div className="mx-left cursor-pointer">
              <Button variant={"outline"}>
                <Link href={"/auth/login"}> Login </Link>
              </Button>
            </div>
          )}
         
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger className="md:hidden p-2 rounded-md bg-white shadow">
            <Menu className="w-6 h-6" />
          </SheetTrigger>

          <SheetContent side="left" className="p-4 flex flex-col gap-4">
            <span className="text-gray-500 mx-auto">
              {/* <Link
                  href={"/api/auth/signin"}
                  className="text-lg font-medium text-red-500"
                >
                  LogIn
                </Link> */}
              helloe , Ezz
            </span>
            <Link className="text-lg font-medium" href="/products">
              Products
            </Link>
            <Link className="text-lg font-medium" href="/brands">
              Brands
            </Link>
            <Link className="text-lg font-medium" href="/categories">
              Categories
            </Link>
            <Link className="text-lg font-medium" href="/wishlist">
              WishList
            </Link>
            <Link className="text-lg font-medium" href="/cart">
              MyCart
            </Link>
            <Link
              href={"/api/auth/signin"}
              className="text-lg font-medium text-red-500"
            >
              LogOut
            </Link>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
