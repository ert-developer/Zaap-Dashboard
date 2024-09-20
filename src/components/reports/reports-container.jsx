import ReportsScreen from "./reports-screen";
import { fireStoreDB } from "../../firebase/firebase-config";
import { collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import Home from "../Header/Home";
import { envConfig } from "../../assets/helpers/envApi";

const ReportsContainer = () => {
  const [reportDetails, setReportDetails] = useState([]);

  const getReportDetails = async () => {
    const reportDetailsRef = collection(fireStoreDB, envConfig.job_reports);
    try {
      const reportDetailsSnapshot = await getDocs(reportDetailsRef);
      if (!reportDetailsSnapshot.empty) {
        const reportDetails = reportDetailsSnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .sort((a, b) => new Date(b.reportedAt) - new Date(a.reportedAt)); // Sorting by reportedAt
        setReportDetails(reportDetails);
      } else {
        console.log("No report documents found.");
        setReportDetails([]);
      }
    } catch (error) {
      console.log("Error fetching report details:", error);
      setReportDetails([]);
    }
  };

  // Remove report by document ID
  const removeReport = async (reportId) => {
    try {
      const reportDocRef = doc(fireStoreDB, "job_report_dev", reportId);
      await deleteDoc(reportDocRef);
      setReportDetails((prevDetails) =>
        prevDetails.filter((report) => report.id !== reportId)
      );
      console.log("Report successfully deleted");
    } catch (error) {
      console.log("Error deleting report:", error);
    }
  };

  // Remove job from all relevant collections
  const removeJobFromAllCollections = async (jobTitle) => {
    try {
      const collectionsToDeleteFrom = [
        { collectionName: "Jobs_dev", field: "jobTitle" },
        { collectionName: "SelectedJobs_dev", field: "jobTitle" },
        { collectionName: "selectedProfiles_dev", field: "jobTitle" },
        { collectionName: "AppliedJobs_dev", field: "jobTitle" },
      ];

      for (const collectionInfo of collectionsToDeleteFrom) {
        const { collectionName, field } = collectionInfo;
        const jobQuery = query(
          collection(fireStoreDB, collectionName),
          where(field, "==", jobTitle)
        );
        const jobSnapshot = await getDocs(jobQuery);

        jobSnapshot.forEach(async (docSnapshot) => {
          await deleteDoc(doc(fireStoreDB, collectionName, docSnapshot.id));
        });
      }

      console.log(`Job "${jobTitle}" successfully removed from all collections.`);
    } catch (error) {
      console.error("Error deleting job from collections:", error);
    }
  };

  // Handle delete job button click
  const handleDeleteJob = async (jobTitle, reportId) => {
    // First, remove job from all collections
    await removeJobFromAllCollections(jobTitle);
    // Then remove the report associated with the job
    await removeReport(reportId);
  };

  useEffect(() => {
    getReportDetails();
  }, []);

  return (
    <>
      <Home />
      <ReportsScreen
        reportDetails={reportDetails}
        removeReport={removeReport}
        deleteJob={handleDeleteJob} // Pass down the deleteJob handler
      />
    </>
  );
};

export default ReportsContainer;
