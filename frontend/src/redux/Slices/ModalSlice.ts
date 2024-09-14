import { Gif } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

interface ModalSliceState {
  displayEditPostImage: boolean;
  displayTagPeople: boolean;
  displayGif: boolean;
  displaySchedule: boolean;
  displayCreateReply: boolean;
}

const initialState: ModalSliceState = {
  displayEditPostImage: false,
  displayTagPeople: false,
  displayGif: false,
  displaySchedule: false,
  displayCreateReply: false,
};

export const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    updateDisplayEditPostImage(state) {
      state = {
        ...state,
        displayEditPostImage: !state.displayEditPostImage,
      };
      return state;
    },

    updateDisplayTagPeople(state) {
      state = {
        ...state,
        displayTagPeople: !state.displayTagPeople,
      };
      return state;
    },

    updateDisplayGif(state) {
      state = {
        ...state,
        displayGif: !state.displayGif,
      };

      return state;
    },

    updateDisplaySchedule(state) {
      state = {
        ...state,
        displaySchedule: !state.displaySchedule,
      };

      return state;
    },

    updateDisplayCreateReply(state) {
      state = {
        ...state,
        displayCreateReply: !state.displayCreateReply,
      };
      return state;
    },
  },
});

export const {
  updateDisplayEditPostImage,
  updateDisplayTagPeople,
  updateDisplayGif,
  updateDisplaySchedule,
  updateDisplayCreateReply,
} = ModalSlice.actions;

export default ModalSlice.reducer;
