import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { fireStoreDB } from '../../firebase/firebase-config'; // Make sure the path to your firebase config is correct
import './paymentCompletedScreen2222.css';

const PaymentCompletedScreen2 = () => {
  const [paymentDetails, setPaymentDetails] = useState([]);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireStoreDB, 'PaymentDetails_dev'));
        const detailsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPaymentDetails(detailsData);
      } catch (error) {
        console.error('Error fetching payment details: ', error);
      }
    };

    fetchPaymentDetails();
  }, []);


  return (
    <div className="payment-details-container">
      <h1>Payment Details</h1>
      <table className="payment-details-table">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Finished Time</th>
            <th>Job Description</th>
            <th>Job ID</th>
            <th>Job Title</th>
            <th>Service Provider Account</th>
            <th>Service Provider Bank</th>
            <th>Service Provider Email</th>
            <th>Service Provider IFSC</th>
            <th>Service Provider ID</th>
            <th>Service Provider Name</th>
            <th>Transaction Status</th>
            <th>Budget</th>
            <th>Tip Amount</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {paymentDetails.map((detail) => (
            <tr key={detail.id}>
              <td>{detail.customerID}</td>
              <td>{detail.customerName}</td>
              <td>{detail.finishedTime}</td>
              <td>{detail.jobDescription}</td>
              <td>{detail.jobID}</td>
              <td>{detail.jobTitle}</td>
              <td>{detail.serviceProviderAccount}</td>
              <td>{detail.serviceProviderBank}</td>
              <td>{detail.serviceProviderEmail}</td>
              <td>{detail.serviceProviderIFSC}</td>
              <td>{detail.serviceProviderId}</td>
              <td>{detail.serviceProviderName}</td>
              <td>{detail.TransactionStatus}</td>
              <td>{detail.Budget}</td>
              <td>{detail.tipAmount}</td>
              <td>{(parseFloat(detail.Budget) || 0) + (parseFloat(detail.tipAmount) || 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentCompletedScreen2;
