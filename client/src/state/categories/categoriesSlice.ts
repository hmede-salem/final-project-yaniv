import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Category from "../../entities/Category";
import apiClient from "../../services/api-client";

interface CategoriesState {
  categories: Category[] | undefined;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CategoriesState = {
  categories: undefined,
  status: "idle",
  error: null,
};

export const fetchCategoriesData = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("categories/fetchCategoriesData", async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get<{ data: Category[] }>("categories");
    return response.data.data;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

const categoriesSlice = createSlice({
  name: "Categories",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCategoriesData.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.status = "succeeded";
          state.categories = action.payload;
        }
      )
      .addCase(fetchCategoriesData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setCategories, reset } = categoriesSlice.actions;

export default categoriesSlice.reducer;
