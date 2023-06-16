import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Form.module.css";

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
    <div className={styles.formContainer}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="usernameOrEmail">Username or Email</label>
        <input
          type="text"
          id="usernameOrEmail"
          placeholder="Username or Email"
          value={userNameOrEmail}
          onChange={(e) => setUserNameOrEmail(e.target.value)}
          className={styles.formInput}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.formInput}
        />
        <button type="submit" className={styles.formButton}>
          Login
        </button>
      </form>
    </div>
  );
}
