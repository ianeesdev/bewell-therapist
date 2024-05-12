import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chatService from "./chatService";

// Get chats and messages from localStorage
const chats = JSON.parse(localStorage.getItem("chats"));
const messages = JSON.parse(localStorage.getItem("messages"));
const activeChat = JSON.parse(localStorage.getItem("activeChat"));

const initialState = {
  activeChat: activeChat ? activeChat : null,
  chats: chats ? chats : null,
  messages: messages ? messages : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new chat
export const createOrOpenChat = createAsyncThunk(
  "chat/create",
  async (userID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.therapist.token;
      return await chatService.createOrOpenChat(userID, token);
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

// Get All chats
export const getUserChats = createAsyncThunk(
  "chat/getUserChats",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.therapist.token;
      return await chatService.getUserChats(token);
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

// Send Message
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.therapist.token;
      return await chatService.sendMessage(data, token);
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

// Get all messages
export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async (chatId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.therapist.token;
      return await chatService.getMessages(chatId, token);
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

export const chatSlice = createSlice({
  name: "chats",
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
      .addCase(createOrOpenChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrOpenChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.activeChat = action.payload;
        state.message = "";
      })
      .addCase(createOrOpenChat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserChats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chats = action.payload;
        state.message = "";
      })
      .addCase(getUserChats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = action.payload;
        state.message = "";
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = action.payload;
        state.message = "";
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = chatSlice.actions;
export default chatSlice.reducer;
