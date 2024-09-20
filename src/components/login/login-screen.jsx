import { useState } from "react";
import { fireStoreDB } from "../../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./login-styles.css";
import { envConfig } from "../../assets/helpers/envApi";

const LoginScreen = ({ onLogin }) => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleUserEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handleUserPasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  const emailLogin = async () => {
    try {
      const userCredDocRef = doc(
        fireStoreDB,
        envConfig.Dashboard_users,
        "user_creds"
      );
      const userCredDoc = await getDoc(userCredDocRef);

      if (userCredDoc.exists()) {
        const data = userCredDoc.data();
        const userCreds = data.user_creds;

        const userExists = userCreds.some(
          (user) => user.email === userEmail && user.password === userPassword
        );

        if (userExists) {
          console.log("User successfully logged in");
          onLogin(); // Call onLogin to update state in App component
          navigate("/verification-payment");
        } else {
          alert("Invalid credentials, please try again.");
        }
      } else {
        alert("No user credentials found.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred while logging in.");
    }
  };

  return (
    <div className="login-main-container">
      <div className="login-container">
        <h2 className="login-heading">Login to your Dashboard</h2>
        <input
          type="text"
          placeholder="Email"
          className="login-text-input"
          value={userEmail}
          onChange={handleUserEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-text-input"
          value={userPassword}
          onChange={handleUserPasswordChange}
        />
        <button className="login-button" onClick={emailLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
