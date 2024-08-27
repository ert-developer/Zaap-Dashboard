import PaymentNavbar from "../paymentnavbar/payment-nav-bar-screen";
import PopupModal from "../../atoms/popupmodal/pop-up-modal";
import "./service-provider-payment-styles.css";

const ServiceProviderPaymentScreen = ({
  serviceProviderPaymentList,
  updatePaymentStatus,
  setTransactionIdValue,
  transactionIdValue,
  showPopup,
  setShowPopup,
}) => {
  const onClickSaveForUpdatePaymentStatus = (id) => {
    updatePaymentStatus(id);
  };

  const onChangeTransactionId = (e) => {
    setTransactionIdValue(e.target.value);
  };

  return (
    <div>
      {showPopup && (
        <PopupModal
          setShowPopup={setShowPopup}
          message="User Payment Details Updated Successfully"
        />
      )}
      <PaymentNavbar />
      <div className="service-payment-main-container">
        <div className="table-heading-container">
          <p className="customer-h-row s-no">S.No</p>
          <p className="customer-h-row service-p-id">Work Start Date</p>
          <p className="customer-h-row service-p-id">Work Done Date</p>
          <p className="customer-h-row service-p-id">Service Provider ID</p>
          <p className="customer-h-row service-p-name">Service Provider Name</p>
          <p className="customer-h-row job-id">Job ID</p>
          <p className="customer-h-row bank-name">Bank Name</p>
          <p className="customer-h-row bank-acc-no">Bank Acc No</p>
          <p className="customer-h-row bank-acc-no">Amount</p>
          <p className="customer-h-row transaction-id">Transaction ID</p>
          <p className="customer-h-row payment-received-status">
            Payment Received
          </p>
        </div>
        <hr className="service-harizantal-row" />
        {serviceProviderPaymentList.map((item, index) => {
          // console.log("This is Result : ", item);
          if (item.paymentReceived === "No") {
            return (
              <div key={index}>
                <div className="customer-payment-container">
                  <p className="s-no">{index + 1}</p>
                  <p className="service-p-id">{item.workStartDateAndTime}</p>
                  <p className="service-p-id">{item.workEndDate}</p>
                  <p className="service-p-id">{item.serviceProviderId}</p>
                  <p className="service-p-name">{item.serviceProviderName}</p>
                  <p className="job-id">{item.jobID}</p>
                  <p className="bank-name">{item.bankDetails.bankName}</p>
                  <p className="bank-acc-no">
                    {item.bankDetails.accountNumber}
                  </p>
                  <p className="bank-acc-no">{item.amount}</p>
                  <div className="transaction-id">
                    <input
                      type="text"
                      placeholder="Transation id"
                      value={transactionIdValue}
                      onChange={onChangeTransactionId}
                    />
                  </div>
                  <div className="payment-received-status">
                    <div>
                      <input
                        type="radio"
                        name="payment"
                        id="paymentDone"
                        value="Yes"
                      />
                      <label htmlFor="paymentDone">Yes</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="payment"
                        id="paymentNotDone"
                        value="No"
                      />
                      <label htmlFor="paymentNotDone">No</label>
                    </div>
                  </div>
                  <div>
                    <button
                      className="save-button"
                      onClick={() => onClickSaveForUpdatePaymentStatus(item.id)}
                    >
                      Save
                    </button>
                  </div>
                </div>
                <hr className="service-harizantal-row" />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ServiceProviderPaymentScreen;
