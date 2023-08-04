import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Form.module.css";
import Layout from "../components/Layout/index";

const FormInput = ({ label, type, placeholder, value, setValue }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
      <label htmlFor={label} className="font-medium text-right sm:text-left">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border rounded-lg p-2 dark:text-gray-900"
      />
    </div>
  );
};

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !username || !email || !password) {
      alert("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email address.");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, email, password }),
      });
      if (response.ok) {
        router.push("/");
      } else {
        const data = await response.json();
        alert(data.message);
        // console.error(`Response: ${response.status} ${response.statusText}`);
        // throw new Error("Response was not OK in register.js");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Layout>
      <div
        className="flex items-center justify-center"
        style={{ height: "calc(100vh - 6.7rem)" }}
      >
        <div className="w-full max-w-md p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-lg">
          <h2
            testId="h2Register"
            className="text-2xl font-bold text-center mb-4"
          >
            Register
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 ">
            <FormInput
              label="Name"
              type="text"
              placeholder="Name"
              value={name}
              setValue={setName}
            />
            <FormInput
              label="Username"
              type="text"
              placeholder="Username"
              value={username}
              setValue={setUserName}
            />
            <FormInput
              label="Email"
              type="email"
              placeholder="Email"
              value={email}
              setValue={setEmail}
            />
            <FormInput
              label="Password"
              type="password"
              placeholder="Password"
              value={password}
              setValue={setPassword}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 col-span-full sm:col-span-2"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
