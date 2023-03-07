import { CartItem } from "./../../components/Cart/Cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Carts {
  carts: CartItem[];
  message: string;
}

const initialState: Carts = {
  carts: [],
  message: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    getCart: (state, action: PayloadAction<CartItem[]>) => {
      state.carts = action.payload;
    },
    addCart: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { getCart, addCart } = cartSlice.actions;

export default cartSlice.reducer;
