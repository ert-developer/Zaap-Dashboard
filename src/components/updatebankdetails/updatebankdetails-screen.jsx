import React, { useState, useEffect } from "react";
import { fireStoreDB } from "../../firebase/firebase-config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import "./updatebankdetails-styles.css";
import { envConfig } from "../../assets/helpers/envApi";

const UpdatebankScreen = () => {
  const [bankDetails, setBankDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBankDetails = async () => {
    const bankDetailsRef = collection(fireStoreDB, envConfig.updateBankDetails);
    try {
      const bankDetailsSnapshot = await getDocs(bankDetailsRef);
      if (!bankDetailsSnapshot.empty) {
        const bankDetailsList = bankDetailsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBankDetails(bankDetailsList);
      } else {
        console.log("No bank details found.");
      }
    } catch (error) {
      console.log("Error fetching bank details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBankDetails();
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
          account_holder_name: providerData.account_holder_name,
          account_number: providerData.account_number,
          account_type: providerData.account_type,
          bank_name: providerData.bank_name,
          //   bank_transit_number: providerData.bank_transit_number,
          //   institution_number: providerData.institution_number,
          ifsc_code: providerData.ifsc_code,
        };

        const updatedPreviousArray = providerData.previous || [];
        updatedPreviousArray.push(previousValues);

        await updateDoc(providerDocRef, {
          account_holder_name: detail.account_holder_name,
          account_number: detail.account_number,
          account_type: detail.account_type,
          bank_name: detail.bank_name,
          //   bank_transit_number: detail.bank_transit_number,
          //   institution_number: detail.institution_number,
          ifsc_code: detail.ifsc_code,
          previous: updatedPreviousArray,
        });

        await deleteDoc(
          doc(fireStoreDB, envConfig.updateBankDetails, detail.id)
        );

        setBankDetails((prevDetails) =>
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
      await deleteDoc(doc(fireStoreDB, envConfig.updateBankDetails, detail.id));

      setBankDetails((prevDetails) =>
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
            <th>Account Holder Name</th>
            <th>Account Number</th>
            <th>Account Type</th>
            <th>Bank Name</th>
            {/* <th>Bank Transit Number</th>
                        <th>Institution Number</th> */}
            <th>IFSC code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bankDetails.map((detail, index) => (
            <tr key={index}>
              <td>{detail.account_holder_name}</td>
              <td>{detail.account_number}</td>
              <td>{detail.account_type}</td>
              <td>{detail.bank_name}</td>
              {/* <td>{detail.bank_transit_number}</td>
              <td>{detail.institution_number}</td> */}
              <td>{detail.ifsc_code}</td>
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

export default UpdatebankScreen;
