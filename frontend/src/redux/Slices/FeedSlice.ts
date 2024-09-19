import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { FeedPost, Post } from "../../utils/GlobalInterface";
import dayjs from "dayjs";

const baseUrl = process.env.REACT_APP_API_URL;

interface FeedSliceState {
  posts: FeedPost[];
  currentPost: Post | undefined;
  loading: boolean;
  error: boolean;
}

interface LoadFeedPagePayload {
  token: string;
  userId: number;
  sessionStart: Date;
  page: number;
}

const initialState: FeedSliceState = {
  posts: [],
  currentPost: undefined,
  loading: false,
  error: false,
};

export const loadFeedPage = createAsyncThunk(
  "feed/feedPage",
  async (payload: LoadFeedPagePayload, thunkAPI) => {
    try {
      //

      // Chuyển đổi `sessionStart` thành chuỗi ISO không bao gồm múi giờ
      const formattedSessionStart = dayjs(payload.sessionStart).format(
        "YYYY-MM-DDTHH:mm:ss"
      );
      console.log("sessions start: " + formattedSessionStart);

      let req = await axios.post(
        `${baseUrl}/feeds`,
        {
          userId: payload.userId,
          page: payload.page,
          sessionStart: formattedSessionStart,
        },
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
          },
        }
      );

      let posts = req.data;
      console.log(posts);

      return posts;
      //
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const FeedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setCurrentPost(state, action: PayloadAction<Post | undefined>) {
      state = {
        ...state,
        currentPost: action.payload,
      };

      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFeedPage.pending, (state, payload) => {
        state = {
          ...state,
          loading: true,
          error: false,
        };

        return state;
      })
      .addCase(loadFeedPage.fulfilled, (state, action) => {
        state = {
          ...state,
          posts: action.payload,
          loading: false,
        };

        return state;
      })
      .addCase(loadFeedPage.rejected, (state, action) => {
        state = {
          ...state,
          loading: false,
          error: true,
        };

        return state;
      });
  },
});

export const { setCurrentPost } = FeedSlice.actions;
export default FeedSlice.reducer;
