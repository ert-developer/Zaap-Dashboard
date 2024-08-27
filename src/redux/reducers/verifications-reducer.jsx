import { GET_SERVICE_PROVIDER_DETAILS } from "../actions/serviceproviderverificationactions/verifications-actions";

const initialVerificationListState = {
  verificationList: [],
};

const verificationReducer = (state = initialVerificationListState, actions) => {
  switch (actions.type) {
    case GET_SERVICE_PROVIDER_DETAILS:
      return {
        ...state,
        verificationList: actions.payload,
      };
    default:
      return state;
  }
};

export default verificationReducer;
