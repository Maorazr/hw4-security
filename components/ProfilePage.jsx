import styles from "./ProfilePage.module.css";
import Layout from "./Layout";
import { useState } from "react";
import Cookies from "js-cookie";

const ProfileCard = ({ label, value }) => (
  <div className={styles.profileCard}>
    <div className={styles.label}>{label}</div>
    <div className={styles.value}>{value}</div>
  </div>
);

const ProfilePage = (props) => {
  const user = props.user;
  const [selectedFile, setSelectedFile] = useState();
  const [profileImage, setProfileImage] = useState(user.profilePic);
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    console.log(user);
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
        <h1>Profile</h1>
        <img
          src={profileImage}
          alt="Profile"
          className={styles.profilePicture}
        />
        <ProfileCard label="Name" value={user.name} />
        <ProfileCard label="Email" value={user.email} />
        <ProfileCard label="Username" value={user.username} />

        <form onSubmit={handleSubmit}>
          <label className={styles.label2}>
            Edit Profile Picture
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={styles.input}
            />
          </label>
          <button className={styles.button} type="submit">
            Update Profile
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ProfilePage;
