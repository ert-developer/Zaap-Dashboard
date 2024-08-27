import ReportsScreen from "./reports-screen";
import { fireStoreDB } from "../../firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

const ReportsContainer = () => {
  const [reportDetails, setReportDetails] = useState([]);

  ///get report details from firestore
  const getReportDetails = async () => {
    const reportDetailsRef = collection(fireStoreDB, "job_report_dev");
    try {
      const reportDetailsSnapshot = await getDocs(reportDetailsRef);
      if (!reportDetailsSnapshot.empty) {
        const reportDetails = reportDetailsSnapshot.docs.map((doc) =>
          doc.data()
        );
        setReportDetails(reportDetails);
      } else {
        console.log("No report documents found.");
        setReportDetails([]); // Return an empty array if no documents are found
      }
    } catch (error) {
      console.log("Error fetching report details:", error);
      setReportDetails([]); // Return an empty array or appropriate error handling
    }
  };

  useEffect(() => {
    getReportDetails();
  }, []);
  return <ReportsScreen reportDetails={reportDetails} />;
};

export default ReportsContainer;
