import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export const useCustomSession = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookies = cookie.parse(document.cookie);
      const token = cookies.auth;
      if (token) {
        try {
          const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

          // Here you'd typically want to use only the payload data, not the entire decoded token.
          // Adjust this based on the shape of your JWT token
          setSession(decodedToken);
        } catch (error) {
          console.log(error);
        }
      }
      setLoading(false);
    }
  }, []);

  return [session, loading];
};
