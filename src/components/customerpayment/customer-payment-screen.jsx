import "./customer-payment-styles.css";
import { fireStoreDB } from "../../firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import moment from "moment";
import PaymentNavbar from "../paymentnavbar/payment-nav-bar-screen";
import { envConfig } from "../../assets/helpers/envApi";

const CustomerPaymentScreen = () => {
  const [customerPaymentList, setCustomerPaymentList] = useState([]);

  const getSortedDataBasedOnCreatedOn = (resultData) => {
    const listOfSortedData = resultData.sort((a, b) => {
      const dateA = new Date(a.createdDate);
      const dateB = new Date(b.createdDate);
      return dateB - dateA;
    });
    return listOfSortedData;
  };

  useEffect(() => {
    const getDataFromCustomerDev = async () => {
      const customersPaymentData = await getDocs(
        collection(fireStoreDB, envConfig.Payment)
      );
      const result = customersPaymentData.docs.map((doc) => {
        const createdTimestamp = doc.data().createdOn;
        const momentDate = moment(createdTimestamp);

        const dateFormate = momentDate.format("YYYY-MM-DD HH:mm:ss");

        return {
          createdDate: dateFormate,
          customerId: doc.data().customerID,
          customerName: doc.data().customerName,
          jobID: doc.data().jobId,
          serviceProviderName: doc.data().serviceProviderName,
          serviceProviderId: doc.data().serviceproviderId,
          amount: doc.data().amount,
        };
      });

      const sortedData = getSortedDataBasedOnCreatedOn(result);
      setCustomerPaymentList(sortedData);
    };
    getDataFromCustomerDev();
  }, []);

  return (
    <div>
      <PaymentNavbar />
      <div className="customer-main-container">
        <div className="table-heading-container">
          <p className="customer-h-row s-no">S.No</p>
          <p className="customer-h-row customer-id">Date & Time</p>
          <p className="customer-h-row customer-id">Customer ID</p>
          <p className="customer-h-row customer-name">Customer Name</p>
          <p className="customer-h-row job-id">Job ID</p>
          <p className="customer-h-row service-id">Service Provider ID</p>
          <p className="customer-h-row service-name">Service Provider Name</p>
          <p className="customer-h-row paid-amount">Paid Amount</p>
          {/* <p className="customer-h-row transaction-id">Transation ID</p> */}
        </div>
        <hr className="payment-horizantal-row" />
        {customerPaymentList?.map((item, index) => {
          return (
            <div key={index}>
              <div className="customer-payment-container">
                <p className="s-no">{index + 1}</p>
                <p className="customer-id">{item.createdDate}</p>
                <p className="customer-id">{item.customerId}</p>
                <p className="customer-name">{item.customerName}</p>
                <p className="job-id">{item.jobID}</p>
                <p className="service-id">{item.serviceProviderId}</p>
                <p className="service-name">{item.serviceProviderName}</p>
                <p className="service-name">{item.amount}</p>
              </div>
              <hr className="payment-horizantal-row" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomerPaymentScreen;
