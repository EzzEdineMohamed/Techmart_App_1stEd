import React from "react";
import { AddressResponse } from "@/interfaces/AddressResponse";
import CheckOutWrapper from "@/Components/orders/CheckOutWrapper";
import { getServerSession } from "next-auth";

export default async function checkOut(props: any) {
  // const session = await getServerSession(authOptions);

  async function getLoggedUserAddresses(): Promise<AddressResponse> {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/addresses",
      {
        headers: {
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzczN2ExMjAzN2YwZDI5MDIxYjdjNiIsIm5hbWUiOiJFenpFZGluZSBNb2hhbWVkIE1vc3RhZmEiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2NjY4MjQ2MCwiZXhwIjoxNzc0NDU4NDYwfQ.crPRXV_utx1zPoqM_4Mfr9WfhGMfCrQCKU8HsqXRsqE"
        },
      }
    ).then((res) => res.json());

    return response;
  }

  const params = await props.params;

  const cartId = params.cartId;

  console.log(cartId);

  const response: AddressResponse = await getLoggedUserAddresses();

  console.log(response);

  return (
    <div className="w-11/12 mx-auto min-h-screen py-5">
      <div className="text-red-500 text-2xl font-bold text-center">
        yourAddreses
      </div>
      <CheckOutWrapper response={response} cartId={cartId} />
    </div>
  );
}
