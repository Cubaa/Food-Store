import { IReqData } from "../Types/reqDataTypes";
import { ISendDataproductTypes } from "../Types/sendDataProductTypes";

export const sendRequest = async (
  requestConfig: IReqData,
  productData?: ISendDataproductTypes
) => {
  console.log(productData)
  console.log(requestConfig.method, requestConfig.headers, requestConfig.body)
  const res = await fetch(requestConfig.url, {
    method: requestConfig.method,
    headers: requestConfig.headers ? requestConfig.headers : {},
    body: requestConfig.body ? JSON.stringify(productData) : JSON.stringify(productData),
  });
  const responseData = await res.json();
  console.log(responseData);
  return responseData.data;
};
