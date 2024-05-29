import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import ICartItem from "../../entities/ICartItem";
import apiClient from "../../services/api-client";

interface CartState {
  cart: ICartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CartState = {
  cart: [],
  status: "idle",
  error: null,
};

export const fetchCartData = createAsyncThunk<
  ICartItem[],
  void,
  { rejectValue: string }
>("cart/fetchCartData", async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get<{ data: ICartItem[] }>(
      "customer/cart"
    );
    return response.data.data;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<ICartItem[]>) => {
      state.cart = action.payload;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCartData.fulfilled,
        (state, action: PayloadAction<ICartItem[]>) => {
          state.status = "succeeded";
          state.cart = action.payload;
        }
      )
      .addCase(fetchCartData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setData, reset } = cartSlice.actions;

export default cartSlice.reducer;
