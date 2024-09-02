import { MouseEventHandler } from "react";
import GlobeSVG from "../../../components/SVGs/GlobeSVG";
import LocksSVG from "../../../components/SVGs/LocksSVG";
import MentionedSVG from "../../../components/SVGs/MentionedSVG";
import PeopleYouFollowSVG from "../../../components/SVGs/PeopleYouFollowSVG";
import { PostSliceState } from "../../../redux/Slices/PostSlice";
import { FeedPostCreatorImage } from "../components/FeedPostCreatorImage/FeedPostCreatorImage";
import TagPeopleSVG from "../../../components/SVGs/TagPeopleSVG";

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

export function displayTagPeople(
  state: PostSliceState,
  toggleTagPeopleModal: MouseEventHandler<HTMLParagraphElement>
): JSX.Element {
  if (state.currentPost && state.currentPost.images.length > 0) {
    return <div className="feed-post-creator-images-option">via Tenor</div>;
  }

  if (state.currentPostImages[0].type === "image/gif") {
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
