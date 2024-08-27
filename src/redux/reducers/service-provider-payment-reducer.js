import { GET_SERVICE_PROVIDER_WORK_DONE_DETAILS } from "../actions/serviceproviderpaymentactions/service-provider-payment-actions";

const serviceProviderPaymentInitialState = {
  serviceProviderPaymentList: [],
};

const serviceProviderPaymentReducer = (
  state = serviceProviderPaymentInitialState,
  actions
) => {
  switch (actions.type) {
    case GET_SERVICE_PROVIDER_WORK_DONE_DETAILS:
      return { ...state, serviceProviderPaymentList: actions.payload };

    default:
      return state;
  }
};

export default serviceProviderPaymentReducer;
