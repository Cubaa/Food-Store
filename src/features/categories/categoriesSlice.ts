import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ICategoryTypes } from "../../Types/categoryTypes";
import { IEditCategoryTypes } from "../../Types/editCategoryTypes";
import { IErrorTypes } from "../../Types/errorTypes";
import { IAddCategoryTypes } from "../../Types/addCategoryTypes";
import { addCategorySend } from "./utils/addCategorySend";
import { editCategorySend } from "./utils/editCategorySend";
import { fetchCategoriesRequest } from "./utils/fetchCategoriesRequest";

interface ICategoriesState {
  categories: ICategoryTypes[];
  errors: IErrorTypes[];
  status: string | undefined;
  loading: string;
}

const initialState: ICategoriesState = {
  categories: [],
  status: "",
  loading: "idle",
  errors: []
};

export const fetchCategories = createAsyncThunk<ICategoryTypes[]>(
  "categories/fetchCategories",
  async ():Promise<ICategoryTypes[]> => {
      const res = await fetchCategoriesRequest()
      return res.data;
  }
);


export const addCategory = createAsyncThunk<IErrorTypes[], IAddCategoryTypes>(
  "categories/addCategory",
  async (category:IAddCategoryTypes):Promise<IErrorTypes[]> => {
    const data:IAddCategoryTypes = {
           name: category.name,
           status: "ENABLED",
         };
    const res = await addCategorySend(data)
    return res.errors;
  }
);



export const editCategory = createAsyncThunk<IErrorTypes[], IEditCategoryTypes>("categories/editCategory", async (category:IEditCategoryTypes):Promise<IErrorTypes[]> => {
        const data:IEditCategoryTypes = {
          id: category.id,
          name: category.name,
          status: "ENABLED",
        }
        const res = await editCategorySend(data)
        return res.errors;
  }
);


export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    resetCategoriesErrors(state){
      state.errors = []
      state.status = ""
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<ICategoryTypes[]>) => {
        state.loading = "succeeded";
        state.status = "succeeded";
        const categories = action.payload.map(
          (category: ICategoryTypes, index: number) => {
            return {
              id: ++index,
              name: category.name,
              category_id: category.id,
            };
          }
        );
        
        state.categories = categories;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = "Failed to fetch";
      });


      builder.addCase(addCategory.pending, (state) => {
        state.status = "sending";
      });
      builder.addCase(addCategory.fulfilled, (state, action: PayloadAction<IErrorTypes[]>) => {
        const errors = action.payload
        if(errors.length>0){
          state.errors = errors
          state.status = "failure"
        }else{  
          state.status = "succeeded"
          state.errors.length = 0
         }
      });
      builder.addCase(addCategory.rejected, (state) => {
        state.status = "Failed to send";
      });


      builder.addCase(editCategory.pending, (state) => {
        state.status = "sending";
      });
      builder.addCase(editCategory.fulfilled, (state, action: PayloadAction<IErrorTypes[]>) => {
        const errors = action.payload
        if(errors.length>0){
          state.errors = errors
          state.status = "failed"
        }else{  
          state.status = "successed"
          state.errors.length = 0
         }
      });
      builder.addCase(editCategory.rejected, (state) => {
        state.status = "Failed to send";
      });
  },
});

export const { resetCategoriesErrors } = categoriesSlice.actions

export default categoriesSlice.reducer;
