import React, { useEffect, useState } from "react";
import {
  determineSkinToneColor,
  generateActivities,
  generateAnimalsAndNature,
  generateFlags,
  generateFoodAndDrink,
  generateObjects,
  generateSmileysAndPeople,
  generateSymbols,
  generateTopRow,
  getEmojiCharacterByName,
} from "../../utils/EmojiUtils";

import "./EmojiDropDown.css";
import SearchIcon from "@mui/icons-material/Search";
import DoneIcon from "@mui/icons-material/Done";
import { AppDispatch, RootState } from "../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPost } from "../../redux/Slices/PostSlice";

export const EmojiDropDown: React.FC = () => {
  //
  const [activeCategory, setActiveCategory] = useState<number>(1);
  const [currentEmoji, setCurrentEmoji] = useState<string>("👋");
  const [skinToneSelectorActive, setSkinToneSelectorActive] =
    useState<boolean>(true);
  const [currentSkinTone, setCurrentSkinTone] = useState<string>("none");

  let currentPost = useSelector((state: RootState) => state.post.currentPost);
  let dispatch: AppDispatch = useDispatch();

  let options = {
    root: document.querySelector("#emoji-scroll-area"),
    rootMargin: "0px",
    threshold: 1.0,
  };

  let observer = new IntersectionObserver(calculateCategory, options);
  let headers = document.querySelectorAll(
    ".emoji-drop-down-selector-section-title"
  );
  headers.forEach((element) => {
    if (element !== null) observer.observe(element);
  });

  const navigateToSection = (e: React.MouseEvent<HTMLDivElement>) => {
    let element;
    switch (e.currentTarget.id) {
      case "0":
        setActiveCategory(0);
        element = document.getElementById("Recent");
        if (element) element.scrollIntoView();
        break;
      case "1":
        setActiveCategory(1);
        element = document.getElementById("Smileys & People");
        // console.log(element);
        if (element) element.scrollIntoView();
        break;
      case "2":
        setActiveCategory(2);
        element = document.getElementById("Animals & Nature");
        if (element) element.scrollIntoView();
        break;
      case "3":
        setActiveCategory(3);
        element = document.getElementById("Food & Drink");
        if (element) element.scrollIntoView();
        break;
      case "4":
        setActiveCategory(4);
        element = document.getElementById("Activities");
        if (element) element.scrollIntoView();
        break;
      case "5":
        setActiveCategory(5);
        element = document.getElementById("Travel & Places");
        if (element) element.scrollIntoView();
        break;
      case "6":
        setActiveCategory(6);
        element = document.getElementById("Objects");
        if (element) element.scrollIntoView();
        break;
      case "7":
        setActiveCategory(7);
        element = document.getElementById("Symbols");
        if (element) element.scrollIntoView();
        break;
      // case "Flags":
      default:
        setActiveCategory(8);
        element = document.getElementById("Flags");
        if (element) element.scrollIntoView();
    }
  };

  function calculateCategory(entries: any, observer: any) {
    let intersecting: boolean[] = [];
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        let ele = entry.target;
        let id = ele.id;

        if (id === "smileysAndPeopleHeader") intersecting[1] = true;
        if (id === "animalsAndNatureHeader") intersecting[2] = true;
        if (id === "foodAndDrinkHeader") intersecting[3] = true;
        if (id === "activitiesHeader") intersecting[4] = true;
        if (id === "travelAndPlacesHeader") intersecting[5] = true;
        if (id === "objectsHeader") intersecting[6] = true;
        if (id === "symbolsHeader") intersecting[7] = true;
        if (id === "flagsHeader") intersecting[8] = true;
      }
    });

    let findFirstTrue = (): number => {
      for (let i = 0; i < intersecting.length; i++) {
        if (intersecting[i] === true) return i;
      }
      return 0;
    };

    setActiveCategory(findFirstTrue);
  }

  const getCurrentEmoji = (e: React.MouseEvent<HTMLDivElement>) => {
    const element: any = e.target;
    if (element.id) {
      setCurrentEmoji(element.innerText);
    }

    // console.log(currentEmoji);
  };

  const resetCurrentEmoji = (e: React.MouseEvent<HTMLDivElement>) => {
    setCurrentEmoji("👋");
  };

  const selectSkinTone = (e: React.MouseEvent<HTMLDivElement>) => {
    setCurrentSkinTone(e.currentTarget.id);
    setSkinToneSelectorActive(false);
  };

  const appendEmojiToPost = (e: React.MouseEvent<HTMLDivElement>) => {
    let name = e.currentTarget.id;
    let emoji = getEmojiCharacterByName(name);
    console.log(emoji?.emoji);
    if (currentPost) {
      let postContent = currentPost.content;
      let updateContent = postContent + emoji;
      dispatch(
        updateCurrentPost({
          name: "content",
          value: updateContent,
        })
      );
    }
  };

  return (
    <div className="emoji-drop-down">
      <div className="emoji-drop-down-top">
        <div className="emoji-drop-down-search-border">
          <SearchIcon
            sx={{
              fontSize: "20px",
              position: "absolute",
              top: "14px",
              left: "16px",
            }}
          />
          <input
            className="emoji-drop-down-search"
            id="emoji-search"
            placeholder="Search emojis"
            onChange={() => {}}
          />
        </div>

        <div className="emoji-drop-down-categories">
          {generateTopRow().map((data, index) => {
            if (activeCategory === index) {
              return (
                <div className="emoji-drop-down-category-wrapper">
                  <div
                    className="emoji-drop-down-category emoji-active"
                    id={`${index}`}
                    style={{
                      backgroundImage: `url("${data.img}")`,
                    }}
                  ></div>

                  <div className="emoji-drop-down-category-underline-active"></div>
                </div>
              );
            } else {
              return (
                <div className="emoji-drop-down-category-wrapper">
                  <div
                    className="emoji-drop-down-category emoji-inactive"
                    id={`${index}`}
                    style={{
                      backgroundImage: `url("${data.img}")`,
                    }}
                    onClick={navigateToSection}
                  ></div>

                  <div className="emoji-drop-down-category-underline-inactive"></div>
                </div>
              );
            }
          })}
        </div>
      </div>

      <div className="emoji-drop-down-selector" id="emoji-scroll-area">
        {/* TODO recent section*/}
        <div className="emoji-drop-down-selector-section" id="Smileys & People">
          <h2
            className="emoji-drop-down-selector-section-title"
            id="smileysAndPeopleHeader"
          >
            Smileys & People
          </h2>
          <div
            className="emoji-drop-down-selector-emoji-wrapper"
            onMouseOver={getCurrentEmoji}
            onMouseLeave={resetCurrentEmoji}
          >
            {" "}
            {generateSmileysAndPeople().map((emoji) => (
              <div
                onClick={appendEmojiToPost}
                aria-label={emoji.name}
                id={emoji.name}
                className="emoji-drop-down-emoji"
              >
                {emoji.emoji}
              </div>
            ))}
          </div>
        </div>

        <div className="emoji-drop-down-selector-section" id="Animals & Nature">
          <h2
            className="emoji-drop-down-selector-section-title"
            id="animalsAndNatureHeader"
          >
            Animals & Nature
          </h2>
          <div className="emoji-drop-down-selector-emoji-wrapper">
            {" "}
            {generateAnimalsAndNature().map((emoji) => (
              <div
                onClick={appendEmojiToPost}
                aria-label={emoji.name}
                id={emoji.name}
                className="emoji-drop-down-emoji"
              >
                {emoji.emoji}
              </div>
            ))}
          </div>
        </div>

        <div className="emoji-drop-down-selector-section" id="Food & Drink">
          {" "}
          <h2
            className="emoji-drop-down-selector-section-title"
            id="foodAndDrinkHeader"
          >
            Food & Drink
          </h2>
          <div className="emoji-drop-down-selector-emoji-wrapper">
            {" "}
            {generateFoodAndDrink().map((emoji) => (
              <div
                onClick={appendEmojiToPost}
                aria-label={emoji.name}
                id={emoji.name}
                className="emoji-drop-down-emoji"
              >
                {emoji.emoji}
              </div>
            ))}
          </div>
        </div>

        <div className="emoji-drop-down-selector-section" id="Activities">
          <h2
            className="emoji-drop-down-selector-section-title"
            id="activitiesHeader"
          >
            Activities
          </h2>
          <div className="emoji-drop-down-selector-emoji-wrapper">
            {" "}
            {generateActivities().map((emoji) => (
              <div
                onClick={appendEmojiToPost}
                aria-label={emoji.name}
                id={emoji.name}
                className="emoji-drop-down-emoji"
              >
                {emoji.emoji}
              </div>
            ))}
          </div>
        </div>

        <div className="emoji-drop-down-selector-section" id="Travel & Places">
          {" "}
          <h2
            className="emoji-drop-down-selector-section-title"
            id="travelAndPlacesHeader"
          >
            Travel & Places
          </h2>
          <div className="emoji-drop-down-selector-emoji-wrapper">
            {" "}
            {generateActivities().map((emoji) => (
              <div
                onClick={appendEmojiToPost}
                aria-label={emoji.name}
                id={emoji.name}
                className="emoji-drop-down-emoji"
              >
                {emoji.emoji}
              </div>
            ))}
          </div>
        </div>

        <div className="emoji-drop-down-selector-section" id="Objects">
          {" "}
          <h2
            className="emoji-drop-down-selector-section-title"
            id="objectsHeader"
          >
            Objects
          </h2>
          <div className="emoji-drop-down-selector-emoji-wrapper">
            {" "}
            {generateObjects().map((emoji) => (
              <div
                onClick={appendEmojiToPost}
                aria-label={emoji.name}
                id={emoji.name}
                className="emoji-drop-down-emoji"
              >
                {emoji.emoji}
              </div>
            ))}
          </div>
        </div>

        <div className="emoji-drop-down-selector-section" id="Symbols">
          {" "}
          <h2
            className="emoji-drop-down-selector-section-title"
            id="symbolsHeader"
          >
            Symbols
          </h2>
          <div className="emoji-drop-down-selector-emoji-wrapper">
            {" "}
            {generateSymbols().map((emoji) => (
              <div
                onClick={appendEmojiToPost}
                aria-label={emoji.name}
                id={emoji.name}
                className="emoji-drop-down-emoji"
              >
                {emoji.emoji}
              </div>
            ))}
          </div>
        </div>

        <div className="emoji-drop-down-selector-section" id="Flags">
          {" "}
          <h2
            className="emoji-drop-down-selector-section-title"
            id="flagsHeader"
          >
            Flags
          </h2>
          <div className="emoji-drop-down-selector-emoji-wrapper">
            {" "}
            {generateFlags().map((emoji) => (
              <div
                onClick={appendEmojiToPost}
                aria-label={emoji.name}
                id={emoji.name}
                className="emoji-drop-down-emoji"
              >
                {emoji.emoji}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="emoji-drop-down-bottom">
        <div className="emoji-drop-down-current-emoji">{currentEmoji}</div>

        <div className="emoji-drop-down-skin-tone-selector">
          {skinToneSelectorActive ? (
            <div className="emoji-drop-down-skin-tone-selector-wrapper">
              <div
                className="emoji-drop-down-skin-tone-option"
                id="none"
                onClick={selectSkinTone}
              ></div>
              <div
                className="emoji-drop-down-skin-tone-option"
                id="light"
                onClick={selectSkinTone}
              ></div>
              <div
                className="emoji-drop-down-skin-tone-option"
                id="medium-light"
                onClick={selectSkinTone}
              ></div>
              <div
                className="emoji-drop-down-skin-tone-option"
                id="medium"
                onClick={selectSkinTone}
              ></div>
              <div
                className="emoji-drop-down-skin-tone-option"
                id="medium-dark"
                onClick={selectSkinTone}
              ></div>
              <div
                className="emoji-drop-down-skin-tone-option"
                id="dark"
                onClick={selectSkinTone}
              ></div>
            </div>
          ) : (
            <div className="emoji-drop-down-skin-tone-selector-wrapper">
              <div
                className="emoji-drop-down-skin-tone-selected"
                style={{
                  backgroundColor: `${determineSkinToneColor(currentSkinTone)}`,
                }}
                onClick={() => setSkinToneSelectorActive(true)}
              >
                <DoneIcon
                  sx={{
                    fontSize: "12px",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
