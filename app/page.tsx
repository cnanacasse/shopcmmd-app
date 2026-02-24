"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      window.location.href = "/merch";
    }
  };

  const login = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "https://www.shopcmmd.com/",
      },
    });

    if (error) {
      setMessage("Login failed.");
    } else {
      setMessage("Check your email for login link.");
    }
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
      <br /><br />
      <button onClick={login}>Login</button>

      {message && <p>{message}</p>}
    </div>
  );
}