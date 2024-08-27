import { createStore, combineReducers } from "redux";
import verificationReducer from "./reducers/verifications-reducer";
import serviceProviderPaymentReducer from "./reducers/service-provider-payment-reducer";

const rootReducer = combineReducers({
  verificationReducer: verificationReducer,
  serviceProviderPaymentReducer: serviceProviderPaymentReducer,
});

const store = createStore(rootReducer);

export default store;
