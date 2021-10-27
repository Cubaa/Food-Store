export const fetchCategoriesRequest = async () => {
  try{
    const res = await fetch("https://newdemostock.gopos.pl/ajax/219/product_categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "fd9ba9e1-0788-4e8f-ac46-a43df43e205e",
        },
    });
    const responseData = await res.json();
    
    return responseData;
  }
  catch(err){
    
    throw err;
  }
};
  