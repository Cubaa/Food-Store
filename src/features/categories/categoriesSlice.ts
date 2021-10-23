import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AddCategory } from "../../components/AddCategory";
import { ICategory } from "../../Types/categoryTypes";
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

interface ISendCategoryTypes{
  name: string | undefined;
}

export const addCategory = createAsyncThunk<any, ISendCategoryTypes>(
  "categories/addCategory",
  async (category) => {
    try{
    const data = {
           name: category.name,
           status: "ENABLED",
         };
    const res = await fetch("https://newdemostock.gopos.pl/ajax/219/product_categories", {
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

interface IEditCategory{
    id: number;
    categoryName: string | undefined;
}

export const editCategory = createAsyncThunk<any, IEditCategory>(
  "categories/editCategory",
  async (data) => {
    try{
   
    const res = await fetch(`https://newdemostock.gopos.pl/ajax/219/product_categories/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "fd9ba9e1-0788-4e8f-ac46-a43df43e205e",
      },
      body: JSON.stringify({name: data.categoryName})

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


      builder.addCase(addCategory.pending, (state) => {
        state.status = "sending";
      });
      builder.addCase(addCategory.fulfilled, (state, action) => {
        state.status = "successful send";
        console.log(action.payload)
        const errors = action.payload
        console.log(errors)
        
    // state.sendProductError = errors.errors
      });
      builder.addCase(addCategory.rejected, (state, action) => {
        state.status = "failed send";
       
        console.log(action);
      });




      
      builder.addCase(editCategory.pending, (state) => {
        state.status = "sending";
      });
      builder.addCase(editCategory.fulfilled, (state, action) => {
        state.status = "successful send";
        console.log(action.payload)
        const errors = action.payload
        console.log(errors)
        
    // state.sendProductError = errors.errors
      });
      builder.addCase(editCategory.rejected, (state, action) => {
        state.status = "failed send";
       
        console.log(action);
      });
  },
});

// export const {  } = productsSlice.actions

export default productsSlice.reducer;
