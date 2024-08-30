import React, { useEffect, useRef, useState } from "react";

import { Close, Search } from "@mui/icons-material";
import { AppDispatch } from "../../../../../redux/Store";
import { useDispatch } from "react-redux";
import { updateDisplayGif } from "../../../../../redux/Slices/ModalSlice";

import "./FeedPostCreatorGifModalTop.css";

export const FeedPostCreatorGifModalTop: React.FC = () => {
  //
  const dispatch: AppDispatch = useDispatch();

  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

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

  const handleChangeValue = (e: React.FocusEvent<HTMLInputElement>) => {
    // Where the logic for searching goes
    setInputValue(e.target.value);
  };

  const handleCloseModal = () => {
    dispatch(updateDisplayGif());
  };

  const clearInput = () => {
    setInputValue("");
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
            !inputFocused && inputValue.length > 0
              ? { width: `${inputValue.length + 1}ch` }
              : {}
          }
          className="feed-post-creator-gif-modal-top-input"
          placeholder="Search for GIFs..."
          value={inputValue}
          onChange={handleChangeValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={inputRef}
        />
        {inputValue && inputFocused ? (
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
