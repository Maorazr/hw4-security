import Cookies from "js-cookie";

const fetchUser = async () => {
  try {
    const token = Cookies.get("auth");
    const response = await fetch("/api/auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Failed to fetch user", error);
    return null;
  }
};

export default fetchUser;
