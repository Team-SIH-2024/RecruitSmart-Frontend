import React, { useState } from "react";
import styles from "./Profile.module.css"; // Separate CSS for Profile

const Profile = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <div className={styles.profile}>
      <h1>Profile</h1>
      <form onSubmit={handleUpdateProfile} className={styles.profileForm}>
        <div className={styles.formGroup}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
