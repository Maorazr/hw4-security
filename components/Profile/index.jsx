import styles from "./styles.module.css";
import Layout from "../Layout/index";
import { useState, useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";
import ProfilePhoto from "./ProfilePhoto";

const ProfileCard = ({ label, value }) => (
  <div className="flex my-5 p-3 border-b border-gray-300 dark:border-gray-600 font-roboto text-xl">
    <div className={`font-bold text-gray-800 dark:text-white mr-2`}>
      {label}
    </div>
    <div className={`text-gray-600 dark:text-gray-400`}>{value}</div>
  </div>
);

const ProfilePage = (props) => {
  const { theme, setTheme } = useTheme();
  const user = props.user;
  const [profileImage, setProfileImage] = useState(user.profilePic);

  const handleProfileImageChange = (newImage) => {
    setProfileImage(newImage);
  };

  useEffect(() => {
    document.documentElement.classList.add(theme);
    return () => {
      document.documentElement.classList.remove(theme);
    };
  }, [theme]);

  return (
    <Layout user={user}>
      <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 xl:w-2/5 mx-auto bg-white dark:bg-neutral-800 p-8 rounded shadow-md">
        <ProfilePhoto
          user={user}
          onProfileImgChange={handleProfileImageChange}
        />
        <div className="mt-8">
          <ProfileCard label="Name:" value={user.name} />
          <ProfileCard label="Email:" value={user.email} />
          <ProfileCard label="Username:" value={user.username} />
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
