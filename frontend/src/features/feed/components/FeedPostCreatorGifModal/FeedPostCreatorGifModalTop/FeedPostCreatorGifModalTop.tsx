import React, { useEffect, useRef, useState } from "react";

import { Close, Search } from "@mui/icons-material";
import { AppDispatch, RootState } from "../../../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import {
  updateDisplayGif,
  updateDisplayMessageGif,
} from "../../../../../redux/Slices/ModalSlice";

import "./FeedPostCreatorGifModalTop.css";
import {
  clearGifs,
  fetchGifByTerm,
  updateSearchTerm,
} from "../../../../../redux/Slices/GifSlice";

export const FeedPostCreatorGifModalTop: React.FC = () => {
  //
  const searchTerm = useSelector((state: RootState) => state.gif.searchTerm);
  const modalState = useSelector((state: RootState) => state.modal);
  const dispatch: AppDispatch = useDispatch();

  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [timer, setTimer] = useState<any>();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (!inputFocused) setInputFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    const relatedTarget: any = e.nativeEvent.relatedTarget;

    if (relatedTarget && relatedTarget.id === "clear") {
      clearInput();
    } else {
      setInputFocused(false);
    }
  };

  const handleKeyUp = () => {
    clearTimeout(timer);
    let t = setTimeout(searchForGifs, 1000);
    setTimer(t);
  };

  const searchForGifs = () => {
    if (inputRef && inputRef.current && inputRef.current.value !== "") {
      dispatch(fetchGifByTerm(inputRef.current.value));
    }
  };

  const handleChangeValue = (e: React.FocusEvent<HTMLInputElement>) => {
    // Where the logic for searching goes
    dispatch(updateSearchTerm(e.target.value));
  };

  const handleCloseModal = () => {
    if (modalState.displayGif) dispatch(updateDisplayGif());
    if (modalState.displayMessageGif) dispatch(updateDisplayMessageGif());
  };

  const clearInput = () => {
    dispatch(updateSearchTerm(""));
    dispatch(clearGifs());
    setInputFocused(true);

    if (inputRef && inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="feed-post-creator-gif-modal-top">
      <div
        className="feed-post-creator-gif-modal-top-close-bg"
        onClick={handleCloseModal}
      >
        <Close sx={{ fontSize: "20px" }} />
      </div>

      <label
        htmlFor="gif-search"
        className={
          inputFocused
            ? "feed-post-creator-gif-modal-top-input-wrapper input-wrapper-active"
            : "feed-post-creator-gif-modal-top-input-wrapper input-wrapper-inactive"
        }
      >
        <div className="feed-post-creator-gif-modal-topfeed-post-creator-gif-modal-search">
          <Search sx={{ fontSize: "20px", color: "rgb(83,100,113)" }} />
        </div>

        <input
          id="gif-search"
          style={
            !inputFocused && searchTerm.length > 0
              ? { width: `${searchTerm.length + 1}ch` }
              : {}
          }
          className="feed-post-creator-gif-modal-top-input"
          placeholder="Search for GIFs..."
          value={searchTerm}
          onChange={handleChangeValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={inputRef}
          onKeyUp={handleKeyUp}
        />
        {searchTerm && inputFocused ? (
          <div className="feed-post-creator-gif-modal-top-clear-border">
            <button
              id="clear"
              className="feed-post-creator-gif-modal-top-clear-input"
            >
              x
            </button>
          </div>
        ) : (
          <></>
        )}
      </label>
    </div>
  );
};
