// TEST VERSION 3
"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("Login failed. Check credentials.");
    } else {
      window.location.href = "/merch";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        fontFamily: "Arial",
      }}
    >
      <h1>CMMD Staff Store</h1>

      <input
        type="email"
        placeholder="Work Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "10px", marginTop: "15px", width: "250px" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: "10px", marginTop: "10px", width: "250px" }}
      />

      <button
        onClick={handleLogin}
        style={{ marginTop: "15px", padding: "10px 20px", cursor: "pointer" }}
      >
        Sign In
      </button>

      {message && (
        <p style={{ marginTop: "10px", color: "red" }}>{message}</p>
      )}
    </div>
  );
}