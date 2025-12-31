import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import CartWrapper from "@/Components/cart/CartWrapper";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/Components/ui/button";
import Link from "next/link";
import { getToken } from "next-auth/jwt";
// import { NextApiRequest, NextApiResponse } from "next";

export default async function MyCart() {
  // const session = await getServerSession(authOptions);

  // if (!session?.user?.token) {
  //   return (
  //     <div className="min-h-screen flex flex-col items-center justify-center">
  //       <h1 className="my-2 text-2xl font-bold">My Cart</h1>
  //       <p className="text-red-500 text-xl">
  //         You need to be logged in to view your cart.
  //       </p>
  //       <Button className="mt-4" variant="outline">
  //         <Link href="/auth/login"> Go to Login</Link>
  //       </Button>
  //     </div>
  //   );
  // }

  //  const token = await getToken({ secret : process.env.AUTH_SECRET});
  // console.log("TOKEN 👉", token);

  // const token = getToken( { req : NextRequest } ) ;
  // console.log(token)

  // const token = await getToken({
  //   secret: process.env.NEXTAUTH_SECRET as string,
  // });



  const cartResponse = await fetch(
    "https://ecommerce.routemisr.com/api/v1/cart",
    {
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzczN2ExMjAzN2YwZDI5MDIxYjdjNiIsIm5hbWUiOiJFenpFZGluZSBNb2hhbWVkIE1vc3RhZmEiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2NjY4MjQ2MCwiZXhwIjoxNzc0NDU4NDYwfQ.crPRXV_utx1zPoqM_4Mfr9WfhGMfCrQCKU8HsqXRsqE",
      },
    }
  ).then((res) => res.json());

  return (
    <div className="container w-[90%] mx-auto min-h-screen">
      <h1 className="my-2 text-2xl font-bold">My Cart</h1>
      <CartWrapper cartResponse={cartResponse} />
    </div>
  );
}
