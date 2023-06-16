import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Form.module.css";

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
    <div className={styles.formContainer}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.formInput}
        />
        <input
          type="text"
          placeholder="userName"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className={styles.formInput}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.formInput}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.formInput}
        />
        <button type="submit" className={styles.formButton}>
          Register
        </button>
      </form>
    </div>
  );
}
