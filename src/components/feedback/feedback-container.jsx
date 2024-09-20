import FeedbackScreen from "./feedback-screen";
import { fireStoreDB } from "../../firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import Home from "../Header/Home";

const FeedbackContainer = () => {
  const [feedbackDetails, setFeedbackDetails] = useState([]);

  ///get feedback details from firestore
  const getFeedbackDetails = async () => {
    const feedbackDetailsRef = collection(fireStoreDB, "feedback_dev");
    try {
      const feedbackDetailsSnapshot = await getDocs(feedbackDetailsRef);
      if (!feedbackDetailsSnapshot.empty) {
        const feedbackDetails = feedbackDetailsSnapshot.docs.map((doc) =>
          doc.data()
        );
        setFeedbackDetails(feedbackDetails);
      } else {
        console.log("No feedback documents found.");
        setFeedbackDetails([]); // Return an empty array if no documents are found
      }
    } catch (error) {
      console.log("Error fetching feedback details:", error);
      setFeedbackDetails([]); // Return an empty array or appropriate error handling
    }
  };

  useEffect(() => {
    getFeedbackDetails();
  }, []);

  return (
    <>
      <Home />
      <FeedbackScreen feedbackDetails={feedbackDetails} />
    </>
  );
};

export default FeedbackContainer;
