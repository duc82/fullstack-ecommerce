import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: number;
  name: string;
  slug: string;
  cost: number;
  image: string;
  quantity: number;
  stock: number;
};

type CartState = {
  items: CartItem[];
  total: number;
};

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      if (newItem.quantity < 1) {
        return;
      }
      const itemInCart = state.items.find((item) => item.id === newItem.id);

      if (itemInCart) {
        if (itemInCart.quantity + newItem.quantity > itemInCart.stock) {
          return;
        }
        itemInCart.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
      state.total += newItem.cost * newItem.quantity;
    },
    subItemCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      if (newItem.quantity < 1) {
        return;
      }
      const itemInCart = state.items.find((item) => item.id === newItem.id);

      if (itemInCart) {
        if (itemInCart.quantity - newItem.quantity < 1) {
          return;
        }
        itemInCart.quantity -= newItem.quantity;
        state.total -= newItem.cost * newItem.quantity;
      }
    },
    updateItemCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;

      if (newItem.quantity < 1) {
        return;
      }

      const itemInCart = state.items.find((item) => item.id === newItem.id);

      if (itemInCart) {
        if (newItem.quantity > itemInCart.stock) {
          return;
        }
        state.total -= itemInCart.cost * itemInCart.quantity; // subtract old cost
        state.total += newItem.cost * newItem.quantity; // add new cost
        itemInCart.quantity = newItem.quantity; // update quantity
        itemInCart.cost = newItem.cost; // update cost
      }
    },
    deleteItemCart: (state, action: PayloadAction<CartItem["id"]>) => {
      const idItem = action.payload;
      const deletedIndex = state.items.findIndex((item) => item.id === idItem);
      if (deletedIndex > -1) {
        const deletedCost =
          state.items[deletedIndex].cost * state.items[deletedIndex].quantity;
        state.total -= deletedCost;
        state.items.splice(deletedIndex, 1);
      }
    },
  },
});

export const { addItemCart, subItemCart, updateItemCart, deleteItemCart } =
  cartSlice.actions;

export default cartSlice.reducer;
