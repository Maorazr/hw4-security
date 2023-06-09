import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Form.module.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (response.ok) {
        router.push("/");
      }
      // After successful registration, you might want to redirect the user to the login page
      // using router.push('/login');
      if (!response.ok) {
        console.error(`Response: ${response.status} ${response.statusText}`);
        throw new Error("Response was not OK in register.js");
      }
    } catch (error) {
      // Handle error here
      console.error(error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
