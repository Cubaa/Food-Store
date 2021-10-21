import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "../../Types/productTypes";
import { IReqData } from "../../Types/reqDataTypes";
import { sendRequest } from "../../utils/sendRequest";

interface IProductsState {
  products: IProduct[];
  error: string | undefined | null;
  status: string;
}

const initialState: IProductsState = {
  products: [],
  error: null,
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

export const fetchProducts = createAsyncThunk<IProduct[]>(
  "products/fetchProducts",
  () => sendRequest(fetchConfig)
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
          (product: IProduct, index: number) => {
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
        state.error = action.error.message;
      });
  },
});

// export const {  } = productsSlice.actions

export default productsSlice.reducer;
