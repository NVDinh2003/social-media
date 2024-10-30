import data from "../assets/list.with.modifiers.json";
import dataWithImg from "../assets/list.with.images.coppy.json";
import { ClassNames } from "@emotion/react";

const EMOJIS = data.emojis;
const EMOJIS_IMG = dataWithImg.emojis;

let supported =
  window.navigator.platform.toUpperCase().indexOf("MAC") >= 0
    ? "apple"
    : "windows";

interface EmojiData {
  emoji: string;
  name: string;
}

export const generateSmileysAndPeople = (): EmojiData[] => {
  //

  const smileyAndPeople = EMOJIS.filter((emoji) => {
    let supportedPlatforms: any = emoji.support;

    if (
      emoji.category === "Smileys & Emotion" ||
      (emoji.category === "People & Body" &&
        supportedPlatforms[supported] === true)
    )
      return emoji;
  }).map((emoji) => {
    return { emoji: emoji.emoji, name: emoji.name };
  });

  //   console.log(smileyAndPeople);

  return smileyAndPeople;
};

export const generateAnimalsAndNature = (): EmojiData[] => {
  const animalsAndNature = EMOJIS.filter((emoji) => {
    let supportedPlatforms: any = emoji.support;
    if (
      emoji.category === "Animals & Nature" &&
      supportedPlatforms[supported] === true
    )
      return emoji;
  }).map((emoji) => {
    return { emoji: emoji.emoji, name: emoji.name };
  });

  return animalsAndNature;
};

export const generateFoodAndDrink = (): EmojiData[] => {
  const foodAndDrink = EMOJIS.filter((emoji) => {
    let supportedPlatforms: any = emoji.support;
    if (
      emoji.category === "Food & Drink" &&
      supportedPlatforms[supported] === true
    )
      return emoji;
  }).map((emoji) => {
    return { emoji: emoji.emoji, name: emoji.name };
  });

  return foodAndDrink;
};

export const generateActivities = (): EmojiData[] => {
  const activities = EMOJIS.filter((emoji) => {
    let supportedPlatforms: any = emoji.support;
    if (
      emoji.category === "Activities" &&
      supportedPlatforms[supported] === true
    )
      return emoji;
  }).map((emoji) => {
    return { emoji: emoji.emoji, name: emoji.name };
  });

  return activities;
};

export const generateTravelAndPlaces = (): EmojiData[] => {
  const travelAndPlaces = EMOJIS.filter((emoji) => {
    let supportedPlatforms: any = emoji.support;
    if (
      emoji.category === "Travel & Places" &&
      supportedPlatforms[supported] === true
    )
      return emoji;
  }).map((emoji) => {
    return { emoji: emoji.emoji, name: emoji.name };
  });

  return travelAndPlaces;
};

export const generateObjects = (): EmojiData[] => {
  const objects = EMOJIS.filter((emoji) => {
    let supportedPlatforms: any = emoji.support;
    if (emoji.category === "Objects" && supportedPlatforms[supported] === true)
      return emoji;
  }).map((emoji) => {
    return { emoji: emoji.emoji, name: emoji.name };
  });

  return objects;
};

export const generateSymbols = (): EmojiData[] => {
  const symbols = EMOJIS.filter((emoji) => {
    let supportedPlatforms: any = emoji.support;
    if (emoji.category === "Symbols" && supportedPlatforms[supported] === true)
      return emoji;
  }).map((emoji) => {
    return { emoji: emoji.emoji, name: emoji.name };
  });

  return symbols;
};

export const generateFlags = (): EmojiData[] => {
  const flags = EMOJIS.filter((emoji) => {
    let supportedPlatforms: any = emoji.support;
    if (emoji.category === "Flags" && supportedPlatforms[supported] === true)
      return emoji;
  }).map((emoji) => {
    return { emoji: emoji.emoji, name: emoji.name };
  });

  return flags;
};

export const generateTopRow = () => {
  interface TopRowData {
    img: string;
    id: string;
  }

  const data: TopRowData[] = [];

  for (let emoji of EMOJIS_IMG) {
    let value = emoji.name;
    let images: any = emoji.images;

    if (value === "two o’clock") {
      data[0] = {
        img: images[supported],
        id: "Recent",
      };
    }
    if (value === "grinning face") {
      data[1] = {
        img: images[supported],
        id: "Smileys & People",
      };
    }
    if (value === "bear") {
      data[2] = {
        img: images[supported],
        id: "Animals & Nature",
      };
    }
    if (value === "hamburger") {
      data[3] = {
        img: images[supported],
        id: "Food & Drink",
      };
    }
    if (value === "soccer ball") {
      data[4] = {
        img: images[supported],
        id: "Activities",
      };
    }
    if (value === "oncoming automobile") {
      data[7] = {
        img: images[supported],
        id: "Travel & Places",
      };
    }
    if (value === "light bulb") {
      data[6] = {
        img: images[supported],
        id: "Objects",
      };
    }
    if (value === "input symbols") {
      data[7] = {
        img: images[supported],
        id: "Symbols",
      };
    }
    if (value === "triangular flag") {
      data[8] = {
        img: images[supported],
        id: "Flags",
      };
    }
  }

  return data;
};

export const determineSkinToneColor = (currentSkinTone: string): string => {
  switch (currentSkinTone) {
    case "light":
      return "rgb(247,222,206)";
    case "medium-light":
      return "rbg(243,210,162)";
    case "medium":
      return "rgb(213,171,136)";
    case "medium-dark":
      return "rgb(175,126,87)";
    case "dark":
      return "rgb(124,83,62)";
    default:
      return "rgb(255,220,93)";
  }
};

export const getEmojiCharacterByName = (name: string) => {
  let emoji: EmojiData | undefined;

  for (let e of EMOJIS) {
    if (e.name === name) emoji = e;
  }

  return emoji;
};

export const convertPostContentToElementForNotifications = (
  elements: JSX.Element[]
) => {
  return elements.map((element) => {
    element = {
      ...element,
      props: {
        ...element.props,
        ClassNames: "post-notification-content-text",
      },
    };

    return element;
  });
};

export const convertElementsToMessageText = (
  elements: JSX.Element[],
  location: string
) => {
  return elements.map((element) => {
    if (element.type === "img") {
      element = {
        ...element,
        props: {
          ...element.props,
          className: "message-text-emoji",
        },
      };
    } else {
      element = {
        ...element,
        props: {
          ...element.props,
          className:
            location === "create" ? "message-text" : "message-container-text",
        },
      };
    }
    return element;
  });
};
