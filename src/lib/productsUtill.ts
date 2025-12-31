export async function addProductToCart(
  productId: string,
) {
  return fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzczN2ExMjAzN2YwZDI5MDIxYjdjNiIsIm5hbWUiOiJFenpFZGluZSBNb2hhbWVkIE1vc3RhZmEiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2NjY4MjQ2MCwiZXhwIjoxNzc0NDU4NDYwfQ.crPRXV_utx1zPoqM_4Mfr9WfhGMfCrQCKU8HsqXRsqE",
    },
    body: JSON.stringify({ productId }),
  });
}
