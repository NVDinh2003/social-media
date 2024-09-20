import { MouseEventHandler } from "react";
import GlobeSVG from "../../../components/SVGs/GlobeSVG";
import LocksSVG from "../../../components/SVGs/LocksSVG";
import MentionedSVG from "../../../components/SVGs/MentionedSVG";
import PeopleYouFollowSVG from "../../../components/SVGs/PeopleYouFollowSVG";
import { PostSliceState } from "../../../redux/Slices/PostSlice";
import { FeedPostCreatorImage } from "../components/FeedPostCreatorImages/FeedPostCreatorImage/FeedPostCreatorImage";
import TagPeopleSVG from "../../../components/SVGs/TagPeopleSVG";
import { PostImage } from "../../../utils/GlobalInterface";

export function getReplyDropDownButton(
  state: PostSliceState,
  callback: () => void
): JSX.Element {
  switch (state.currentPost?.replyRestriction) {
    case "EVERYONE":
      return (
        <div
          className="feed-post-reply-restriction-drop-down-button"
          onClick={callback}
        >
          <GlobeSVG height={14} width={14} color={"#1da1f2"} />
          Everyone can reply
        </div>
      );
    case "FOLLOW":
      return (
        <div
          className="feed-post-reply-restriction-drop-down-button"
          onClick={callback}
        >
          {" "}
          <PeopleYouFollowSVG height={14} width={14} color={"#1da1f2"} />
          People you follow can reply
        </div>
      );
    case "CIRCLE":
      return (
        <div className="feed-post-reply-restriction-drop-down-button-disabled">
          {" "}
          <LocksSVG height={14} width={14} color={"rgba(29,161,242,.5)"} />
          Only your Fwitter Circle can reply
        </div>
      );
    case "MENTION":
      return (
        <div
          className="feed-post-reply-restriction-drop-down-button"
          onClick={callback}
        >
          {" "}
          <MentionedSVG height={14} width={14} color={"#1da1f2"} />
          Only people you mentioned can reply
        </div>
      );
    default:
      return <></>;
  }
}

export function createImageContainer(images: File[]): JSX.Element {
  if (images.length % 2 === 0) {
    // console.log(images.length);
    return (
      <div className="feed-post-creator-images-container container-even">
        {images.map((image) => {
          const url = window.URL.createObjectURL(image);
          return (
            <FeedPostCreatorImage
              image={url}
              name={image.name}
              type={image.type}
              key={url}
            />
          );
        })}
      </div>
    );
  }

  if (images.length === 3) {
    let reversed: File[] = structuredClone(images);

    reversed.reverse();

    return (
      <div className="feed-post-creator-images-container container-odd">
        {reversed.map((image) => {
          const url = window.URL.createObjectURL(image);
          return (
            <FeedPostCreatorImage
              image={url}
              name={image.name}
              type={image.type}
              key={url}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="feed-post-creator-images-container container-odd">
      <FeedPostCreatorImage
        image={window.URL.createObjectURL(images[0])}
        name={images[0].name}
        type={images[0].type}
      />
    </div>
  );
}

export function createImagePostContainer(images: PostImage[]): JSX.Element {
  if (images.length % 2 === 0) {
    // console.log(images.length);
    return (
      <div className="feed-post-creator-images-container container-even">
        {images.map((image) => {
          return (
            <FeedPostCreatorImage
              image={image.imageURL}
              name={image.imageName}
              type={image.imageType}
              key={image.imageId}
            />
          );
        })}
      </div>
    );
  }

  if (images.length === 3) {
    let reversed: PostImage[] = structuredClone(images);

    reversed.reverse();

    return (
      <div className="feed-post-creator-images-container container-odd">
        {reversed.map((image) => {
          return (
            <FeedPostCreatorImage
              image={image.imageURL}
              name={image.imageName}
              type={image.imageType}
              key={image.imageId}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="feed-post-creator-images-container container-odd">
      <FeedPostCreatorImage
        image={images[0].imageURL}
        name={images[0].imageName}
        type={images[0].imageType}
      />
    </div>
  );
}

export function displayTagPeople(
  state: PostSliceState,
  toggleTagPeopleModal: MouseEventHandler<HTMLParagraphElement>
): JSX.Element {
  if (
    (state.currentPost && state.currentPost.images.length > 0) ||
    (state.currentReply && state.currentReply?.images.length > 0)
  ) {
    return <div className="feed-post-creator-images-option">via Tenor</div>;
  }

  if (
    (state.currentPostImages.length > 0 &&
      state.currentPostImages[0].type === "image/gif") ||
    (state.currentReplyImages.length > 0 &&
      state.currentReplyImages[0].type === "image/gif")
  ) {
    return <></>;
  }

  return (
    <p
      className="feed-post-creator-images-option"
      onClick={toggleTagPeopleModal}
    >
      <TagPeopleSVG height={16} width={16} color={"#536471"} />
      Tag people
    </p>
  );
}

export const generatePollDaysSelection = (): JSX.Element[] => {
  let options: JSX.Element[] = [];

  for (let i = 0; i <= 7; i++) {
    options.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  return options;
};

export const generatePollHoursSelection = (): JSX.Element[] => {
  let options: JSX.Element[] = [];
  for (let i = 0; i <= 23; i++) {
    options.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  return options;
};

export const generatePollMinutesSelection = (): JSX.Element[] => {
  let options: JSX.Element[] = [];
  for (let i = 0; i <= 59; i++) {
    options.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  return options;
};
