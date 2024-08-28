// NavBar.jsx
import React, { useState } from "react";
import PaymentCompletedScreen from "../paymentcompleted/paymentcompleted-screen";
import AdsPaymentScreen from "../adspayment/ads-payment-screen";
import CancelledJobsScreen from "../cancelledjobs/CancelledJobsScreen";
import "./payment-styles.css"; // Assuming you have this CSS file for styling

const PaymentScreen = () => {
  // State to keep track of the active screen
  const [activeScreen, setActiveScreen] = useState("paymentCompleted");

  // Function to render the active screen
  const renderScreen = () => {
    switch (activeScreen) {
      case "paymentCompleted":
        return <PaymentCompletedScreen />;
      case "adsPayment":
        return <AdsPaymentScreen />;
      case "cancelledJobs":
        return <CancelledJobsScreen />;
      default:
        return <PaymentCompletedScreen />;
    }
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <button
          className={`nav-item ${
            activeScreen === "paymentCompleted" ? "active" : ""
          }`}
          onClick={() => setActiveScreen("paymentCompleted")}
        >
          Payment Completed
        </button>
        <button
          className={`nav-item ${activeScreen === "adsPayment" ? "active" : ""}`}
          onClick={() => setActiveScreen("adsPayment")}
        >
          Ads Payment
        </button>
        <button
          className={`nav-item ${
            activeScreen === "cancelledJobs" ? "active" : ""
          }`}
          onClick={() => setActiveScreen("cancelledJobs")}
        >
          Cancelled Jobs
        </button>
      </div>
      <div className="screen-container">{renderScreen()}</div>
    </div>
  );
};

export default PaymentScreen;
