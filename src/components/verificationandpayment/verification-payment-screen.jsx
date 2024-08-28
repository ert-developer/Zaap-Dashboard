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
        <div className="card card1">
          <p className="card-heading" onClick={onClickVerification}>
            Verification
          </p>
        </div>
        <div className="card card2">
          <p className="card-heading" onClick={onClickPayment}>
            Payment
          </p>
        </div>
        <div className="card card3">
          <p className="card-heading" onClick={onClickCancelledJobs}>
            Cancelled Jobs
          </p>
        </div>
      </div>
      <div className="verification-payment-container">
        <div className="card card1">
          <p className="card-heading" onClick={onClickFeedback}>
            Feedback
          </p>
        </div>
        <div className="card card2">
          <p className="card-heading" onClick={onClickReports}>
            Reports
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationPaymentContainer;
