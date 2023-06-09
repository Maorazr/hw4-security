import { useState, useEffect } from "react";
import fetchUser from "../helpers/fetchUser";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser()
      .then((fetchedUser) => {
        setUser(fetchedUser);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch user", error);

        setLoading(false);
      });
  }, []);

  return { user, loading };
};
