import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Poll,
  PollChoice,
  Post,
  PostImage,
  User,
} from "../../utils/GlobalInterface";
import axios from "axios";
import FormData from "form-data";

export interface PostSliceState {
  loading: boolean;
  error: boolean;
  currentPost: Post | undefined;
  posts: Post[];
  currentPostImages: File[];
}

interface updatePostPayload {
  name: string;
  value: string | number | boolean | PostImage[];
}

interface createPostBody {
  content: string;
  author: User;
  images: PostImage[];
  poll: Poll | undefined;
  replies: Post[];
  scheduled: boolean;
  scheduledDate: Date | undefined;
  audience: "EVERYONE" | "CIRCLE";
  replyRestriction: "EVERYONE" | "FOLLOW" | "CIRCLE" | "MENTION";
  token: string;
}

interface CreatePostWithMediaBody extends createPostBody {
  imageFiles: File[];
}

interface UpdatePollPayload {
  index: number;
  choiceText: string;
}

const initialState: PostSliceState = {
  loading: false,
  error: false,
  currentPost: undefined,
  posts: [],
  currentPostImages: [],
};

export const createPost = createAsyncThunk(
  "post/create",
  async (body: createPostBody, thunkAPI) => {
    try {
      let post = {
        content: body.content,
        author: body.author,
        images: body.images,
        poll: body.poll,
        replies: [],
        scheduled: body.scheduled,
        scheduledDate: body.scheduledDate,
        audience: body.audience,
        replyRestriction: body.replyRestriction,
      };

      // console.log("post created", post);

      const req = await axios.post(
        `${process.env.REACT_APP_API_URL}/posts`,
        post,
        { headers: { Authorization: `Bearer ${body.token}` } }
      );
      return req.data;
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

export const createPostWithMedia = createAsyncThunk(
  "post/create-media",
  async (body: CreatePostWithMediaBody, thunkAPI) => {
    try {
      const images = body.imageFiles;

      let data = new FormData();

      let post = {
        content: body.content,
        author: body.author,
        replies: body.replies,
        scheduled: body.scheduled,
        scheduledDate: body.scheduledDate,
        audience: body.audience,
        replyRestriction: body.replyRestriction,
      };

      data.append("post", JSON.stringify(post));
      images.forEach((image) => data.append("media", image));

      let config = {
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/posts/media`,
        headers: {
          Authorization: `Bearer ${body.token}`,
          "Content-Type": "multipart/form-data",
        },
        data,
      };

      let res = await axios(config);

      return res.data;
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

export const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    initializeCurrentPost(state, action: PayloadAction<Post>) {
      if (!state.currentPost) state.currentPost = action.payload;
      else {
        state = {
          ...state,
          currentPost: action.payload,
        };
      }

      return state;
    },

    updateCurrentPost(state, action: PayloadAction<updatePostPayload>) {
      if (state.currentPost)
        state.currentPost = {
          ...state.currentPost,
          [action.payload.name]: action.payload.value,
        };

      return state;
    },

    updateCurrentPostImages(state, action: PayloadAction<File[]>) {
      state = {
        ...state,
        currentPostImages: action.payload,
      };

      return state;
    },

    createPoll(state) {
      let choices: PollChoice[] = [
        {
          pollChoiceId: 0,
          choiceText: "",
          votes: [],
        },
        {
          pollChoiceId: 0,
          choiceText: "",
          votes: [],
        },
      ];

      let poll: Poll = {
        pollId: 0,
        endTime: "1:0:0",
        choices,
      };

      let post = JSON.parse(JSON.stringify(state.currentPost));
      post = {
        ...post,
        poll,
      };

      state = {
        ...state,
        currentPost: post,
      };

      return state;
    },

    updatePoll(state, action: PayloadAction<UpdatePollPayload>) {
      if (state.currentPost && state.currentPost.poll) {
        let post = JSON.parse(JSON.stringify(state.currentPost));
        let poll = post.poll;
        let choices = poll.choices;

        if (choices.length - 1 < action.payload.index) {
          let choice: PollChoice = {
            pollChoiceId: 0,
            choiceText: action.payload.choiceText,
            votes: [],
          };

          choices[action.payload.index] = choice;
        } else {
          let choice: PollChoice = choices[action.payload.index];

          choice = {
            ...choice,
            choiceText: action.payload.choiceText,
          };

          choices[action.payload.index] = choice;
        }

        poll = {
          ...poll,
          choices,
        };

        post = {
          ...post,
          poll,
        };

        state = {
          ...state,
          currentPost: post,
        };

        // console.log("Choices: ", choices);
        // console.log("Poll: ", poll);
        // console.log("Current Post: ", post);
        // console.log("State: ", state);
      }

      return state;
    },

    removePoll(state) {
      if (state.currentPost && state.currentPost.poll) {
        let post = JSON.parse(JSON.stringify(state.currentPost));
        post = {
          ...post,
          poll: undefined,
        };

        state = {
          ...state,
          currentPost: post,
        };
      }

      return state;
    },

    setPollDate(state, action: PayloadAction<string>) {
      if (state.currentPost && state.currentPost.poll) {
        let post = JSON.parse(JSON.stringify(state.currentPost));
        let poll = post.poll;

        poll = {
          ...poll,
          endTime: action.payload,
        };

        post = {
          ...post,
          poll,
        };

        state = {
          ...state,
          currentPost: post,
        };
      }

      return state;
    },

    setScheduleDate(state, action: PayloadAction<Date>) {
      if (state.currentPost) {
        let post: Post = JSON.parse(JSON.stringify(state.currentPost));

        post = {
          ...post,
          scheduledDate: action.payload,
          scheduled: true,
        };

        state = {
          ...state,
          currentPost: post,
        };
      }

      return state;
    },
    //
  },

  extraReducers: (builder) => {
    builder.addCase(createPost.pending, (state, action) => {
      state = {
        ...state,
        loading: true,
        // error: false,
      };
      return state;
    });

    builder.addCase(createPost.fulfilled, (state, action) => {
      let post: Post = action.payload;

      state = {
        ...state,
        posts: [post, ...state.posts],
        loading: false,
        error: false,
        currentPost: undefined,
      };
      return state;
    });

    builder.addCase(createPost.rejected, (state, action) => {
      state = {
        ...state,
        error: true,
      };
      return state;
    });

    // create post with media
    builder.addCase(createPostWithMedia.pending, (state, action) => {
      state = {
        ...state,
        loading: true,
      };
      return state;
    });

    builder.addCase(createPostWithMedia.fulfilled, (state, action) => {
      let post: Post = action.payload;

      state = {
        ...state,
        posts: [post, ...state.posts],
        loading: false,
        error: false,
        currentPost: undefined,
        currentPostImages: [],
      };
      return state;
    });

    builder.addCase(createPostWithMedia.rejected, (state, action) => {
      state = {
        ...state,
        error: true,
      };
      return state;
    });
  },
});

export const {
  initializeCurrentPost,
  updateCurrentPost,
  updateCurrentPostImages,
  createPoll,
  updatePoll,
  removePoll,
  setPollDate,
  setScheduleDate,
} = PostSlice.actions;
export default PostSlice.reducer;
