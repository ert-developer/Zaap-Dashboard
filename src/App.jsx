import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginScreen from "./components/login/login-screen";
import VerificationPaymentContainer from "./components/verificationandpayment/verification-payment-container";
import VerificationContainer from "./components/verification/verification-container";
import CustomerPaymentScreen from "./components/customerpayment/customer-payment-screen";
import FeedbackContainer from "./components/feedback/feedback-container";
import ReportsContainer from "./components/reports/reports-container";
import CancelledJobsScreen from "./components/cancelledjobs/CancelledJobsScreen";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check localStorage for login status
    return localStorage.getItem("isLoggedIn") === "true";
  });

  useEffect(() => {
    // Update localStorage when isLoggedIn changes
    localStorage.setItem("isLoggedIn", isLoggedIn ? "true" : "false");
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/" element={<LoginScreen onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route
              path="/verification-payment"
              element={<VerificationPaymentContainer onLogout={handleLogout} />}
            />
            <Route path="/verification" element={<VerificationContainer />} />
            <Route
              path="/customer-payment"
              element={<CustomerPaymentScreen />}
            />
            <Route path="/feedback" element={<FeedbackContainer />} />
            <Route path="/reports" element={<ReportsContainer />} />
            <Route path="/cancelled-jobs" element={<CancelledJobsScreen />} />
            <Route path="*" element={<Navigate to="/verification-payment" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
