import { Notification } from "./../../utils/GlobalInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationSliceState {
  newPostNotifications: Notification[];
  postActionNotifications: Notification[];
  messageNotifications: Notification[];
  followNotifications: Notification[];
}

const initialState: NotificationSliceState = {
  newPostNotifications: [],
  postActionNotifications: [],
  messageNotifications: [],
  followNotifications: [],
};

export const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    recievedNotification(state, action: PayloadAction<Notification>) {
      switch (action.payload.notificationType) {
        case "NEW_POST":
          state = {
            ...state,
            newPostNotifications: [
              action.payload,
              ...state.newPostNotifications,
            ],
          };
          return state;
        case "LIKE":
        case "REPOST":
        case "REPLY":
        case "BOOKMARK":
          state = {
            ...state,
            postActionNotifications: [
              action.payload,
              ...state.postActionNotifications,
            ],
          };
          return state;
        case "MESSAGE":
          state = {
            ...state,
            messageNotifications: [
              action.payload,
              ...state.messageNotifications,
            ],
          };
          return state;
        case "FOLLOW":
          state = {
            ...state,
            followNotifications: [action.payload, ...state.followNotifications],
          };
          return state;
        default:
          return state;
      }
    },

    readNotifications(state, action: PayloadAction<string>) {
      switch (action.payload) {
        case "NEW_POST":
          state = {
            ...state,
            newPostNotifications: [],
          };
          return state;
        default:
          return state;
      }
    },
  },
});

export const { recievedNotification, readNotifications } =
  NotificationSlice.actions;

export default NotificationSlice.reducer;
