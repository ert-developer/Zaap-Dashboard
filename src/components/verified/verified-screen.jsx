import "./verified-styles.css";
import { useSelector } from "react-redux";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const VerifiedScreen = () => {
  const verifiedList = useSelector(
    (state) => state.verificationReducer.verificationList
  );

  // Sort the verifiedList by newest first based on the createdDate field
  const sortedVerifiedList = [...verifiedList].sort((a, b) => {
    return new Date(b.createdDate) - new Date(a.createdDate); // Descending order
  });

  console.log("This is Verified List :", sortedVerifiedList);

  return (
    <>
      <div className="verified-main-container">
        <div className="verified-headings-container">
          <p className="verified-title serial-no">S.No</p>
          <p className="verified-title name">Date</p>
          <p className="verified-title name">Name</p>
          <p className="verified-title phone-number">Phone Number</p>
          <p className="verified-title email-address">Email</p>
          <p className="verified-title bank-name">Bank Name</p>
          <p className="verified-title acc-holder-name">Acc Holder Name</p>
          <p className="verified-title acc-number">Acc Number</p>
          <p className="verified-title acc-type">Acc Type</p>
          <p className="verified-title ifsc-code"> IFSC code</p>
          <p className="verified-title type-of-govt-id">Type of Govt Issue ID</p>
          <p className="verified-title govt-id-no">ID Number</p>
          <p className="verified-title govt-id-no">Profile Image</p>
          <p className="verified-title govt-id-no">ID Front Image</p>
          <p className="verified-title govt-id-no">ID Back Image</p>
          <p className="verified-title govt-doc-expiry-date">ID Expiration Date</p>
          <p className="verified-title date-of-birth">DOB</p>
        </div>
        <hr className="verified-horizantal-row" />
        <div>
          {sortedVerifiedList.map((item, index) => {
            if (item.verificationStatus === "verified") {
              return (
                <div key={index} style={{ width: "100%" }}>
                  <div className="verified-user-details-container">
                    <p className="serial-no">{index + 1}</p>
                    <p className="name">{item.createdDate}</p>
                    <p className="name">{item.nameOnTheId}</p>
                    <p className="phone-number">{item.phoneNo}</p>
                    <p className="email-address">{item.emailId}</p>
                    <p className="bank-name">{item.bankName}</p>
                    <p className="acc-holder-name">{item.accountHolderName}</p>
                    <p className="verified-user-acc-number">{item.accountNumber}</p>
                    <p className="verified-user-acc-type">{item.accountType}</p>
                    <p className="verified-user-ifsc-code">{item.ifsc_code}</p>
                    <p className="verified-user-govt-doc-id">{item.typeOfGovtIssueId}</p>
                    <p className="verified-user-doc-no">{item.docsIdNumber}</p>
                    <div className="verified-user-doc-no">
                      <Zoom>
                        <img
                          src={item.personalPhoto}
                          alt="profilePhoto"
                          className="verified-profile-image"
                        />
                      </Zoom>
                    </div>
                    <div className="verified-user-doc-no">
                      <Zoom>
                        <img
                          src={item.IdFrontImage}
                          alt="profilePhoto"
                          className="verified-profile-image"
                        />
                      </Zoom>
                    </div>
                    <div className="verified-user-doc-no">
                      <Zoom>
                        <img
                          src={item.IdBackImage}
                          alt="profilePhoto"
                          className="verified-profile-image"
                        />
                      </Zoom>
                    </div>
                    <p className="verified-user-doc-expiry-date">{item.idExpirationDate}</p>
                    <p className="verified-user-dob">{item.dateOfBirth}</p>
                  </div>
                  <hr className="verified-horizantal-row" />
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default VerifiedScreen;
