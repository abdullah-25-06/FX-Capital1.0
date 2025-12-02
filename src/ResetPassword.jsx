// src/pages/ResetPassword.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ResetPassword() {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params.get("token") || "");
    setUserId(params.get("id") || "");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (password !== confirm) return setError("Passwords do not match.");
    setError("");

    setStatus("loading");
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/user/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, token, newPassword: password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Reset failed.");
    }
  };

  if (!token || !userId) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-xl">
        Invalid or expired reset link.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1a1a1a] w-full max-w-md p-8 rounded-2xl shadow-2xl border border-[#00f5ff]/50"
      >
        <h2 className="text-white text-2xl font-bold mb-6 text-center">
          Reset Your Password
        </h2>

        {status === "success" ? (
          <div className="text-center text-green-400 text-lg">
            ✅ Password updated successfully!
            <br />
            <a href="/login" className="text-blue-400 underline">Login now</a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-[#00ffea] outline-none"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-[#00ffea] outline-none"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#00ffe0] to-[#0066ff] text-black font-semibold py-3 rounded-lg transition hover:opacity-90"
            >
              {status === "loading" ? "Saving..." : "Save Password"}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
