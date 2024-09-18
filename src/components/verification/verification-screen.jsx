import "./verification-styles.css";
import { fireStoreDB } from "../../firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getServiceProviderDetailsActions } from "../../redux/actions/serviceproviderverificationactions/verifications-actions";
import { useDispatch } from "react-redux";
import VerifiedScreen from "../verified/verified-screen";
import RejectedScreen from "../rejected/rejected-screen";
import ProgressScreen from "../inprogress/inprogress-screen";
import UpdatebankScreen from "../updatebankdetails/updatebankdetails-screen";
import UpdategovtidScreen from "../updategovtid/updategovtiddetails-screen";
import PreviousValuesScreen from "../previous/previousValues-screen";
import moment from "moment";
import { envConfig } from "../../assets/helpers/envApi";

const VerificationScreen = () => {
  const dispatch = useDispatch();
  const [activeNav, setActiveNav] = useState("verified");

  const getSortedList = (resultList) => {
    const sortedDataList = resultList.sort((a, b) => {
      let dateA = new Date(a.createdDate);
      let dateB = new Date(b.createdDate);
      return dateB - dateA;
    });

    return sortedDataList;
  };

  useEffect(() => {
    const getDataFromFireStoreProviderDev = async () => {
      const providerDevData = await getDocs(
        collection(fireStoreDB, envConfig.Provider)
      );

      const result = providerDevData.docs.map((docs) => {
        const DOB = docs.data().date_of_birth;

        let formattedDate = "N/A";

        // Check if DOB is a Firestore Timestamp
        if (DOB && DOB.seconds) {
          const date = new Date(DOB.seconds * 1000); // Convert Timestamp to Date
          const day = ("0" + date.getDate()).slice(-2);
          const month = ("0" + (date.getMonth() + 1)).slice(-2);
          const year = date.getFullYear();
          formattedDate = `${day}/${month}/${year}`; // Format as DD/MM/YYYY
        }
        // Check if DOB is a string in YYYY-MM-DD format
        else if (typeof DOB === "string") {
          formattedDate = moment(DOB).format("DD/MM/YYYY"); // Convert to DD/MM/YYYY format
        }

        const dateOnCreate = docs.data().createdOn;

        const momentDate = moment(dateOnCreate);
        const dateFormate = momentDate.format("YYYY-MM-DD HH:mm:ss");

        console.log("idexpedate", docs.data().id_expiration_date);

        return {
          createdDate: dateFormate,
          id: docs.id,
          nameOnTheId: docs.data().legal_name_on_id,
          phoneNo: docs.data().phone_number,
          emailId: docs.data().email_id,
          bankName: docs.data().bank_name,
          accountHolderName: docs.data().account_holder_name,
          accountNumber: docs.data().account_number,
          accountType: docs.data().account_type,
          // bankTransitNumber: docs.data().bank_transit_number,
          // institutionNumber: docs.data().institution_number,
          ifsc_code: docs.data().ifsc_code,
          typeOfGovtIssueId: docs.data().id_type,
          // documentName: docs.data().id_category,
          docsIdNumber: docs.data().id_number,
          idExpirationDate: docs.data().id_expiration_date,
          dateOfBirth: formattedDate,
          verificationStatus: docs.data().isverified,
          personalPhoto: docs.data()?.personal_photo
            ? docs.data()?.personal_photo[0]
            : docs.data()?.imageURL,
          IdFrontImage: docs.data().front[0],
          IdBackImage: docs.data().back[0],
        };
      });

      const sortListBasedOnCreatedDateLIFO = getSortedList(result);

      dispatch(
        getServiceProviderDetailsActions(sortListBasedOnCreatedDateLIFO)
      );
    };
    getDataFromFireStoreProviderDev();
  }, [dispatch]);

  return (
    <div>
      <nav className="navigation-container">
        <p
          // className="nav-link"
          className={`nav-link ${activeNav === "verified" && "active"}`}
          onClick={() => setActiveNav("verified")}
        >
          Verified
        </p>
        <p
          className={`nav-link ${activeNav === "rejected" && "active"}`}
          onClick={() => setActiveNav("rejected")}
        >
          Rejected
        </p>
        <p
          className={`nav-link ${activeNav === "inprogress" && "active"}`}
          onClick={() => setActiveNav("inprogress")}
        >
          Inprogress
        </p>
        <p
          className={`nav-link ${
            activeNav === "updatebankdetails" && "active"
          }`}
          onClick={() => setActiveNav("updatebankdetails")}
        >
          Update Bank Details
        </p>
        <p
          className={`nav-link ${activeNav === "updategovtid" && "active"}`}
          onClick={() => setActiveNav("updategovtid")}
        >
          Update Govt Id
        </p>
        <p
          className={`nav-link ${activeNav === "previous" && "active"}`}
          onClick={() => setActiveNav("previous")}
        >
          Previous Values
        </p>
      </nav>
      <div>
        {activeNav === "verified" && <VerifiedScreen />}
        {activeNav === "rejected" && <RejectedScreen />}
        {activeNav === "inprogress" && <ProgressScreen />}
        {activeNav === "updatebankdetails" && <UpdatebankScreen />}
        {activeNav === "updategovtid" && <UpdategovtidScreen />}
        {activeNav === "previous" && <PreviousValuesScreen />}
      </div>
    </div>
  );
};

export default VerificationScreen;
