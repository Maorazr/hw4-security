import { useAuth } from "../hooks/useAuth";
import styles from "../styles/Profile.module.css";
import ProfilePage from "../components/ProfilePage";
const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Error: User not found</div>; // Update with your error handling UI
  }

  return <ProfilePage user={user} />;
};

export default Profile;
