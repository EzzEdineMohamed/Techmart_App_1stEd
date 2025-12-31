"use client";
import { AddressResponse } from "@/interfaces/AddressResponse";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import LoadingSpinnerTwo from "../Shared/LoadingSpinnerTwo";
import { getSession } from "next-auth/react";

type CheckOutWrapperProps = {
  response: AddressResponse;
  cartId: string;
};

export default function CheckOutWrapper({
  response,
  cartId,
}: CheckOutWrapperProps) {
  const [InnerResponse, setInnerResponse] = useState(response);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  // const session = await getSession();

  // console.log(session);

  async function deleteAddress(addressId: string) {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
      {
        method: "DELETE",
        headers: {
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzczN2ExMjAzN2YwZDI5MDIxYjdjNiIsIm5hbWUiOiJFenpFZGluZSBNb2hhbWVkIE1vc3RhZmEiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2NjY4MjQ2MCwiZXhwIjoxNzc0NDU4NDYwfQ.crPRXV_utx1zPoqM_4Mfr9WfhGMfCrQCKU8HsqXRsqE" ,
        },
      }
    );

    if (!res.ok) {
      toast.error("Failed to delete address");
    }

    return res.json();
  }

  async function addAddress() {
    {
      /* if inputs is empty */
    }
    if (!name || !details || !phone || !city) {
      toast.error("input Or more is empty , please fill All");
      return;
    }

    const address = { name, details, phone, city };

    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/addresses",
        {
          method: "POST",
          headers: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzczN2ExMjAzN2YwZDI5MDIxYjdjNiIsIm5hbWUiOiJFenpFZGluZSBNb2hhbWVkIE1vc3RhZmEiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2NjY4MjQ2MCwiZXhwIjoxNzc0NDU4NDYwfQ.crPRXV_utx1zPoqM_4Mfr9WfhGMfCrQCKU8HsqXRsqE",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(address),
        }
      ).then((res) => res.json());

      setInnerResponse(response);

      if (response.status === "success") {
        toast.success("Location Added Sucsessfuly");

        setIsModalOpen(false);

        // reload after fill inputs with required data
        setTimeout(() => {
          window.location.reload();
        }, 800);
      } else {
        toast.error("Address Is not Added");
      }
    } catch (error) {
      toast.error("sorry we cant Add Address");
      console.error(error);
    }
  }

  async function handleCheckout() {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
        headers: {
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzczN2ExMjAzN2YwZDI5MDIxYjdjNiIsIm5hbWUiOiJFenpFZGluZSBNb2hhbWVkIE1vc3RhZmEiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2NjY4MjQ2MCwiZXhwIjoxNzc0NDU4NDYwfQ.crPRXV_utx1zPoqM_4Mfr9WfhGMfCrQCKU8HsqXRsqE",
          "content-type": "application/json",
        },
        method: "post",
        body: JSON.stringify({
          shippingAddress: {
            details: InnerResponse.data[selectedAddressIndex].details,
            phone: InnerResponse.data[selectedAddressIndex].phone,
            city: InnerResponse.data[selectedAddressIndex].city,
          },
        }),
      }
    ).then((res) => res.json());

    console.log(response);

    location.href = response.session.url;
  }

  return (
    <div className="min-h-full">
      {/*] if we dont have address */}
      {InnerResponse.data.length === 0 && (
        <div className="mt-5 text-center">
          <h3 className="text-red-500 mb-3">No address added yet</h3>
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => setIsModalOpen(true)}
          >
            Add New Address
          </Button>
        </div>
      )}

      {/* if we have address */}
      {InnerResponse.data.length > 0 && (
        <div className="grid mt-10 gap-4">
          {response.data.map((address, index) => (
            <div
              key={address._id}
              onClick={() => setSelectedAddressIndex(index)}
              className={cn(
                "cursor-pointer p-5 border-2 max-w-md",
                index === selectedAddressIndex
                  ? "border-blue-500 text-blue-500"
                  : "border-gray-300 text-gray-500"
              )}
            >
              <h1>
                {address.details} {address.city}
              </h1>
              <div className="flex justify-end">
                <Button onClick={() => deleteAddress(address._id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
          <Button className="w-50" onClick={handleCheckout}>
            Checkout
          </Button>
        </div>
      )}

      {/* if we dont have address */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center animate-modal-in">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">Add New Address</h2>

            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 mb-2"
              placeholder="Name"
            />
            <Input
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full border p-2 mb-2"
              placeholder="details"
            />
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border p-2 mb-2"
              placeholder="phone"
            />
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border p-2 mb-4"
              placeholder="city"
            />

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button className="cursor-pointer" onClick={addAddress}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
