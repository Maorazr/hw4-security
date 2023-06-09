import styles from "./ProfilePage.module.css";
import Layout from "./Layout";
import { useState } from "react";

const ProfileCard = ({ label, value }) => (
  <div className={styles.profileCard}>
    <div className={styles.label}>{label}</div>
    <div className={styles.value}>{value}</div>
  </div>
);

const ProfilePage = (props) => {
  const user = props.user;
  const [selectedFile, setSelectedFile] = useState();
  const [profileImage, setProfileImage] = useState(user.profileImage || "");
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/api/uploadImage", {
        method: "POST",
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
        <ProfileCard label="Name" value={user.name} />
        <ProfileCard label="Email" value={user.email} />
        <ProfileCard label="Username" value={user.username} />
        {profileImage && <img src={profileImage} alt="Profile" />}
        <form onSubmit={handleSubmit}>
          <label>
            Profile Picture:
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </Layout>
  );
};

export default ProfilePage;
