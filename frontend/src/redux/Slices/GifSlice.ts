import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";

import axios from "axios";

import { TENOR_KEY } from "../../config";
import { TenorCategories } from "../../utils/GlobalInterface";

const CLIENT_KEY = "EnVidi-Twitter";
const TENOR_URL = "https://tenor.googleapis.com/v2";

interface GifSliceState {
  searchTerm: string;
  preview: boolean;
  next: string;
  gifs: string[];
  gifCategories: TenorCategories[];
  loading: boolean;
  error: boolean;
}

export interface NextGifPayload {
  term: string;
  next: string;
}

const initialState: GifSliceState = {
  searchTerm: "",
  preview: false,
  next: "",
  gifs: [],
  gifCategories: [],
  loading: false,
  error: false,
};

export const fetchGifCategories = createAsyncThunk(
  "gif/category",
  async (payload, thunkAPI) => {
    try {
      let url = `${TENOR_URL}/categories?key=${TENOR_KEY}&client_key=${CLIENT_KEY}`;

      let res = await axios.get(url);

      //   console.log(res.data);

      let data = [];

      for (let i = 0; i < 8; i++) {
        data.push(res.data.tags[i]);
      }

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const fetchGifByTerm = createAsyncThunk(
  "gif/term",
  async (payload: string, thunkAPI) => {
    try {
      let searchUrl = `${TENOR_URL}/search?q=${payload}&key=${TENOR_KEY}&client_key=${CLIENT_KEY}&limit=32`;

      let res = await axios.get(searchUrl);

      return {
        data: res.data,
        term: payload,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const fetchNextGifs = createAsyncThunk(
  "gif/next",
  async (payload: NextGifPayload, thunkAPI) => {
    try {
      let searchUrl = `${TENOR_URL}/search?q=${payload}&key=${TENOR_KEY}&client_key=${CLIENT_KEY}&limit=32&pos=${payload.next}`;

      let res = await axios.get(searchUrl);

      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const GifSlice = createSlice({
  name: "gif",
  initialState,
  reducers: {
    updateSearchTerm(state, action: PayloadAction<string>) {
      state = {
        ...state,
        searchTerm: action.payload,
      };
      return state;
    },

    updatePreview(state, action: PayloadAction<boolean>) {
      state = {
        ...state,
        preview: action.payload,
      };
      return state;
    },

    clearGifs(state) {
      state = {
        ...state,
        gifs: [],
      };
      return state;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchGifCategories.fulfilled, (state, action) => {
      state = {
        ...state,
        loading: false,
        gifCategories: action.payload,
      };
      return state;
    });

    builder.addCase(fetchGifByTerm.fulfilled, (state, action) => {
      let results = action.payload.data.results;

      let gifUrls: string[] = [];

      results.forEach((item: any) => {
        gifUrls.push(item.media_formats.gif.url);
      });

      state = {
        ...state,
        searchTerm: action.payload.term,
        gifs: gifUrls,
        next: action.payload.data.next,
        loading: false,
      };

      return state;
    });

    builder.addCase(fetchNextGifs.fulfilled, (state, action) => {
      let results = action.payload.results;

      let gifUrls: string[] = [];

      results.forEach((item: any) => {
        gifUrls.push(item.media_formats.gif.url);
      });

      state = {
        ...state,
        gifs: [...state.gifs, ...gifUrls],
        next: action.payload.next,
        loading: false,
      };

      return state;
    });

    builder.addMatcher(isPending, (state, action) => {
      state = {
        ...state,
        loading: true,
        error: false,
      };

      return state;
    });

    builder.addMatcher(isRejected, (state, action) => {
      state = {
        ...state,
        loading: false,
        error: true,
      };

      return state;
    });
  },
});

export const { updateSearchTerm, updatePreview, clearGifs } = GifSlice.actions;

export default GifSlice.reducer;
