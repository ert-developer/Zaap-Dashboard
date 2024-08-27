export const GET_SERVICE_PROVIDER_DETAILS = "GET_SERVICE_PROVIDER_DETAILS";

export const getServiceProviderDetailsActions = (pList) => {
  return {
    type: GET_SERVICE_PROVIDER_DETAILS,
    payload: pList,
  };
};
