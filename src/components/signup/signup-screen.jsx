import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, fireStoreDB as db } from "../../firebase/firebase-config"; // Ensure Firestore is initialized
import { envConfig } from "../../assets/helpers/envApi";

const SignUpScreen = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleUserEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handleUserPasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const emailSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: userName });

      // Add user data to Firestore in the Dashboard_users collection
      await setDoc(doc(db, envConfig.Dashboard_users, user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: userName,
        createdAt: new Date(),
      });

      console.log("User Successfully Registered", user);
      navigate("/dashboard"); // Redirect to dashboard after registration
    } catch (error) {
      console.log("This is Registration error :", error);
    }
  };

  return (
    <div className="signup-main-container">
      <div className="signup-container">
        <h2 className="signup-heading">Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          className="signup-text-input"
          value={userName}
          onChange={handleUserNameChange}
        />
        <input
          type="text"
          placeholder="Email"
          className="signup-text-input"
          value={userEmail}
          onChange={handleUserEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="signup-text-input"
          value={userPassword}
          onChange={handleUserPasswordChange}
        />
        <button className="signup-button" onClick={emailSignUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUpScreen;
