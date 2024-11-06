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
  sessionStart: Date;
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
      const formattedSessionStart = dayjs(payload.sessionStart).format(
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
      console.log("posts: ", posts);

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
      const formattedSessionStart = dayjs(payload.sessionStart).format(
        "YYYY-MM-DDTHH:mm:ss.SSSSSS"
      );
      console.log("(fetch) sessions start: " + formattedSessionStart);

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

    setSessionTime(state, action: PayloadAction<Date | undefined>) {
      state = {
        ...state,
        sessionStart: action.payload,
      };

      return state;
    },
    setCurrentPageNumber(state /*action: PayloadAction<number>*/) {
      const pageSize =
        Number(process.env.REACT_APP_FETCH_FEED_POST_PAGE_SIZE) || 50;
      state = {
        ...state,
        currentPageNumber: state.posts.length / pageSize,
      };
      return state;
    },
    updatePost(state, action: PayloadAction<Post>) {
      let updatedPosts: FeedPost[] = state.posts.map((post) => {
        if (action.payload.postId === post.post.postId) {
          return {
            post: action.payload,
            replyTo: post.replyTo,
            repost: post.repost,
            repostUser: post.repostUser,
          };
        }
        return post;
      });

      if (
        state.currentPost &&
        state.currentPost.postId === action.payload.postId
      ) {
        state = {
          ...state,
          currentPost: action.payload,
        };
      }

      state = {
        ...state,
        posts: updatedPosts,
      };

      return state;
    },

    setFeedPosts(state, action: PayloadAction<FeedPost[]>) {
      state = {
        ...state,
        posts: action.payload,
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
          posts: action.payload.posts,
          sessionStart: action.payload.sessionStart,
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
      if (
        state.posts.length > 0 &&
        state.posts[0].post.postId === action.payload.posts[0].post.postId
      )
        return state;

      state = {
        ...state,
        posts: [...state.posts, ...action.payload.posts],
        sessionStart: action.payload.sessionStart,
        loading: false,
        error: false,
      };

      return state;
    });
  },
});

export const {
  setCurrentPost,
  setSessionTime,
  setCurrentPageNumber,
  updatePost,
  setFeedPosts,
} = FeedSlice.actions;
export default FeedSlice.reducer;
