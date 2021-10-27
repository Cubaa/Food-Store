import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IErrorTypes } from "../../Types/errorTypes";
import { IProductTypes } from "../../Types/productTypes";
import {  IAddProductTypes} from "../../Types/addProductTypes";
import {IEditProductTypes} from  '../../Types/editProductTypes'
import { fetchProductsRequest } from "./utils/fetchProductsReuest";
import { addProductSend } from "./utils/addProductSend";
import { editProductSend } from "./utils/editProductSend";

interface IProductsState {
  products: IProductTypes[];
  errors:IErrorTypes[];
  status: string | undefined;
  loading: string;
}

const initialState: IProductsState = {
  products: [],
  errors: [],
  status: "",
  loading: "idle"
};

export const fetchProducts = createAsyncThunk<IProductTypes[]>(
  "products/fetchProducts",
  async ():Promise<IProductTypes[]> => {
    const res = await fetchProductsRequest()
    return res.data;
  }
);

export const addProduct = createAsyncThunk<IErrorTypes[], IAddProductTypes>(
  "products/addProduct",
  async (product:IAddProductTypes):Promise<IErrorTypes[]> => {
    const data:IAddProductTypes = {
          name: product.name,
          default_volume: 23,
          critical_amount_level: 95,
          optimal_amount_level: 50,
          recipe_amount: 1,
          type: "BASIC",
          status: "ENABLED",
          measure_type: "KILOGRAM",
          category_id: product.category_id,
          tax_id: 1
    };
    const res = await addProductSend(data)
    return res.errors;
  }
);



export const editProduct = createAsyncThunk<IErrorTypes[], IEditProductTypes>(
  "products/editProduct",
  async (product: IEditProductTypes): Promise<IErrorTypes[]> => {
    
    const data:IEditProductTypes = {
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
    const id = product.id
    const res = await editProductSend(data, id)
    return res.errors;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    resetProductsErrors(state){
      state.errors = []
      state.status = ""
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action:PayloadAction<IProductTypes[]>) => {
        state.loading = "succedded"
        state.status = "succeeded";
        const products = action.payload.map(
          (product: IProductTypes, index: number) => {
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
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = "Failed to fetch";
      });

    builder.addCase(addProduct.pending, (state) => {
      state.status = "sending";
    });
    builder.addCase(addProduct.fulfilled, (state, action:PayloadAction<IErrorTypes[]>) => {
      const errors = action.payload
      if(errors.length>0){
        state.status = "failure"
      } else state.status = "successed"
      state.errors = errors
    });
    builder.addCase(addProduct.rejected, (state) => {
      state.status = "Failed to send";
    });


    builder.addCase(editProduct.pending, (state) => {
      state.status = "sending";
    });
    builder.addCase(editProduct.fulfilled, (state, action:PayloadAction<IErrorTypes[]>) => {
      const errors = action.payload
      if(errors.length>0){
        state.status = "failure"
      } else state.status = "successed"
      state.errors = errors
    });
    builder.addCase(editProduct.rejected, (state) => {
      state.status = "Failed to send";
    });
  },
});

export const { resetProductsErrors } = productsSlice.actions

export default productsSlice.reducer;