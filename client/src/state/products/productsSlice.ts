import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Category, { allCategories } from "../../entities/Category";
import Product from "../../entities/Product";
import Range from "../../entities/Range";

interface ProductFilterState {
  selectedCategory: Category;
  range: Range;
  searchText: string;
  products: Product[];
}

const initialState: ProductFilterState = {
  selectedCategory: allCategories,
  range: { min: 0, max: 2500 },
  searchText: "",
  products: [],
};

const productsSlice = createSlice({
  name: "productsFilter",
  initialState,
  reducers: {
    selectCategory: (state, action: PayloadAction<Category>) => {
      state.selectedCategory = action.payload;
    },
    selectRange: (state, action: PayloadAction<Range>) => {
      state.range = action.payload;
    },
    selectSearch: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    reset: () => initialState,
  },
});

export const { selectCategory, selectRange, selectSearch, reset } =
  productsSlice.actions;

export default productsSlice.reducer;
