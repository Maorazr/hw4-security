import styles from "./styles.module.css";
import { useState, useRef } from "react";
import Cookies from "js-cookie";

const ProfilePhoto = (props) => {
  const fileInputRef = useRef();
  const [selectedFile, setSelectedFile] = useState();
  const [selected, setSelected] = useState(false);
  const [profileImage, setProfileImage] = useState(props.user.profilePic);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setSelected(true);
  };

  const onImageClick = () => {
    fileInputRef.current.click();
  };

  const handleDiscard = () => {
    setSelectedFile("");
    setSelected(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSelected(false);
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
    <div>
      <div className={styles.profilePictureContainer} onClick={onImageClick}>
        <img
          testId="profileImg"
          src={profileImage}
          className={`profilePicture ${styles.profilePicture}`}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.input}
          ref={fileInputRef}
          testId="fileInput"
          style={{ display: "none" }}
        />
        {!selected && <span className={styles.label2}>Edit</span>}
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        {selected && (
          <button testId="updatePhoto" className={styles.button} type="submit">
            Update Photo
          </button>
        )}
        {selected && (
          <button
            testId="discard"
            className={styles.button}
            onClick={handleDiscard}
          >
            {" "}
            Discard{" "}
          </button>
        )}
      </form>
    </div>
  );
};

export default ProfilePhoto;
