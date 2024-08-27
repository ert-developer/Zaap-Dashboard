import React, { useState, useEffect } from "react";
import { fireStoreDB } from "../../firebase/firebase-config";
import { collection, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";
import "./previousValues-styles.css";

const PreviousValuesScreen = () => {
    const [previousValues, setPreviousValues] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPreviousValues = async () => {
        const providerRef = collection(fireStoreDB, "Provider_dev");
        try {
            const providerSnapshot = await getDocs(providerRef);
            const valuesList = providerSnapshot.docs.reduce((acc, doc) => {
                const data = doc.data();
                if (data.previous && data.previous.length > 0) {
                    data.previous.forEach((prev, index) => {
                        acc.push({
                            providerId: doc.id,
                            index,
                            ...prev,
                        });
                    });
                }
                return acc;
            }, []);

            setPreviousValues(valuesList);
        } catch (error) {
            console.log("Error fetching previous values:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (providerId, index) => {
        try {
            const providerDocRef = doc(fireStoreDB, "Provider_dev", providerId);
            const providerDoc = await getDoc(providerDocRef);

            if (providerDoc.exists()) {
                const previousArray = providerDoc.data().previous;
                if (previousArray && previousArray.length > 0) {
                    const updatedPreviousArray = previousArray.filter((_, i) => i !== index);
                    await updateDoc(providerDocRef, { previous: updatedPreviousArray });

                    setPreviousValues((prevValues) =>
                        prevValues.filter((value) => !(value.providerId === providerId && value.index === index))
                    );
                    console.log(`Deleted entry at index ${index} from provider ${providerId}.`);
                }
            } else {
                console.log(`No document found for provider_id ${providerId}.`);
            }
        } catch (error) {
            console.log("Error deleting entry:", error);
        }
    };

    useEffect(() => {
        getPreviousValues();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="previous-values-container">
            <table className="previous-values-table">
                <thead>
                    <tr>
                        <th>Provider ID</th>
                        <th>Index</th>
                        <th>ID Category</th>
                        <th>ID Type</th>
                        <th>ID Number</th>
                        <th>Date of Birth</th>
                        <th>ID Expiration Date</th>
                        <th>Personal Photo</th>
                        <th>ID Front Image</th>
                        <th>ID Back Image</th>
                        <th>Account Holder Name</th>
                        <th>Account Number</th>
                        <th>Account Type</th>
                        <th>Bank Name</th>
                        <th>Bank Transit Number</th>
                        <th>Institution Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {previousValues.map((value, index) => (
                        <tr key={index}>
                            <td>{value.providerId}</td>
                            <td>{value.index}</td>
                            <td>{value.id_category || "N/A"}</td>
                            <td>{value.id_type || "N/A"}</td>
                            <td>{value.id_number || "N/A"}</td>
                            <td>{value.date_of_birth ? new Date(value.date_of_birth.seconds * 1000).toLocaleDateString() : "N/A"}</td>
                            <td>{value.id_expiration_date || "N/A"}</td>
                            <td>
                                {value.personal_photo ? (
                                    <img src={value.personal_photo[0]} className="previous-personal-photo" alt="Personal Photo" />
                                ) : (
                                    "N/A"
                                )}
                            </td>
                            <td>
                                {value.front ? (
                                    <img src={value.front[0]} className="previous-id-front-image" alt="ID Front Image" />
                                ) : (
                                    "N/A"
                                )}
                            </td>
                            <td>
                                {value.back ? (
                                    <img src={value.back[0]} className="previous-id-back-image" alt="ID Back Image" />
                                ) : (
                                    "N/A"
                                )}
                            </td>
                            <td>{value.account_holder_name || "N/A"}</td>
                            <td>{value.account_number || "N/A"}</td>
                            <td>{value.account_type || "N/A"}</td>
                            <td>{value.bank_name || "N/A"}</td>
                            <td>{value.bank_transit_number || "N/A"}</td>
                            <td>{value.institution_number || "N/A"}</td>
                            <td>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(value.providerId, value.index)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PreviousValuesScreen;
