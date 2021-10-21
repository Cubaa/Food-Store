import { IReqData } from "../Types/reqDataTypes";

export const sendRequest = async (requestConfig: IReqData) => {
  const res = await fetch(requestConfig.url, {
    method: requestConfig.method,
    headers: requestConfig.headers ? requestConfig.headers : {},
    body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
  });
  const responseData = await res.json();
  console.log(responseData);
  return responseData.data;
};
