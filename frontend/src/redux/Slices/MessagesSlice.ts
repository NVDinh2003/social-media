import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Conversation,
  ConversationUser,
  Notification as INotification,
} from "../../utils/GlobalInterface";
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

interface MessagesSliceState {
  unreadMessages: INotification[];
  popupOpen: boolean;
  conversationOpen: boolean;
  conversationUsers: ConversationUser[];
  conversations: Conversation[];
  conversation: Conversation | undefined;
  loading: boolean;
  error: boolean;
}

interface LoadConversationPayload {
  userId: number;
  token: string;
}

interface OpenConversationPayload {
  token: string;
  conversationUsers: ConversationUser[];
}

const initialState: MessagesSliceState = {
  unreadMessages: [],
  popupOpen: false,
  conversationOpen: false,
  conversationUsers: [],
  conversations: [],
  conversation: undefined,
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

export const openConversation = createAsyncThunk(
  "message/open",
  async (payload: OpenConversationPayload, thunkAPI) => {
    const state: any = thunkAPI.getState();
    let conversations: Conversation[] = state?.message?.conversations;

    if (conversations) {
      let selectedConversationUsers = payload.conversationUsers.map(
        (u) => u.userId
      );
      let allConversationWithUserIds = conversations.map((c) => {
        return {
          ...c,
          conversationUsers: c.conversationUsers.map((u) => u.userId),
        };
      });

      for (let i = 0; i < allConversationWithUserIds.length; i++) {
        if (
          allConversationWithUserIds[i].conversationUsers.sort().join(",") ===
          selectedConversationUsers.sort().join(",")
        ) {
          return conversations.filter(
            (c) =>
              c.conversationId === allConversationWithUserIds[i].conversationId
          )[0];
        }
      }
    }

    try {
      let req = await axios.post(
        `${baseURL}/conversations`,
        {
          userIds: payload.conversationUsers.map((u) => u.userId),
        },
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
          },
        }
      );

      let conversation = req.data;
      return conversation;
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

    builder
      .addCase(openConversation.pending, (state, action) => {
        state = {
          ...state,
          error: false,
          loading: true,
        };
        return state;
      })
      .addCase(openConversation.fulfilled, (state, action) => {
        state = {
          ...state,
          loading: false,
          popupOpen: true,
          conversationOpen: true,
          conversation: action.payload,
          conversationUsers: [],
          conversations: [action.payload, ...state.conversations],
        };
        return state;
      })
      .addCase(openConversation.rejected, (state, action) => {
        state = {
          ...state,
          error: true,
          loading: false,
        };
        return state;
      });
  },
});

export const { togglePopup, updateUnreadMessages, updateConversationUsers } =
  MessageSlice.actions;

export default MessageSlice.reducer;
