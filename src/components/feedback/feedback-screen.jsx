import React from "react";
import "./feedback-styles.css";
import { mailSenter } from "../../utils/nodemailer/mailSend";

const FeedbackScreen = ({ feedbackDetails }) => {
  return (
    <div className="feedback-container">
      <h2 className="feedback-heading">Feedback</h2>
      {feedbackDetails.map((feedback, index) => (
        <div key={index} className="feedback-card">
          <div className="feedback-header">
            <p className="feedback-name">
              <strong>Name:</strong> {feedback.name}
            </p>
            <p className="feedback-email">
              <strong>Email:</strong> {feedback.email}
            </p>
          </div>
          <p>
            <strong>Feedback:</strong> {feedback.feedback}
          </p>
        </div>
      ))}
      <button onClick={mailSenter}>Mail Send</button>
    </div>
  );
};

export default FeedbackScreen;
