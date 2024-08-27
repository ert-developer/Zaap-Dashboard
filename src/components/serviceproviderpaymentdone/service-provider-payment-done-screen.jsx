import PaymentNavbar from "../paymentnavbar/payment-nav-bar-screen";
import { useSelector } from "react-redux";

const ServiceProviderPaymentScreenDone = () => {
  const serviceProviderPaymentList = useSelector(
    (state) => state.serviceProviderPaymentReducer.serviceProviderPaymentList
  );
  console.log("This is Payment List : ", serviceProviderPaymentList);
  return (
    <div>
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
          {/* <p className="customer-h-row payment-received-status">
            Payment Received
          </p> */}
        </div>
        <hr className="service-harizantal-row" />
        {serviceProviderPaymentList?.map((item, index) => {
          if (item.paymentReceived === "Yes") {
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
                  <p className="bank-acc-no">{item.transactionId}</p>
                  {/* <p className="bank-acc-no">{item.paymentReceived}</p> */}
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

export default ServiceProviderPaymentScreenDone;
