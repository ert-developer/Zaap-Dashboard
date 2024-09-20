import { useSelector } from "react-redux";
import { fireStoreDB } from "../../firebase/firebase-config";
import { doc, updateDoc, getDoc } from "firebase/firestore"; // Added getDoc import
import PopupModal from "../../atoms/popupmodal/pop-up-modal";
import { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "./inprogress-styles.css";
import { mailSenter } from "../../utils/nodemailer/mailSend";
import { envConfig } from "../../assets/helpers/envApi";

const ProgressScreen = () => {
  const [showPopup, setShowPopup] = useState(false);

  const progressList = useSelector(
    (state) => state.verificationReducer.verificationList
  );

  const updateProviderVerificationStatus = async (userId, email, name) => {
    const selectedVerificationStatus = document.querySelector(
      'input[name="verificationStatus"]:checked'
    );
    if (selectedVerificationStatus) {
      const verificationValue = selectedVerificationStatus.value;

      const subject =
        verificationValue === "verified"
          ? "Congratulations! Your Background Verification is Complete"
          : "Important Update: Background Verification Unsuccessful";

      const bodyText =
        verificationValue === "verified"
          ? `
        Hi ${name},
        <br><br>
        We’re thrilled to inform you that your background verification has been successfully completed!
        Your service provider account is now fully activated, and you’ll notice enhanced options in your
        side menu to help you manage your services and bookings more efficiently.
        <br><br>
        <strong>Important:</strong>
        <br>
        Before you begin applying for jobs, we highly recommend updating your portfolio. Your portfolio
        is a key tool to showcase your skills and experience to potential customers. Here’s what you can
        include:
        <ul>
          <li><strong>Previous Work Experience:</strong> Highlight your expertise and relevant past projects.</li>
          <li><strong>Photos of Completed Work:</strong> Upload high-quality images that represent your best work.</li>
          <li><strong>Links to projects:</strong> Provide links to any relevant external work or feedback you’ve received.</li>
        </ul>
        Additionally, as you complete jobs on ZAAP, you can monitor your performance and build trust
        by checking the feedback left by customers in the My Public Profile section. Maintaining a
        strong reputation will help you secure more opportunities on the platform.
        <br><br>
        Once your portfolio is updated, you can explore available job opportunities and start applying
        right away.
        <br><br>
        If you have any questions or need support, feel free to reach out via email at 
        <a href="mailto:help@zaapondemand.in">help@zaapondemand.in</a>.
        <br><br>
        We’re excited to see what you accomplish on ZAAP!
        <br><br>
        Best regards,<br>
        Team ZAAP
      `
          : `
        Hi ${name},
        <br><br>
        We hope this message finds you well. Unfortunately, we regret to inform you that your
        background verification did not pass our screening process. This means we are unable to
        activate your account for providing services on ZAAP at this time.
        <br><br>
        We understand that this may be disappointing news, and we want to assure you that the
        background verification process is an essential part of ensuring the trust and safety of all users
        on our platform.
        <br><br>
        If you believe there was an error in the verification process, or if you would like to reapply,
        please feel free to contact our support team at 
        <a href="mailto:help@zaapondemand.in">help@zaapondemand.in</a>, and we will assist you
        with the next steps.
        <br><br>
        Thank you for your understanding, and we hope to have the opportunity to welcome you on
        ZAAP in the future.
        <br><br>
        Best regards,<br>
        Team ZAAP
      `;

      const textMsg =
        verificationValue === "verified"
          ? "Congratulations! Your background verification is complete. Update your portfolio and start applying for jobs on ZAAP. Need support? Email us at help@zaapondemand.in."
          : "Unfortunately, your background verification did not pass our screening. Contact us at help@zaapondemand.in if you believe this is an error or would like to reapply.";

      mailSenter(email, subject, textMsg, bodyText);

      const userDocRef = doc(fireStoreDB, envConfig.Provider, userId);

      try {
        await updateDoc(userDocRef, {
          isverified: verificationValue,
          id_number: "",
          front: "",
          back: "",
        });
  
        // Fetch the provider_id from the Provider_dev collection
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const providerId = userDocSnapshot.data().provider_id;
  
          if (verificationValue === "verified" && providerId) {
            // Update the isServiceProvider field in the User_dev collection using provider_id
            const userDevDocRef = doc(fireStoreDB, envConfig.User, providerId);
            await updateDoc(userDevDocRef, {
              isServiceProvider: true,
            });
          }
        }
  
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
                      {item.idExpirationDate ? item.idExpirationDate : "N/A"}
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
                            item.emailId,
                            item.nameOnTheId
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
