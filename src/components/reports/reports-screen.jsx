import React from "react";
import "./reports-styles.css";

const ReportsScreen = ({ reportDetails }) => {
  return (
    <div className="reports-container">
      <h2 className="reports-heading">Reports</h2>
      {reportDetails.map((report, index) => (
        <div key={index} className="report-card">
          <div className="report-header">
            <p className="report-name">
              <strong>Name:</strong> {report.reporterName}
            </p>
            <p className="report-email">
              <strong>Email:</strong> {report.reporterEmail}
            </p>
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
