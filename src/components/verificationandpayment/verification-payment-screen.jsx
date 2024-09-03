import "./verification-payment-styles.css";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";

const VerificationPaymentContainer = ({ onLogout }) => {
  const navigate = useNavigate();

  const onClickVerification = () => {
    navigate("/verification");
  };

  const onClickFeedback = () => {
    navigate("/feedback");
  };

  const onClickReports = () => {
    navigate("/reports");
  };

  const onClickPayment = () => {
    navigate("/payment");
  };

  const onClickCancelledJobs = () => {
    navigate("/cancelled-jobs");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User successfully logged out");
      localStorage.removeItem("isLoggedIn");
      if (onLogout) onLogout();
      navigate("/", { replace: true });
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred while logging out.");
    }
  };

  return (
    <div className="verification-payment-main-container">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <div className="verification-payment-container">
        <div className="card card1" onClick={onClickVerification}>
          <p className="card-heading">Verification</p>
        </div>
        <div className="card card2" onClick={onClickPayment}>
          <p className="card-heading">Payment</p>
        </div>
        <div className="card card3" onClick={onClickCancelledJobs}>
          <p className="card-heading">Cancelled Jobs</p>
        </div>
      </div>
      <div className="verification-payment-container">
        <div className="card card1" onClick={onClickFeedback}>
          <p className="card-heading">Feedback</p>
        </div>
        <div className="card card2" onClick={onClickReports}>
          <p className="card-heading">Reports</p>
        </div>
      </div>
    </div>
  );
};

export default VerificationPaymentContainer;
