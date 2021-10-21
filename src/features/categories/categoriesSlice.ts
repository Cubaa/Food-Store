import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ICategory } from "../../Types/categoryTypes";
import { IProduct } from "../../Types/productTypes";
import { IReqData } from "../../Types/reqDataTypes";
import { sendRequest } from "../../utils/sendRequest";

interface ICategoriesState {
  categories: ICategory[];
  error: string | undefined | null;
  status: string;
}

const initialState: ICategoriesState = {
  categories: [],
  error: null,
  status: "idle",
};

const fetchConfig: IReqData = {
  url: "https://newdemostock.gopos.pl/ajax/219/product_categories",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "fd9ba9e1-0788-4e8f-ac46-a43df43e205e",
  },
};

export const fetchCategories = createAsyncThunk<ICategory[]>(
  "categories/fetchCategories",
  () => sendRequest(fetchConfig)
);

export const productsSlice = createSlice({
  name: "categories",
  initialState,

  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        const categories = action.payload.map(
          (category: ICategory, index: number) => {
            return {
              id: ++index,
              name: category.name,
              category_id: category.id,
            };
          }
        );
        state.categories = categories;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// export const {  } = productsSlice.actions

export default productsSlice.reducer;
