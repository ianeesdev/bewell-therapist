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
export const handlePaymentCompletion = createAsyncThunk(
  "payment/handlePaymentCompletion",
  async (_, thunkAPI) => {
    try {
      const therapistId = thunkAPI.getState().auth.therapist._id;
      const token = thunkAPI.getState().auth.therapist.token;
      return await paymentService.handlePaymentCompletion(therapistId, token);
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
      .addCase(handlePaymentCompletion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handlePaymentCompletion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(handlePaymentCompletion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.clientSecret = "";
      })
  },
});

export const { reset } = paymentSlice.actions;
export default paymentSlice.reducer;
