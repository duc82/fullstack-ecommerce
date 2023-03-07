import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Images {
  id: number;
  src: string;
  alt: string;
}

interface Rating {
  id: number;
  rating: number;
  name: string;
  email: string;
  title: string;
  comment: string;
}

interface Category {
  id: number;
  title: string;
}

export interface ProductState {
  id: number;
  name: string;
  slug: string;
  brand: string;
  model: string;
  bonus: string;
  status: string;
  stock: number;
  discount: number;
  price: number;
  cost: number;
  avgRating: number;
  currency: string;
  images: Images[];
  ratings: Rating[];
  categories?: Category[];
  category: string;
  ratingCount: number;
  desc: string;
  createdAt: Date;
  updatedAt: Date;
}

interface InitialProduct {
  datas: {
    products: ProductState[];
    product: ProductState | null;
    limitProduct: number;
    totalProduct: number;
    totalPage: number;
    currentPage: number;
  };
  isLoading: boolean;
  error: string;
}

export const initialProduct: InitialProduct = {
  datas: {
    products: [],
    product: null,
    limitProduct: 0,
    totalProduct: 0,
    totalPage: 0,
    currentPage: 1,
  },
  isLoading: false,
  error: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialProduct,
  reducers: {
    getProductStart: (state) => {
      state.error = "";
      state.isLoading = true;
    },
    getProductSuccess: (
      state,
      action: PayloadAction<InitialProduct["datas"]>
    ) => {
      state.isLoading = false;
      state.datas = {
        ...action.payload,
        product: state.datas.product,
      };
    },

    getSingleProductSuccess: (state, action: PayloadAction<ProductState>) => {
      state.isLoading = false;
      state.datas.product = action.payload;
    },

    getProductFailed: (
      state,
      action: PayloadAction<InitialProduct["error"]>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailed,
  getSingleProductSuccess,
} = productSlice.actions;

export default productSlice.reducer;
