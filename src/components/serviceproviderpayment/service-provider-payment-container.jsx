import ServiceProviderPaymentScreen from "./service-provider-payment-screen";
import { fireStoreDB } from "../../firebase/firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import moment from "moment";
import { getServiceProviderWorkDoneDetailsActions } from "../../redux/actions/serviceproviderpaymentactions/service-provider-payment-actions";
import { useSelector, useDispatch } from "react-redux";

const ServiceProviderPaymentContainer = () => {
  const dispatch = useDispatch();
  const [transactionIdValue, setTransactionIdValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const serviceProviderPaymentList = useSelector(
    (state) => state.serviceProviderPaymentReducer.serviceProviderPaymentList
  );

  /////Get Work Start Date////
  const getWorkStartDateDetails = async (jobID) => {
    const serviceProviderWorkStartDetails = collection(
      fireStoreDB,
      "UsersPayment_dev"
    );
    const serviceProviderWorkStartDetailsQuery = query(
      serviceProviderWorkStartDetails,
      where("jobId", "==", jobID)
    );
    try {
      const resultQuerySnapshot = await getDocs(
        serviceProviderWorkStartDetailsQuery
      );
      if (!resultQuerySnapshot.empty) {
        const workStartData = resultQuerySnapshot.docs[0].data();
        return {
          workStartTimeStamp: workStartData.createdOn,
        };
      } else {
        console.log(
          "No matching document found for the given service provider ID."
        );
        return { workStartTimeStamp: null }; // Return null or appropriate value if no document is found
      }
    } catch (error) {
      console.log("Error fetching service provider bank details:", error);
      return { workStartTimeStamp: null }; // Return null or appropriate error handling
    }
  };

  ////PaymentList Sorted Based on Work Done Status//////
  const getSortedDataBasedWorkDoneDate = (resultData) => {
    const sortedWorkDonePaymentList = resultData.sort((a, b) => {
      const dateA = new Date(a.workEndDate);
      const dateB = new Date(b.workEndDate);
      return dateB - dateA;
    });
    return sortedWorkDonePaymentList;
  };

  //////////////////////////Update Payment Status ////////////////////
  const updatePaymentStatus = async (id) => {
    // console.log("THis is User ID :", id);
    const paymentStatus = document.querySelector(
      'input[name="payment"]:checked'
    );
    if (paymentStatus) {
      const paymentStatusValue = paymentStatus.value;
      const userDocRef = doc(fireStoreDB, "completedJobs", id);
      try {
        const userRef = await updateDoc(userDocRef, {
          paymentReceived: paymentStatusValue,
          transactionId: transactionIdValue,
        });
        setShowPopup(true);
      } catch (error) {
        console.log("This is Update Verify Status Error :", error);
      }
    }
  };

  ///////////Get Service Provider Bank Details////////////
  const getServiceProviderBankDetails = async (spID) => {
    const serviceProviderBankDetails = collection(fireStoreDB, "Provider_dev");
    const getBankDetailsQuery = query(
      serviceProviderBankDetails,
      where("provider_id", "==", spID)
    );
    try {
      const resultQuerySnapshot = await getDocs(getBankDetailsQuery);
      if (!resultQuerySnapshot.empty) {
        const providerData = resultQuerySnapshot.docs[0].data();
        return {
          bankDetails: {
            // Add the fields you want from provider_dev
            bankName: providerData.bank_name,
            accountNumber: providerData.account_number,
            // Add more fields as needed
          },
        };
      } else {
        console.log(
          "No matching document found for the given service provider ID."
        );
        return { bankDetails: null }; // Return null or appropriate value if no document is found
      }
    } catch (error) {
      console.log("Error fetching service provider bank details:", error);
      return { bankDetails: null }; // Return null or appropriate error handling
    }
  };

  useEffect(() => {
    const getDataFromCustomerDev = async () => {
      const serviceProvidersPaymentData = await getDocs(
        collection(fireStoreDB, "completedJobs")
      );
      const result = serviceProvidersPaymentData.docs.map(async (doc) => {
        const spID = doc.data().candidateUserId;
        const jobID = doc.data().jobId;
        const spBankDetails = await getServiceProviderBankDetails(spID);
        const workStartDate = await getWorkStartDateDetails(jobID);
        const convertNormalDate = moment(workStartDate.workStartTimeStamp);
        const convertedWorkStartDate = convertNormalDate.format(
          "YYYY-MM-DD HH:mm:ss"
        );

        const workDoneTimeStamp = doc.data().timeAgo;
        const convertMoment = moment(workDoneTimeStamp);
        const workDoneDate = convertMoment.format("YYYY-MM-DD HH:mm:ss");

        return {
          id: doc.id,
          customerId: doc.data().customerID,
          customerName: doc.data().customerName,
          jobID: jobID,
          serviceProviderName: doc.data().candiateName,
          serviceProviderId: doc.data().candidateUserId,
          ...spBankDetails,
          workStartDateAndTime: convertedWorkStartDate,
          amount: doc.data().salary,
          workEndDate: workDoneDate,
          paymentReceived: doc.data().paymentReceived,
          transactionId: doc.data().transactionId,
        };
      });

      const resolvePromisesAll = await Promise.all(result);

      const getSortedList = getSortedDataBasedWorkDoneDate(resolvePromisesAll);

      dispatch(getServiceProviderWorkDoneDetailsActions(getSortedList));
      // setSeriveProviderPaymentList(resolvePromisesAll);
    };
    getDataFromCustomerDev();
  }, []);

  return (
    <ServiceProviderPaymentScreen
      serviceProviderPaymentList={serviceProviderPaymentList}
      updatePaymentStatus={updatePaymentStatus}
      setTransactionIdValue={setTransactionIdValue}
      transactionIdValue={transactionIdValue}
      showPopup={showPopup}
      setShowPopup={setShowPopup}
    />
  );
};

export default ServiceProviderPaymentContainer;
