import React from "react";
import "./reports-styles.css";

const ReportsScreen = ({ reportDetails }) => {
  console.log(reportDetails);
  return (
    <div className="reports-container">
      <h2 className="reports-heading">Reports</h2>
      {reportDetails.map((report, index) => (
        <div key={index} className="report-card">
          <div className="report-header">
            <div className="report-info">
              <p className="report-name">
                <strong>Name:</strong> {report.reporterName}
              </p>
              <p className="report-email">
                <strong>Email:</strong> {report.reporterEmail}
              </p>
              <p className="report-title">
                <strong>Job Title:</strong> {report.jobTitle}
              </p>
              <p className="report-description">
                <strong>Job Description:</strong> {report.jobDescription}
              </p>
            </div>
            <div className="report-actions">
              <button className="report-button delete-button">Delete Job</button>
              <button className="report-button view-button">Remove Report</button>
            </div>
          </div>
          <p>
            <strong>Report Type:</strong>{" "}
            {report.reportType.map((type, i) => (
              <span key={i}>
                {type.reportValue} (Count: {type.count})
              </span>
            ))}
          </p>
          <p>
            <strong>Reported At:</strong>{" "}
            {new Date(report.reportedAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReportsScreen;
