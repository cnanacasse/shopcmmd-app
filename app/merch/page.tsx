"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const products = [
  {
    id: 1,
    name: "CMMD Hoodie",
    price: 45,
    image: "https://via.placeholder.com/300",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "CMMD T-Shirt",
    price: 25,
    image: "https://via.placeholder.com/300",
    sizes: ["S", "M", "L", "XL"],
  },
];

export default function Merch() {
  const [cart, setCart] = useState<any[]>([]);
  const [selectedSize, setSelectedSize] = useState<any>({});
  const [quantity, setQuantity] = useState<any>({});

  const addToCart = (product: any) => {
    const size = selectedSize[product.id];
    const qty = quantity[product.id] || 1;

    if (!size) {
      alert("Please select a size");
      return;
    }

    setCart([...cart, { ...product, size, qty }]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const submitOrder = async () => {
    if (cart.length === 0) {
      alert("No items in cart");
      return;
    }

    console.log("Submitting order...");

    const { data: { user }, error: userError } =
      await supabase.auth.getUser();

    console.log("User:", user);
    console.log("User error:", userError);

    const { data, error } = await supabase.from("orders").insert([
      {
        user_email: user?.email || "unknown",
        items: cart,
        total: total,
      },
    ]);

    console.log("Insert data:", data);
    console.log("Insert error:", error);

    if (error) {
      alert("Error saving order. Check console.");
    } else {
      alert("Order submitted successfully!");
      setCart([]);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>CMMD Staff Merch Store</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "40px",
          marginTop: "40px",
        }}
      >
        {/* PRODUCTS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "30px",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", borderRadius: "8px" }}
              />

              <h3>{product.name}</h3>
              <p>${product.price}</p>

              <select
                style={{ padding: "8px", width: "100%" }}
                onChange={(e) =>
                  setSelectedSize({
                    ...selectedSize,
                    [product.id]: e.target.value,
                  })
                }
              >
                <option value="">Select Size</option>
                {product.sizes.map((size) => (
                  <option key={size}>{size}</option>
                ))}
              </select>

              <input
                type="number"
                min="1"
                defaultValue="1"
                style={{ marginTop: "10px", padding: "8px", width: "100%" }}
                onChange={(e) =>
                  setQuantity({
                    ...quantity,
                    [product.id]: Number(e.target.value),
                  })
                }
              />

              <button
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  width: "100%",
                  background: "black",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "6px",
                }}
                onClick={() => addToCart(product)}
              >
                Add to Order
              </button>
            </div>
          ))}
        </div>

        {/* ORDER SUMMARY */}
        <div
          style={{
            borderLeft: "1px solid #ddd",
            paddingLeft: "20px",
          }}
        >
          <h2>Your Order</h2>

          {cart.length === 0 && <p>No items yet</p>}

          {cart.map((item, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <strong>{item.name}</strong>
              <div>Size: {item.size}</div>
              <div>Qty: {item.qty}</div>
            </div>
          ))}

          {cart.length > 0 && (
            <>
              <hr />
              <h3>Total: ${total}</h3>
              <button
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  width: "100%",
                  background: "#0070f3",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
                onClick={submitOrder}
              >
                Submit Order
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}