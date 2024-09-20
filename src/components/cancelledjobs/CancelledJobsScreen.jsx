import React, { useEffect, useState } from "react";
import { fireStoreDB } from "../../firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import "./CancelledJobsScreen.css";
import Home from "../Header/Home";

const CancelledJobsScreen = () => {
  const [cancelledJobs, setCancelledJobs] = useState([]);

  useEffect(() => {
    const fetchCancelledJobs = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(fireStoreDB, "CancelJobs_dev")
        );
        const jobsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCancelledJobs(jobsData);
      } catch (error) {
        console.error("Error fetching cancelled jobs: ", error);
      }
    };

    fetchCancelledJobs();
  }, []);

  return (
    <>
      <Home />
    <div className="cancelled-jobs-container">
      <h1>Cancelled Jobs</h1>
      <table className="cancelled-jobs-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Customer Email</th>
            <th>Job Title</th>
            <th>Job Description</th>
            <th>Cancellation Time</th>
            <th>Original Date</th>
            <th>Original Time</th>
            <th>Salary</th>
            <th>Cancellation Charge</th>
            <th>Total Amount</th>
            <th>Difference in Hours</th>
            <th>Service Provider Name</th>
          </tr>
        </thead>
        <tbody>
          {cancelledJobs.map((job) => (
            <tr key={job.id}>
              <td>{job.customerName}</td>
              <td>{job.customerEmail}</td>
              <td>{job.jobTitle}</td>
              <td>{job.jobDescription}</td>
              <td>{new Date(job.CancelledTime).toLocaleString()}</td>
              <td>{job.originalDate}</td>
              <td>{job.originalTime}</td>
              <td>{job.salary}</td>
              <td>{job.cancellationCharge}</td>
              <td>{job.totalAmount}</td>
              <td>{job.differenceInHours}</td>
              <td>{job.serviceProviderName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default CancelledJobsScreen;
