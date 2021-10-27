import { IEditProductTypes } from "../../../Types/editProductTypes";

export const editProductSend = async (data:IEditProductTypes, id:number | undefined) => {
    try{
      const res = await fetch(`https://newdemostock.gopos.pl/ajax/219/products/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "fd9ba9e1-0788-4e8f-ac46-a43df43e205e",
            },
            body: JSON.stringify(data)
    });
    const responseData = await res.json();
    return responseData;
}
  catch(err){
    throw err
  }
};