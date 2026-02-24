"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [email, setEmail] = useState("");

  const login = async () => {
    await supabase.auth.signInWithOtp({ email });
    alert("Check your email for login link.");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>CMMD Staff Store</h1>
      <input
        type="email"
        placeholder="Work Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}