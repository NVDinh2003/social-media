import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Conversation,
  Notification as INotification,
} from "../../utils/GlobalInterface";
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

interface ConversationUser {
  userId: number;
  pfp: string;
  nickname: string;
}

interface MessagesSliceState {
  unreadMessages: INotification[];
  popupOpen: boolean;
  conversationOpen: boolean;
  conversationUsers: ConversationUser[];
  conversations: Conversation[];
  loading: boolean;
  error: boolean;
}

interface LoadConversationPayload {
  userId: number;
  token: string;
}

const initialState: MessagesSliceState = {
  unreadMessages: [],
  popupOpen: false,
  conversationOpen: false,
  conversationUsers: [],
  conversations: [],
  loading: false,
  error: false,
};

export const loadConversations = createAsyncThunk(
  "message/load",
  async (payload: LoadConversationPayload, thunkAPI) => {
    try {
      const req = await axios.get(
        `${baseURL}/conversations?userId=${payload.userId}`,
        {
          headers: { Authorization: `Bearer ${payload.token}` },
        }
      );
      return req.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const MessageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    togglePopup: (state) => {
      state = {
        ...state,
        popupOpen: !state.popupOpen,
      };
      return state;
    },
    openConversation: (state, action: PayloadAction<ConversationUser[]>) => {
      state = {
        ...state,
        conversationOpen: !state.conversationOpen,
      };
      return state;
    },
    updateUnreadMessages: (state, action: PayloadAction<INotification[]>) => {
      state = {
        ...state,
        unreadMessages: action.payload,
      };
      return state;
    },
    updateConversationUsers: (
      state,
      action: PayloadAction<ConversationUser[]>
    ) => {
      state = {
        ...state,
        conversationUsers: action.payload,
      };
      return state;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadConversations.pending, (state, action) => {
        state = {
          ...state,
          error: false,
          loading: true,
        };
        return state;
      })
      .addCase(loadConversations.fulfilled, (state, action) => {
        state = {
          ...state,
          conversations: action.payload,
          loading: false,
        };
        return state;
      })
      .addCase(loadConversations.rejected, (state, action) => {
        state = {
          ...state,
          error: true,
          loading: false,
        };
        return state;
      });
  },
});

export const {
  togglePopup,
  openConversation,
  updateUnreadMessages,
  updateConversationUsers,
} = MessageSlice.actions;

export default MessageSlice.reducer;
