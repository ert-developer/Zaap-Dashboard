export const GET_SERVICE_PROVIDER_WORK_DONE_DETAILS =
  "GET_SERVICE_PROVIDER_WORK_DONE_DETAILS";

export const getServiceProviderWorkDoneDetailsActions = (dataList) => {
  return {
    type: GET_SERVICE_PROVIDER_WORK_DONE_DETAILS,
    payload: dataList,
  };
};
