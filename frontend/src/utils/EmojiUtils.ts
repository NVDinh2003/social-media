import { createElement } from "react";
import emojis from "../assets/all-emojis.json";
export const EMOJIS: Emoji[] = emojis.emojis;
export const EMOJI_IMAGE_MAP: MappedEmoji[] = mapEmojisWithImages();
export interface EmojiData {
  name: string;
  category: string;
  emoji: string;
  image: string;
}
export interface Emoji {
  name: string;
  category: string;
  emoji: string;
  images: string[];
  modifiers: string[];
}
interface MappedEmoji {
  emoji: string;
  image: string;
}
export function mapEmojisWithImages(): MappedEmoji[] {
  let mappedEmojis: MappedEmoji[] = [];
  EMOJIS.forEach((emoji) => {
    if (emoji.images.length === 1) {
      mappedEmojis.push({
        emoji: emoji.emoji,
        image: emoji.images[0],
      });
    } else {
      for (let i = 0; i < emoji.modifiers.length; i++) {
        mappedEmojis.push({
          emoji: emoji.modifiers[0],
          image: emoji.images[i + 1],
        });
      }
    }
  });
  return mappedEmojis;
}
export const generateEmojiCateogory = (
  category: string,
  modifier: string
): EmojiData[] => {
  const categoryEmojis: EmojiData[] = EMOJIS.filter(
    (emoji: Emoji) => emoji.category === category
  ).map((emoji: Emoji) => {
    let indexOfModifier = convertModifierToIndex(modifier);

    let emojiData: EmojiData = {
      name: emoji.name,
      category: emoji.category,
      image: "",
      emoji: "",
    };

    if (indexOfModifier > 0 && emoji.modifiers.length > 1) {
      emojiData = {
        ...emojiData,
        image: emoji.images[indexOfModifier],
        emoji: emoji.modifiers[indexOfModifier - 1],
      };
    } else {
      emojiData = {
        ...emojiData,
        image: emoji.images[0],
        emoji: emoji.emoji,
      };
    }
    return emojiData;
  });
  return categoryEmojis;
};
export const generateTopRow = () => {
  interface TopRowData {
    img: string;
    id: string;
  }
  const data: TopRowData[] = [];
  for (let emoji of EMOJIS) {
    let images: any = emoji.images;
    if (emoji.name === "Clock face two oclock") {
      data[0] = {
        img: images[0],
        id: "Recent",
      };
    }
    if (emoji.name === "Grinning face") {
      data[1] = {
        img: images[0],
        id: "Smileys & people",
      };
    }
    if (emoji.name === "Bear face") {
      data[2] = {
        img: images[0],
        id: "Animals & nature",
      };
    }
    if (emoji.name === "Hamburger") {
      data[3] = {
        img: images[0],
        id: "Food & drink",
      };
    }
    if (emoji.name === "Soccer ball") {
      data[4] = {
        img: images[0],
        id: "Activity",
      };
    }
    if (emoji.name === "Oncoming automobile") {
      data[5] = {
        img: images[0],
        id: "Travel & places",
      };
    }
    if (emoji.name === "Electric light bulb") {
      data[6] = {
        img: images[0],
        id: "Objects",
      };
    }
    if (emoji.name === "Input symbol for symbols") {
      data[7] = {
        img: images[0],
        id: "Symbols",
      };
    }
    if (emoji.name === "Triangular flag on post") {
      data[8] = {
        img: images[0],
        id: "Flags",
      };
    }
  }
  return data;
};

export const mapReactionBar = () => {
  interface Reaction {
    img: string;
    emoji: string;
  }

  const data: Reaction[] = [];
  for (let emoji of EMOJIS) {
    let images: any = emoji.images;
    if (emoji.name === "Thumbs up") {
      data[0] = {
        img: images[0],
        emoji: emoji.emoji,
      };
    }

    if (emoji.name === "Red heart") {
      data[1] = {
        img: images[0],
        emoji: emoji.emoji,
      };
    }

    if (emoji.name === "Smiling face with open mouth and tightly-closed eyes") {
      data[2] = {
        img: images[0],
        emoji: emoji.emoji,
      };
    }

    if (emoji.name === "Rolling on the floor laughing") {
      data[3] = {
        img: images[0],
        emoji: emoji.emoji,
      };
    }

    if (emoji.name === "Smiling face with heart-shaped eyes") {
      data[4] = {
        img: images[0],
        emoji: emoji.emoji,
      };
    }

    if (emoji.name === "Clown face") {
      data[5] = {
        img: images[0],
        emoji: emoji.emoji,
      };
    }

    if (emoji.name === "Loudly crying face") {
      data[6] = {
        img: images[0],
        emoji: emoji.emoji,
      };
    }
  }

  return data;
};

export const getEmojiImageByEmojiAscii = (ascii: string): string => {
  let emoji: Emoji | undefined;

  for (let e of EMOJIS) {
    if (e.emoji === ascii) emoji = e;
  }

  if (emoji) return emoji.images[0];

  return "";
};

export const determineSkinToneColor = (currentSkinTone: string): string => {
  switch (currentSkinTone) {
    case "light":
      return "rgb(247, 222, 206)";
    case "medium-light":
      return "rgb(243, 210, 162)";
    case "medium":
      return "rgb(213, 171, 136)";
    case "medium-dark":
      return "rgb(175, 126, 87)";
    case "dark":
      return "rgb(124, 83, 62)";
    default:
      return "rgb(255, 220, 93)";
  }
};
export const convertModifierToIndex = (modifier: string): number => {
  switch (modifier) {
    case "light":
      return 1;
    case "medium-light":
      return 2;
    case "medium":
      return 3;
    case "medium-dark":
      return 4;
    case "dark":
      return 5;
    default:
      return 0;
  }
};
export const getEmojiCharacterByNameAndModifier = (
  name: string,
  modifier: string
): string => {
  let emoji: Emoji | undefined;
  for (let e of EMOJIS) {
    if (e.name === name) emoji = e;
  }

  if (emoji) {
    if (emoji.modifiers.length === 0 || modifier === "none") {
      return emoji.emoji;
    } else {
      let modifierNumber = convertModifierToIndex(modifier) - 1;
      return emoji.modifiers[modifierNumber];
    }
  }
  return "";
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
