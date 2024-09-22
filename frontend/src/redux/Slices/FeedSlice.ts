import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { FeedPost, Post } from "../../utils/GlobalInterface";
import dayjs from "dayjs";

const baseUrl = process.env.REACT_APP_API_URL;

interface FeedSliceState {
  posts: FeedPost[];
  currentPost: Post | undefined;
  currentPageNumber: number;
  sessionStart: Date | undefined;
  loading: boolean;
  error: boolean;
}

interface LoadFeedPagePayload {
  token: string;
  userId: number;
}

interface FetchNextPagePayload {
  token: string;
  userId: number;
  page: number;
  sessionStart: Date;
}

const initialState: FeedSliceState = {
  posts: [],
  currentPost: undefined,
  currentPageNumber: 0,
  sessionStart: undefined,
  loading: false,
  error: false,
};

export const loadFeedPage = createAsyncThunk(
  "feed/feedPage",
  async (payload: LoadFeedPagePayload, thunkAPI) => {
    try {
      // Chuyển đổi `sessionStart` thành chuỗi ISO không bao gồm múi giờ
      const formattedSessionStart = dayjs().format(
        "YYYY-MM-DDTHH:mm:ss.SSSSSS"
      );
      // console.log("sessions start: " + formattedSessionStart);

      let req = await axios.post(
        `${baseUrl}/feeds`,
        {
          userId: payload.userId,
          page: 0,
          sessionStart: formattedSessionStart,
        },
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
          },
        }
      );

      let posts = req.data;
      // console.log("posts: ", posts);

      return posts;
      //
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const fetchNextFeedPage = createAsyncThunk(
  "feed/nextPage",
  async (payload: FetchNextPagePayload, thunkAPI) => {
    try {
      const formattedSessionStart = dayjs().format(
        "YYYY-MM-DDTHH:mm:ss.SSSSSS"
      );
      // console.log("(fetch) sessions start: " + formattedSessionStart);

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
      console.log("posts: ", posts);

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
        // console.log("ss: ", action.payload.sessionStart);
        state = {
          ...state,
          posts: action.payload.posts,
          sessionStart: action.payload.sessionStart,
          currentPageNumber: 1,
          loading: false,
          error: false,
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

    // fetch feed page
    builder.addCase(fetchNextFeedPage.fulfilled, (state, action) => {
      state = {
        ...state,
        posts: [...state.posts, ...action.payload.posts],
        sessionStart: action.payload.sessionStart,
        currentPageNumber: action.payload.page + 1,
        loading: false,
        error: false,
      };

      return state;
    });
  },
});

export const { setCurrentPost } = FeedSlice.actions;
export default FeedSlice.reducer;
