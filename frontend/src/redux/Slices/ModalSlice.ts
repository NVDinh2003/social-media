import { Gif } from "@mui/icons-material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalSliceState {
  displayEditPostImage: boolean;
  displayTagPeople: boolean;
  displayGif: boolean;
  displaySchedule: boolean;
  displayCreateReply: boolean;
  displayPostMore: boolean;
  displayMentionLearnMore: boolean;
  displayPostMention: boolean;
}

const initialState: ModalSliceState = {
  displayEditPostImage: false,
  displayTagPeople: false,
  displayGif: false,
  displaySchedule: false,
  displayCreateReply: false,
  displayPostMore: false,
  displayMentionLearnMore: false,
  displayPostMention: false,
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

    updateDisplayPostMore(state) {
      state = {
        ...state,
        displayPostMore: !state.displayPostMore,
      };
      return state;
    },

    updateDisplatMentionLearnMore(state) {
      state = {
        ...state,
        displayMentionLearnMore: !state.displayMentionLearnMore,
      };

      return state;
    },

    updateDisplayPostMention(state, action: PayloadAction<boolean>) {
      state = {
        ...state,
        displayPostMention: action.payload,
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
  updateDisplayPostMore,
  updateDisplatMentionLearnMore,
  updateDisplayPostMention,
} = ModalSlice.actions;

export default ModalSlice.reducer;
