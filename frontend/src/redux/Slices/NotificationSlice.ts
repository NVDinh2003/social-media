import axios from "axios";
import { Notification } from "./../../utils/GlobalInterface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationSliceState {
  newPostNotifications: Notification[];
  postActionNotifications: Notification[];
  mentionNotifications: Notification[];
  messageNotifications: Notification[];
  followNotifications: Notification[];
}

interface loadNotificationsPayload {
  userId: number;
  token: string;
}

interface ReadNotificationsPayload {
  notifications: Notification[];
  token: string;
}

const initialState: NotificationSliceState = {
  newPostNotifications: [],
  postActionNotifications: [],
  mentionNotifications: [],
  messageNotifications: [],
  followNotifications: [],
};
const baseUrl = process.env.REACT_APP_API_URL;

export const loadNotifications = createAsyncThunk(
  "notification/load",
  async (payload: loadNotificationsPayload, thunkAPI) => {
    try {
      let req = await axios.get(`${baseUrl}/notifications/${payload.userId}`, {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      });

      return req.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const readNotifications = createAsyncThunk(
  "notification/read",
  async (payload: ReadNotificationsPayload, thunkAPI) => {
    try {
      await axios.post(
        `${baseUrl}/notifications/acknowledge`,
        {
          notifications: payload.notifications,
        },
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
          },
        }
      );

      return payload.notifications;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

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
        case "BOOKMARK":
          state = {
            ...state,
            postActionNotifications: [
              action.payload,
              ...state.postActionNotifications,
            ],
          };
          return state;
        case "REPLY":
        case "MENTION":
          state = {
            ...state,
            mentionNotifications: [
              action.payload,
              ...state.mentionNotifications,
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
  },
  extraReducers: (builder) => {
    builder.addCase(loadNotifications.fulfilled, (state, action) => {
      let posts: Notification[] = [];
      let mentions: Notification[] = [];
      let messages: Notification[] = [];
      let follow: Notification[] = [];

      let allNotifications: Notification[] = action.payload;
      for (let notification of allNotifications) {
        switch (notification.notificationType) {
          case "LIKE":
          case "REPOST":
          case "BOOKMARK":
            posts.push(notification);
            break;
          case "REPLY":
          case "MENTION":
            mentions.push(notification);
            break;
          case "FOLLOW":
            follow.push(notification);
            break;
          default:
            messages.push(notification);
        }
      }

      state = {
        ...state,
        postActionNotifications: posts,
        mentionNotifications: mentions,
        followNotifications: follow,
        messageNotifications: messages,
      };

      return state;
    });

    builder.addCase(readNotifications.fulfilled, (state, action) => {
      let posts: Notification[] = [];
      let mentions: Notification[] = [];
      let messages: Notification[] = [];
      let follow: Notification[] = [];

      if (
        action.payload.length > 0 &&
        action.payload[0].notificationType === "NEW_POST"
      ) {
        state = {
          ...state,
          newPostNotifications: [],
        };
        return state;
      }

      let allNotifications = [
        ...state.postActionNotifications,
        ...state.mentionNotifications,
        ...state.followNotifications,
        ...state.messageNotifications,
      ];

      let readNotifications = action.payload.map((notification) => {
        return {
          ...notification,
          acknowledged: true,
        };
      });

      for (let i = 0; i < allNotifications.length; i++) {
        for (let j = 0; j < readNotifications.length; j++) {
          if (
            allNotifications[i].notificationId ===
            readNotifications[j].notificationId
          ) {
            allNotifications.splice(i, 1, readNotifications[j]);
          }
        }
      }

      for (let notification of allNotifications) {
        switch (notification.notificationType) {
          case "LIKE":
          case "REPOST":
          case "BOOKMARK":
            posts.push(notification);
            break;
          case "REPLY":
          case "MENTION":
            mentions.push(notification);
            break;
          case "FOLLOW":
            follow.push(notification);
            break;
          default:
            messages.push(notification);
        }
      }

      state = {
        ...state,
        postActionNotifications: posts,
        mentionNotifications: mentions,
        followNotifications: follow,
        messageNotifications: messages,
      };

      return state;
    });
  },
});

export const { recievedNotification } = NotificationSlice.actions;

export default NotificationSlice.reducer;
