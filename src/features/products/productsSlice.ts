import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IErr, IErrorTypes } from "../../Types/errorTypes";
import { IFetchDataproductTypes } from "../../Types/fetchDataProductTypes";
import { IReqData } from "../../Types/reqDataTypes";
import { ISendDataproductTypes } from "../../Types/sendDataProductTypes";
import { sendRequest } from "../../utils/sendRequest";

interface IProductsState {
  products: IFetchDataproductTypes[];
  fetchProductError: any;
  sendProductError:IErrorTypes[];
  status: string;
}

const initialState: IProductsState = {
  products: [],
  fetchProductError: null,
  sendProductError: [],
  status: "idle",
};

const fetchConfig: IReqData = {
  url: "https://newdemostock.gopos.pl/ajax/219/products",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "fd9ba9e1-0788-4e8f-ac46-a43df43e205e",
  },
};



export const fetchProducts = createAsyncThunk<IFetchDataproductTypes[]>(
  "products/fetchProducts",
  () => sendRequest(fetchConfig)
);



export const addProduct = createAsyncThunk<IErr, ISendDataproductTypes>(
  "products/addProduct",
  async (product) => {
    try{
    const data = {
           name: product.name,
          default_volume: 23,
          critical_amount_level: 95,
          optimal_amount_level: 50,
          recipe_amount: 1,
           type: "BASIC",
           status: "ENABLED",
           measure_type: "KILOGRAM",
          category_id: product.category_id,
           tax_id: 1,
         };
    const res = await fetch("https://newdemostock.gopos.pl/ajax/219/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "fd9ba9e1-0788-4e8f-ac46-a43df43e205e",
      },
      body: JSON.stringify(data)
    });
    console.log(res);
    const responseData = await res.json();
    console.log(responseData);
    return responseData;
  }
  catch(err){
    console.log(err)
    throw err;
  }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,

  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const products = action.payload.map(
          (product: IFetchDataproductTypes, index: number) => {
            return {
              uniq_id: product.id,
              id: ++index,
              name: product.name,
              category_id: product.category_id,
            };
          }
        );
        state.products = products;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.fetchProductError = action.error.message;
      });
    builder.addCase(addProduct.pending, (state) => {
      state.status = "sending";
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.status = "successful send";
      console.log(action.payload)
      const errors = action.payload
      console.log(errors)
      
  state.sendProductError = errors.errors
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.status = "failed send";
     
      console.log(action);
    });
  },
});

// export const {  } = productsSlice.actions

export default productsSlice.reducer;

// const data2: any = {
//   name: "mąkaa100000",
//   default_volume: 43,
//   critical_amount_level: 95,
//   optimal_amount_level: 50,
//   recipe_amount: 1,
//   type: "BASIC",
//   status: "ENABLED",
//   measure_type: "KILOGRAM",
//   category_id: 43,
//   tax_id: 1,
//   updated_at: "2021-10-22T20:11:34",
//   default_price_net_money: {
//     amount: 100,
//     currency: "PLN",
//   },
//   cost_price_money: {
//     amount: 75,
//     currency: "PLN",
//   },
//   cost_price_gross_money: {
//     amount: 123,
//     currency: "PLN",
//   },
//   description: "",
//   sku: "1g47364",
// };


// export const addProduct = createAsyncThunk<ISendDataproductTypes,ISendDataproductTypes>("products/addProduct", (product) => {
  
//   const data = {
//     name: product.name,
//     default_volume: 23,
//     critical_amount_level: 95,
//     optimal_amount_level: 50,
//     recipe_amount: 1,
//     type: "BASIC",
//     status: "ENABLED",
//     measure_type: "KILOGRAM",
//     category_id: product.category_id,
//     tax_id: 1,
//   };
//   console.log(data)
//   return sendRequest(sendConfig, data);

// });

//const sendConfig: IReqData = {
  //   url: "https://newdemostock.gopos.pl/ajax/219/products",
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: "fd9ba9e1-0788-4e8f-ac46-a43df43e205e",
  //   },
  // };