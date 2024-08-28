import { useSelector } from "react-redux";
import { fireStoreDB } from "../../firebase/firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import PopupModal from "../../atoms/popupmodal/pop-up-modal";
import { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "./inprogress-styles.css";
import { mailSenter } from "../../utils/nodemailer/mailSend";

const ProgressScreen = () => {
  const [showPopup, setShowPopup] = useState(false);

  const progressList = useSelector(
    (state) => state.verificationReducer.verificationList
  );

  const updateProviderVerificationStatus = async (userId, email) => {
    const selectedVerificationStatus = document.querySelector(
      'input[name="verificationStatus"]:checked'
    );
    if (selectedVerificationStatus) {
      const verificationValue = selectedVerificationStatus.value;

      const subject = "Zaap - Service Provider Verification status";
      const textMsg =
        verificationValue === "verified"
          ? "Congratulations your Zaap account has verified successfully. Now you can login to your account and start your services"
          : "Your Zaap account verification failed because the provided details was not meet the requirements of the service provider";
      const bodyText =
        verificationValue === "verified"
          ? "Congratulations your Zaap account has verified successfully. Now you can login to your account and start your services"
          : "Your Zaap account verification failed because the provided details was not meet the requirements of the service provider";

      mailSenter(email, subject, textMsg, bodyText);
      const userDocRef = doc(fireStoreDB, "Provider_dev", userId);
      try {
        const userRef = await updateDoc(userDocRef, {
          isverified: verificationValue,
        });
        setShowPopup(true);
      } catch (error) {
        console.log("This is Update Verify Status Error :", error);
      }
    }
  };

  return (
    <div>
      {showPopup && (
        <PopupModal
          setShowPopup={setShowPopup}
          message="User Details Verification Successfully"
        />
      )}
      <div className="verified-main-container">
        <div className="verified-headings-container">
          <p className="verified-title inprogress-serial-no">S.No</p>
          <p className="verified-title inprogress-name">Name</p>
          <p className="verified-title inprogress-user-phone-no">
            Phone Number
          </p>
          <p className="verified-title inprogress-email-address">Email</p>
          <p className="verified-title inprogress-user-bank-name">Bank Name</p>
          <p className="verified-title inprogress-acc-holder-name">
            Acc Holder Name
          </p>
          <p className="verified-title inprogress-user-acc-number">
            Acc Number
          </p>
          <p className="verified-title inprogress-acc-type">Acc Type</p>
          {/* <p className="verified-title inprogress-user-bank-transit-no">
            Bank Transit Number
          </p>
          <p className="verified-title inprogress-institute-no">
            {" "}
            Institute Number
          </p> */}
          <p className="verified-title inprogress-institute-no">IFSC code</p>
          <p className="verified-title inprogress-user-govt-doc-id">
            Type of Govt Issue ID
          </p>
          {/* <p className="verified-title inprogress-govt-doc-name">
            Document Name
          </p> */}
          <p className="verified-title inprogress-user-doc-no">ID Number</p>
          <p className="verified-title inprogress-user-photos">Profile Photo</p>
          <p className="verified-title inprogress-user-photos">
            ID Front Image
          </p>
          <p className="verified-title inprogress-user-photos">ID Back Image</p>
          <p className="verified-title inprogress-user-doc-expiry-date">
            ID Expiration Date
          </p>
          <p className="verified-title inprogress-date-of-birth">DOB</p>
          <p className="verified-title inprogress-verification">Verification</p>
          <p></p>
        </div>
        <hr className="inprogress-horizontal-row" />
        <div>
          {progressList.map((item, index) => {
            if (item.verificationStatus === "in progress") {
              console.log("This is Progress List", item);
              return (
                <div key={index}>
                  <div className="inprogress-user-details-container">
                    <p className="inprogress-serial-no">{index + 1}</p>
                    <p className="inprogress-name">{item.nameOnTheId}</p>
                    <p className="inprogress-user-phone-no">{item.phoneNo}</p>
                    <p className="inprogress-email-address">{item.emailId}</p>

                    <p className="inprogress-user-bank-name">{item.bankName}</p>
                    <p className="inprogress-acc-holder-name">
                      {item.accountHolderName}
                    </p>
                    <p className="inprogress-user-acc-number">
                      {item.accountNumber}
                    </p>
                    <p className="inprogress-acc-type">{item.accountType}</p>
                    {/* <p className="inprogress-user-bank-transit-no">
                      {item.bankTransitNumber}
                    </p>
                    <p className="inprogress-institute-no">
                      {item.institutionNumber}
                    </p> */}
                    <p className="inprogress-institute-no">{item.ifsc_code}</p>
                    <p className="inprogress-user-govt-doc-id">
                      {item.typeOfGovtIssueId}
                    </p>
                    {/* <p className="inprogress-govt-doc-name">
                      {item.documentName}
                    </p> */}
                    <p className="inprogress-user-doc-no">
                      {item.docsIdNumber}
                    </p>
                    <div className="inprogress-user-photos">
                      <Zoom>
                        <img
                          src={item.personalPhoto}
                          className="verified-profile-image"
                          alt="profileImage"
                        />
                      </Zoom>
                    </div>
                    <div className="inprogress-user-photos">
                      <Zoom>
                        <img
                          src={item.IdFrontImage}
                          className="verified-id-front-image"
                          alt="IDFrontImage"
                        />
                      </Zoom>
                    </div>
                    <div className="inprogress-user-photos">
                      <Zoom>
                        <img
                          src={item.IdBackImage}
                          className="verified-id-back-image"
                          alt="IDBackImage"
                        />
                      </Zoom>
                    </div>
                    <p className="inprogress-user-doc-expiry-date">
                      {item.idExpirationDate}
                    </p>
                    <p className="inprogress-date-of-birth">
                      {item.dateOfBirth}
                    </p>
                    <div className="inprogress-verification">
                      <div className="verification-input-container">
                        <input
                          type="radio"
                          name="verificationStatus"
                          id="verify"
                          value="verified"
                          className="verification-radio-button"
                        />
                        <label htmlFor="verify">Verify</label>
                      </div>
                      <div className="verification-input-container">
                        <input
                          type="radio"
                          name="verificationStatus"
                          id="reject"
                          value="rejected"
                          className="verification-radio-button"
                        />
                        <label htmlFor="reject">Reject</label>
                      </div>
                    </div>
                    <div>
                      <button
                        className="save-button"
                        onClick={() =>
                          updateProviderVerificationStatus(
                            item.id,
                            item.emailId
                          )
                        }
                      >
                        Save
                      </button>
                    </div>
                  </div>

                  <hr className="inprogress-horizontal-row" />
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressScreen;
