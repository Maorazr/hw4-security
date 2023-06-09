// hooks/useUser.js
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

export default function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      setUser(decodedToken);
    }
  }, []);

  return user;
}
