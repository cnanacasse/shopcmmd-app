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
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "CMMD T-Shirt",
    price: 25,
    sizes: ["S", "M", "L", "XL"],
  },
];

export default function Merch() {
  const [cart, setCart] = useState<any[]>([]);
  const [selectedSize, setSelectedSize] = useState<any>({});

  const addToCart = (product: any) => {
    const size = selectedSize[product.id];
    if (!size) {
      alert("Please select a size");
      return;
    }
    setCart([...cart, { ...product, size, qty: 1 }]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const submitOrder = async () => {
    if (cart.length === 0) {
      alert("No items in cart");
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase.from("orders").insert([
      {
        user_email: user?.email || "unknown",
        items: cart,
        total,
      },
    ]);

    if (error) {
      alert("Error saving order");
    } else {
      alert("Order submitted successfully!");
      setCart([]);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>CMMD Staff Merch Store</h1>

      <div style={{ display: "flex", gap: 40 }}>
        <div>
          {products.map((product) => (
            <div key={product.id} style={{ marginBottom: 20 }}>
              <h3>{product.name}</h3>
              <p>${product.price}</p>

              <select
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

              <br />
              <button onClick={() => addToCart(product)}>
                Add to Order
              </button>
            </div>
          ))}
        </div>

        <div>
          <h2>Your Order</h2>

          {cart.map((item, index) => (
            <div key={index}>
              {item.name} — Size {item.size}
            </div>
          ))}

          {cart.length > 0 && (
            <>
              <h3>Total: ${total}</h3>
              <button onClick={submitOrder}>Submit Order</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}