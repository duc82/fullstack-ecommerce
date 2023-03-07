import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataAuth {
  accessToken?: string;
  message: string;
}

interface InitialAuth {
  isLoading: boolean;
  data: DataAuth | null;
  error: string;
  isLoggedIn: boolean;
}

const initialAuth: InitialAuth = {
  isLoading: false,
  data: null,
  error: "",
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {
    signUpStart: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    signUpSuccess: (state) => {
      state.isLoading = false;
      state.error = "";
    },
    signUpFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    signInStart: (state) => {
      state.isLoading = true;
    },
    signInSuccess: (state, action: PayloadAction<DataAuth>) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isLoggedIn = true;
    },
    signInFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.data = null;
    },

    forgotPasswordStart: (state) => {
      state.isLoading = true;
      state.error = "";
    },

    forgotPasswordSuccess: (state, action: PayloadAction<DataAuth>) => {
      state.isLoading = false;
      state.data = action.payload;
    },

    forgotPasswordFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.data = null;
    },

    verifyRecoveryFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    resetPasswordStart: (state) => {
      state.isLoading = true;
      state.data = null;
      state.error = "";
    },

    resetPasswordSuccess: (state, action: PayloadAction<DataAuth>) => {
      state.isLoading = false;
      state.data = action.payload;
    },

    resetPasswordFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.data = null;
    },

    resetAuth: () => initialAuth,
  },
});

export const {
  signUpStart,
  signUpSuccess,
  signUpFailed,
  signInStart,
  signInSuccess,
  signInFailed,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailed,
  verifyRecoveryFailed,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailed,
  resetAuth,
} = authSlice.actions;

export default authSlice.reducer;
