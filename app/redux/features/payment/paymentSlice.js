import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paymentService from "./paymentService";

const initialState = {
  clientSecret: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get client secret
export const getClientSecret = createAsyncThunk(
  "payment/getClientSecret",
  async (_, thunkAPI) => {
    try {
      const id = thunkAPI.getState().auth.user._id;
      const token = thunkAPI.getState().auth.user.token;
      return await paymentService.getClientSecret(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClientSecret.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClientSecret.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.clientSecret = action.payload;
      })
      .addCase(getClientSecret.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.clientSecret = "";
      })
  },
});

export const { reset } = paymentSlice.actions;
export default paymentSlice.reducer;
