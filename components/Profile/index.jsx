import styles from "./styles.module.css";
import Layout from "../Layout/index";
import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import ProfilePhoto from "./ProfilePhoto";

const ProfileCard = ({ label, value, profileStyles }) => (
  <div className={styles.profileCard}>
    <div className={styles.label} style={{ ...profileStyles }}>
      {label}
    </div>
    <div className={styles.value} style={{ ...profileStyles }}>
      {value}
    </div>
  </div>
);

const ProfilePage = (props) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const profileStyles = {
    color: isDark ? "white" : "black",
  };
  const user = props.user;
  const [profileImage, setProfileImage] = useState(user.profilePic);

  const handleProifleImageChange = (newImage) => {
    setProfileImage(newImage);
  };

  return (
    <Layout user={user}>
      <div className={styles.profilePageContainer}>
        <ProfilePhoto
          user={user}
          onProfileImgChange={handleProifleImageChange}
        />
        <ProfileCard
          label="Name:"
          value={user.name}
          profileStyles={profileStyles}
        />
        <ProfileCard
          label="Email:"
          value={user.email}
          profileStyles={profileStyles}
        />
        <ProfileCard
          label="Username:"
          value={user.username}
          profileStyles={profileStyles}
        />
      </div>
    </Layout>
  );
};

export default ProfilePage;
