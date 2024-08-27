import { useSelector } from "react-redux";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "./rejected-styles.css";

const RejectedScreen = () => {
  const rejectedList = useSelector(
    (state) => state.verificationReducer.verificationList
  );
  return (
    <>
      <div className="rejected-main-container">
        <div className="rejected-headings-container">
          <p className="verified-title rejected-serial-no">S.No</p>
          <p className="verified-title rejected-user-name">Name</p>
          <p className="verified-title rejected-user-phone-no">Phone Number</p>
          <p className="verified-title rejected-user-email-id">Email</p>

          <p className="verified-title rejected-user-bank-name">Bank Name</p>
          <p className="verified-title rejected-user-acc-holder-name">
            Acc Holder Name
          </p>
          <p className="verified-title rejected-user-acc-number">Acc Number</p>
          <p className="verified-title rejected-user-acc-type">Acc Type</p>
          <p className="verified-title rejected-user-bank-transit-no">
            Bank Transit Number
          </p>
          <p className="verified-title rejected-user-institute-no">
            {" "}
            Institute Number
          </p>
          <p className="verified-title rejected-user-govt-doc-id">
            Type of Govt Issue ID
          </p>
          <p className="verified-title rejected-user-doc-name">Document Name</p>
          <p className="verified-title rejected-user-doc-no">ID Number</p>
          <p className="verified-title rejected-images">Profile Photo</p>
          <p className="verified-title rejected-images">ID Front Image</p>
          <p className="verified-title rejected-images">ID Back Image</p>
          <p className="verified-title rejected-expiry-date">
            ID Expiration Date
          </p>
          <p className="verified-title rejected-user-dob">DOB</p>
        </div>
        <hr className="rejected-horizantal-row" />
        <div>
          {rejectedList.map((item, index) => {
            if (item.verificationStatus === "rejected") {
              return (
                <div key={index}>
                  <div className="rejected-user-details-container">
                    <p className="rejected-serial-no">{index + 1}</p>
                    {/* <p className="verified-user-name">{item.createdDate}</p> */}
                    <p className="rejected-user-name">{item.nameOnTheId}</p>
                    <p className="rejected-user-phone-no">{item.phoneNo}</p>
                    <p className="rejected-user-email-id">{item.emailId}</p>

                    <p className="rejected-user-bank-name">{item.bankName}</p>
                    <p className="rejected-user-acc-holder-name">
                      {item.accountHolderName}
                    </p>
                    <p className="rejected-user-acc-number">
                      {item.accountNumber}
                    </p>
                    <p className="rejected-user-acc-type">{item.accountType}</p>
                    <p className="rejected-user-bank-transit-no">
                      {item.bankTransitNumber}
                    </p>
                    <p className="rejected-user-institute-no">
                      {item.institutionNumber}
                    </p>
                    <p className="rejected-user-govt-doc-id">
                      {item.typeOfGovtIssueId}
                    </p>
                    <p className="rejected-user-doc-name">
                      {item.documentName}
                    </p>
                    <p className="rejected-user-doc-no">{item.docsIdNumber}</p>
                    <div className="rejected-images">
                      <Zoom>
                        <img
                          src={item.personalPhoto}
                          className="verified-profile-image"
                          alt="profileImage"
                        />
                      </Zoom>
                    </div>
                    <div className="rejected-images">
                      <Zoom>
                        <img
                          src={item.IdFrontImage}
                          className="verified-id-front-image"
                          alt="IDFrontImage"
                        />
                      </Zoom>
                    </div>
                    <div className="rejected-images">
                      <Zoom>
                        <img
                          src={item.IdBackImage}
                          className="verified-id-back-image"
                          alt="IDBackImage"
                        />
                      </Zoom>
                    </div>
                    <p className="rejected-expiry-date">
                      {item.idExpirationDate}
                    </p>
                    <p className="rejected-user-dob">{item.dateOfBirth}</p>
                  </div>
                  <hr className="rejected-horizantal-row" />
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default RejectedScreen;
