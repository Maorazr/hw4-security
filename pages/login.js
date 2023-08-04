import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout/index";

export default function Login() {
  const router = useRouter();
  const [userNameOrEmail, setUserNameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userNameOrEmail || !password) {
      alert("All fields are required.");
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userNameOrEmail, password }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      throw new Error("Response was not OK");
      console.error(error);
    }
  };

  return (
    <Layout>
      <div
        className="flex items-center justify-center "
        style={{ height: "calc(100vh - 6.7rem)" }}
      >
        <div className="w-full max-w-md p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="usernameOrEmail" className="block mb-1">
              Username or Email
            </label>
            <input
              type="text"
              id="usernameOrEmail"
              placeholder="Username or Email"
              value={userNameOrEmail}
              onChange={(e) => setUserNameOrEmail(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 dark:text-gray-900"
            />
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 dark:text-gray-900"
            />
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
