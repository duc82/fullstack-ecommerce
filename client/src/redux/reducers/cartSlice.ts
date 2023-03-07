import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Carts {
  id: number;
  name: string;
  slug: string;
  cost: number;
  image: string;
  quantity: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [] as Carts[],
  },
  reducers: {
    addCart: (state, action: PayloadAction<Carts>) => {
      const cartItem = action.payload;
      const itemInCart = state.carts.find((cart) => cart.id === cartItem.id);
      if (itemInCart) {
        itemInCart.quantity += cartItem.quantity;
      } else {
        state.carts = [...state.carts, cartItem];
      }
    },
  },
});

export const { addCart } = cartSlice.actions;

export default cartSlice.reducer;
