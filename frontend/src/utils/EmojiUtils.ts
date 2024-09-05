import data from "../assets/list.with.modifiers.json";

const EMOJIS = data.emojis;

let supported =
  window.navigator.platform.toUpperCase().indexOf("MAC") >= 0
    ? "apple"
    : "windows";

export const generateSmileysAndPeople = (): string[] => {
  //

  const smileyAndPeople = EMOJIS.filter((emoji) => {
    let supportedPlatforms: any = emoji.support;

    if (
      emoji.category === "Smiley & Emotion" ||
      (emoji.category === "People & Body" &&
        supportedPlatforms[supported] === true)
    )
      return emoji;
  }).map((emoji) => emoji.emoji);

  //   console.log(smileyAndPeople);

  return smileyAndPeople;
};

export const generateAnimalsAndNature = (): string[] => {
  const animalsAndNature = EMOJIS.filter((emoji) => {
    let supportedPlatforms: any = emoji.support;
    if (
      emoji.category === "Animals & Nature" &&
      supportedPlatforms[supported] === true
    )
      return emoji;
  }).map((emoji) => emoji.emoji);

  return animalsAndNature;
};

export const generateFoodAndDrink = (): string[] => {
  const foodAndDrink = EMOJIS.filter((emoji) => {
    let supportedPlatforms: any = emoji.support;
    if (
      emoji.category === "Food & Drink" &&
      supportedPlatforms[supported] === true
    )
      return emoji;
  }).map((emoji) => emoji.emoji);

  return foodAndDrink;
};

export const generateActivities = (): string[] => {
  const activities = EMOJIS.filter((emoji) => {
    let supportedPlatforms: any = emoji.support;
    if (
      emoji.category === "Activities" &&
      supportedPlatforms[supported] === true
    )
      return emoji;
  }).map((emoji) => emoji.emoji);

  return activities;
};

export const generateTravelAndPlaces = (): string[] => {
  const travelAndPlaces = EMOJIS.filter((emoji) => {
    let supportedPlatforms: any = emoji.support;
    if (
      emoji.category === "Travel & Places" &&
      supportedPlatforms[supported] === true
    )
      return emoji;
  }).map((emoji) => emoji.emoji);

  return travelAndPlaces;
};

export const generateObjects = (): string[] => {
  const objects = EMOJIS.filter((emoji) => {
    let supportedPlatforms: any = emoji.support;
    if (emoji.category === "Objects" && supportedPlatforms[supported] === true)
      return emoji;
  }).map((emoji) => emoji.emoji);

  return objects;
};

export const generateSymbols = (): string[] => {
  const symbols = EMOJIS.filter((emoji) => {
    let supportedPlatforms: any = emoji.support;
    if (emoji.category === "Symbols" && supportedPlatforms[supported] === true)
      return emoji;
  }).map((emoji) => emoji.emoji);

  return symbols;
};

export const generateFlags = (): string[] => {
  const flags = EMOJIS.filter((emoji) => {
    let supportedPlatforms: any = emoji.support;
    if (emoji.category === "Flags" && supportedPlatforms[supported] === true)
      return emoji;
  }).map((emoji) => emoji.emoji);

  return flags;
};
