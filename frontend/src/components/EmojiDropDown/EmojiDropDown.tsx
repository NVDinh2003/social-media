import React, { useState } from "react";
import { determineSkinToneColor, generateTopRow } from "../../utils/EmojiUtils";

import "./EmojiDropDown.css";

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
    // let name = e.currentTarget.id;
    // let emoji = getEmojiCharacterByName(name);
    // console.log(emoji?.emoji);
    // if (currentPost) {
    //   let postContent = currentPost.content;
    //   let updateContent = postContent + emoji;
    //   dispatch(
    //     updateCurrentPost({
    //       name: "content",
    //       value: updateContent,
    //     })
    //   );
    // }
  };

  return <></>;
};
