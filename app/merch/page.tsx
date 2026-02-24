"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Admin() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
    } else {
      setOrders(data || []);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>CMMD Admin Dashboard</h1>

      {loading && <p>Loading orders...</p>}

      {!loading && orders.length === 0 && <p>No orders yet.</p>}

      {!loading &&
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginTop: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            }}
          >
            <h3>{order.user_email}</h3>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.created_at).toLocaleString()}
            </p>

            <div style={{ marginTop: "10px" }}>
              {order.items?.map((item: any, index: number) => (
                <div key={index} style={{ marginBottom: "5px" }}>
                  {item.name} — Size {item.size} — Qty {item.qty}
                </div>
              ))}
            </div>

            <h4 style={{ marginTop: "10px" }}>
              Total: ${order.total}
            </h4>
          </div>
        ))}
    </div>
  );
}