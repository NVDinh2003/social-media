import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification as INotification } from "../../utils/GlobalInterface";

interface MessagesSliceState {
  unreadMessages: INotification[];
  popupOpen: boolean;
  conversationOpen: boolean;
  conversationUsers: number[];
}

const initialState: MessagesSliceState = {
  unreadMessages: [],
  popupOpen: false,
  conversationOpen: false,
  conversationUsers: [1],
};

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
    openConversation: (state, action: PayloadAction<number[]>) => {
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
    updateConversationUsers: (state, action: PayloadAction<number[]>) => {
      state = {
        ...state,
        conversationUsers: [...state.conversationUsers, ...action.payload],
      };
      return state;
    },
  },
});

export const {
  togglePopup,
  openConversation,
  updateUnreadMessages,
  updateConversationUsers,
} = MessageSlice.actions;

export default MessageSlice.reducer;
