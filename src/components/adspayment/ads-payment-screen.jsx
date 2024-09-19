import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { fireStoreDB } from "../../firebase/firebase-config"; // Ensure this path is correct
import "./AdsPaymentScreen.css"; // Add appropriate CSS for styling
import { envConfig } from "../../assets/helpers/envApi";

const AdsPaymentScreen = () => {
  const [premiumAds, setPremiumAds] = useState([]);

  useEffect(() => {
    const fetchPremiumAds = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(fireStoreDB, envConfig.Premium_ads)
        );
        const adsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPremiumAds(adsData);
      } catch (error) {
        console.error("Error fetching premium ads: ", error);
      }
    };

    fetchPremiumAds();
  }, []);

  return (
    <div className="ads-payment-container">
      <h1>Premium Ads Details</h1>
      <table className="ads-payment-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Featured Ads</th>
            <th>Spotlight Ads</th>
            <th>Total Amount</th> {/* New column */}
          </tr>
        </thead>
        <tbody>
          {premiumAds.map((ad) => {
            const totalAmount = ad.featuredAds * 149 + ad.spotlightAds * 249;
            return (
              <tr key={ad.id}>
                <td>{ad.id}</td>
                <td>{ad.featuredAds}</td>
                <td>{ad.spotlightAds}</td>
                <td>{totalAmount}</td> {/* Display calculated total amount */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdsPaymentScreen;
