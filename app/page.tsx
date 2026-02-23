"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      flexDirection: "column",
      fontFamily: "Arial"
    }}>
      <h1>CMMD Staff Store</h1>
      <p>Please sign in with your work email</p>

      <input
        type="email"
        placeholder="you@christinemeyermd.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: "10px",
          marginTop: "20px",
          width: "250px"
        }}
      />

      <button
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          cursor: "pointer"
        }}
      >
        Continue
      </button>
    </div>
  );
}