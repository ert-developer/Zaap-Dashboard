import React, { useState, useEffect } from "react";
import { fireStoreDB } from "../../firebase/firebase-config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import "../inprogress/inprogress-styles.css";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { envConfig } from "../../assets/helpers/envApi";

const UpdateGovtIdScreen = () => {
  const [govtIdDetails, setGovtIdDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const getGovtIdDetails = async () => {
    const govtIdDetailsRef = collection(
      fireStoreDB,
      envConfig.updateGovtIdDetails
    );
    try {
      const govtIdDetailsSnapshot = await getDocs(govtIdDetailsRef);
      if (!govtIdDetailsSnapshot.empty) {
        const govtIdDetailsList = govtIdDetailsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGovtIdDetails(govtIdDetailsList);
      } else {
        console.log("No government ID details found.");
      }
    } catch (error) {
      console.log("Error fetching government ID details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGovtIdDetails();
  }, []);

  const handleAccept = async (detail) => {
    try {
      const providerRef = collection(fireStoreDB, envConfig.Provider);
      const providerSnapshot = await getDocs(providerRef);

      const providerDoc = providerSnapshot.docs.find(
        (doc) => doc.data().provider_id === detail.id
      );

      if (providerDoc) {
        const providerDocRef = doc(
          fireStoreDB,
          envConfig.Provider,
          providerDoc.id
        );
        const providerData = providerDoc.data();

        const previousValues = {
          // id_category: providerData.id_category,
          id_type: providerData.id_type,
          id_number: providerData.id_number,
          date_of_birth: providerData.date_of_birth,
          id_expiration_date: providerData.id_expiration_date,
          personal_photo: providerData.personal_photo
            ? providerData.personal_photo[0]
            : providerData.imageURL,
          front: providerData.front,
          back: providerData.back,
        };

        const updatedPreviousArray = providerData.previous || [];
        updatedPreviousArray.push(previousValues);

        await updateDoc(providerDocRef, {
          //   id_category: detail.id_category,
          id_type: detail.id_type,
          id_number: detail.id_number,
          date_of_birth: detail.date_of_birth,
          id_expiration_date: detail.id_expiration_date,
          personal_photo: [detail.personal_photo[0]],
          front: detail.front,
          back: detail.back,
          previous: updatedPreviousArray,
        });

        await deleteDoc(
          doc(fireStoreDB, envConfig.updateGovtIdDetails, detail.id)
        );

        setGovtIdDetails((prevDetails) =>
          prevDetails.filter((d) => d.id !== detail.id)
        );

        console.log(`Document for provider ${providerDoc.id} accepted.`);
      } else {
        console.log(`No provider document found for provider_id ${detail.id}.`);
      }
    } catch (error) {
      console.log("Error accepting document:", error);
    }
  };

  const handleReject = async (detail) => {
    try {
      await deleteDoc(
        doc(fireStoreDB, envConfig.updateGovtIdDetails, detail.id)
      );

      setGovtIdDetails((prevDetails) =>
        prevDetails.filter((d) => d.id !== detail.id)
      );

      console.log(`Document for provider ${detail.id} rejected.`);
    } catch (error) {
      console.log("Error rejecting document:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="inprogress-container">
      <table className="inprogress-table">
        <thead>
          <tr>
            {/* <th>ID Category</th> */}
            <th>ID Type</th>
            <th>ID Number</th>
            <th>Date of Birth</th>
            <th>ID Expiration Date</th>
            <th>Personal Photo</th>
            <th>ID Front Image</th>
            <th>ID Back Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {govtIdDetails.map((detail, index) => (
            <tr key={index}>
              {/* <td>{detail.id_category}</td> */}
              <td>{detail.id_type}</td>
              <td>{detail.id_number}</td>
              <td>
                {new Date(
                  detail.date_of_birth.seconds * 1000
                ).toLocaleDateString()}
              </td>
              <td>{detail.id_expiration_date}</td>
              <td>
                <Zoom>
                  <img
                    src={detail.personal_photo[0]}
                    className="verified-profile-image"
                    alt="Personal Photo"
                  />
                </Zoom>
              </td>
              <td>
                <Zoom>
                  <img
                    src={detail.front[0]}
                    className="verified-id-front-image"
                    alt="ID Front Image"
                  />
                </Zoom>
              </td>
              <td>
                <Zoom>
                  <img
                    src={detail.back[0]}
                    className="verified-id-back-image"
                    alt="ID Back Image"
                  />
                </Zoom>
              </td>
              <td>
                {detail.status === "accepted" ? (
                  "Accepted"
                ) : detail.status === "rejected" ? (
                  "Rejected"
                ) : (
                  <>
                    <button
                      className="accept-button"
                      onClick={() => handleAccept(detail)}
                      disabled={
                        detail.status === "accepted" ||
                        detail.status === "rejected"
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="reject-button"
                      onClick={() => handleReject(detail)}
                      disabled={
                        detail.status === "accepted" ||
                        detail.status === "rejected"
                      }
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpdateGovtIdScreen;
