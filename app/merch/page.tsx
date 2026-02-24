"use client";

import { useState } from "react";

const products = [
  {
    id: 1,
    name: "CMMD Hoodie",
    price: 45,
    image: "https://via.placeholder.com/200",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "CMMD T-Shirt",
    price: 25,
    image: "https://via.placeholder.com/200",
    sizes: ["S", "M", "L", "XL"],
  },
];

export default function Merch() {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (product: any, size: string) => {
    if (!size) return alert("Please select a size");

    setCart([...cart, { ...product, size }]);
    alert(`${product.name} (${size}) added to order`);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>CMMD Staff Merch Store</h1>

      <div
          style={{
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "40px",
  marginTop: "40px"
}}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              textAlign: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", borderRadius: "8px" }}
            />

            <h3 style={{ marginTop: "15px" }}>{product.name}</h3>
            <p>${product.price}</p>

            <select
              style={{ padding: "8px", marginTop: "10px", width: "100%" }}
              onChange={(e) =>
                addToCart(product, e.target.value)
              }
            >
              <option value="">Select Size</option>
              {product.sizes.map((size) => (
                <option key={size}>{size}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}