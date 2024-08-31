import { AppDispatch } from "./../Store";
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

interface GifSliceState {
  searchTerm: string;
  preview: boolean;
  next: string;
  gifs: string[];
  gifCategories: TenorCategories[];
  loading: boolean;
  error: boolean;
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
      let clientKey = "EnVidi-Twitter";
      let url = `https://tenor.googleapis.com/v2/categories?key=${TENOR_KEY}&client_key=${clientKey}`;

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
