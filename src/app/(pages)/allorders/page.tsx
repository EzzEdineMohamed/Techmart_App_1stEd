"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AllOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const cartId = searchParams.get("cartId");

  console.log(cartId); // شغال
  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/orders/user/693737a12037f0d29021b7c6",
        {
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzczN2ExMjAzN2YwZDI5MDIxYjdjNiIsIm5hbWUiOiJFenpFZGluZSBNb2hhbWVkIE1vc3RhZmEiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2NTk5MzExNywiZXhwIjoxNzczNzY5MTE3fQ.c25yrE6ARXoqn_DvVVL5j_iXbBVKHFvlgIB9PBx8ioE",
          },
        }
      ).then((res) => res.json());
      return response;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (orders.length === 0) return <p> you have not any orders </p>;

  function OrderCard({ order }: { order: any }) {
    return (
      <div className="min-h-screen">
        <p>Order ID: {order._id}</p>
        <p>Total: {order.totalOrderPrice}</p>
      </div>
    );
  }
}
