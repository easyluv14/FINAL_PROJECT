'use client'
import React, { useState } from "react";

export default function LoginModal({ isOpen, onClose }) {
  const [mode, setMode] = useState("login"); // "login" or "signup"

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full">
        {/* Toggle between Login and Sign Up */}
        <div className="flex justify-around mb-6">
          <button
            className={`px-4 py-2 font-semibold ${
              mode === "login" ? "border-b-2 border-black" : "text-gray-500"
            }`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 font-semibold ${
              mode === "signup" ? "border-b-2 border-black" : "text-gray-500"
            }`}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* Login Form */}
        {mode === "login" && (
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-3 p-2 border rounded"
            />
            <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
              Login
            </button>
          </div>
        )}

        {/* Sign Up Form */}
        {mode === "signup" && (
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Enter Code"
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full mb-3 p-2 border rounded"
            />
            <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
              Sign Up
            </button>

            {/* Social sign-up options */}
            <div className="mt-4 text-center text-sm text-gray-600">Or sign up with</div>
            <div className="flex justify-center gap-4 mt-2">
              <button className="border px-4 py-2 rounded hover:bg-gray-100">
                Gmail
              </button>
              <button className="border px-4 py-2 rounded hover:bg-gray-100">
                Yahoo
              </button>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 text-sm text-gray-500 hover:underline w-full text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

