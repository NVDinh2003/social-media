import React, { useEffect, useState } from "react";
import {
  generateSmileysAndPeople,
  generateTopRow,
} from "../../utils/EmojiUtils";

import "./EmojiDropDown.css";
import SearchIcon from "@mui/icons-material/Search";

export const EmojiDropDown: React.FC = () => {
  //
  const [activeCategory, setActiveCategory] = useState<number>(1);

  return (
    <div className="emoji-drop-down">
      <div className="emoji-drop-down-top">
        <div className="emoji-drop-down-search-border">
          <SearchIcon />
          <input
            className="emoji-drop-down-search"
            id="emoji-search"
            onChange={() => {}}
          />
        </div>

        <div className="emoji-drop-down-categories">
          {generateTopRow().map((img, index) => {
            if (activeCategory === index) {
              return (
                <div
                  className="emoji-drop-down-category-active"
                  id={`${index}`}
                  style={{
                    width: "22px",
                    height: "22px",
                    backgroundImage: `url("${img}")`,
                    backgroundSize: "cover",
                  }}
                ></div>
              );
            } else {
              return (
                <div
                  className="emoji-drop-down-category-inactive"
                  id={`${index}`}
                  style={{
                    width: "22px",
                    height: "22px",
                    backgroundImage: `url("${img}")`,
                    backgroundSize: "cover",
                  }}
                ></div>
              );
            }
          })}
        </div>
      </div>

      <div className="emoji-drop-down-selector">
        {/* TODO recent section*/}
        <div className="emoji-drop-down-selector-section" id="Smileys & People">
          <h2 className="emoji-drop-down-selector-section-title">
            Smileys & People
          </h2>
          <div className="emoji-drop-down-selector-emoji-wrapper">
            {" "}
            {generateSmileysAndPeople().map((emoji) => (
              <div className="emoji-drop-down-emoji">{emoji}</div>
            ))}
          </div>
        </div>

        <div
          className="emoji-drop-down-selector-section"
          id="Animals & Nature"
        ></div>

        <div
          className="emoji-drop-down-selector-section"
          id="Food & Drink"
        ></div>

        <div className="emoji-drop-down-selector-section" id="Activities"></div>

        <div
          className="emoji-drop-down-selector-section"
          id="Travel & Places"
        ></div>

        <div className="emoji-drop-down-selector-section" id="Objects"></div>

        <div className="emoji-drop-down-selector-section" id="Symbols"></div>

        <div className="emoji-drop-down-selector-section" id="Flags"></div>
      </div>

      <div className="emoji-drop-down-bottom"></div>
    </div>
  );
};
