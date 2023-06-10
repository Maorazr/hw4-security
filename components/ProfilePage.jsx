import styles from "./ProfilePage.module.css";
import Layout from "./Layout";
import { useState } from "react";
import Cookies from "js-cookie";
import { useTheme } from "../hooks/useTheme";

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
  const [selectedFile, setSelectedFile] = useState();
  const [profileImage, setProfileImage] = useState(user.profilePic);
  const [selceted, setSelected] = useState(false);
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setSelected(true);
  };
  const handleDiscard = () => {
    setSelectedFile("");
    setSelected(false);
  };
  const handleSubmit = async (e) => {
    setSelected(false);
    e.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const token = Cookies.get("auth");

      const response = await fetch("/api/uploadImage", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setProfileImage(data.url);
        console.log("Uploaded image URL:", data.url);
      } else {
        console.error("Upload failed:", await response.text());
      }
    } else {
    }
  };

  return (
    <Layout user={user}>
      <div className={styles.profilePageContainer}>
        <img src={profileImage} className={styles.profilePicture} />
        <form className={styles.form} onSubmit={handleSubmit}>
          {!selceted && (
            <label className={styles.label2} style={profileStyles}>
              Edit
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={styles.input}
              />
            </label>
          )}
          {selceted && (
            <button className={styles.button} type="submit">
              Update Photo
            </button>
          )}
          {selceted && (
            <button className={styles.button} onClick={handleDiscard}>
              {" "}
              Discard{" "}
            </button>
          )}
        </form>
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
