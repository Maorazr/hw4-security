import styles from "./ProfilePage.module.css";
import Layout from "./Layout";

const ProfileCard = ({ label, value }) => (
  <div className={styles.profileCard}>
    <div className={styles.label}>{label}</div>
    <div className={styles.value}>{value}</div>
  </div>
);

const ProfilePage = (props) => {
  const user = props.user;

  return (
    <Layout user={user}>
      <div className={styles.profilePageContainer}>
        <h1>Profile</h1>
        <ProfileCard label="Name" value={user.name} />
        <ProfileCard label="Email" value={user.email} />
        <ProfileCard label="Username" value={user.username} />
      </div>
    </Layout>
  );
};

export default ProfilePage;
