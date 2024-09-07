import React, { ChangeEvent, useEffect, useRef, useState } from "react";

import "./FeedPostCreator.css";
import { Link } from "react-router-dom";
import { ExpandMore } from "@mui/icons-material";
import GlobeSVG from "../../../../components/SVGs/GlobeSVG";
import MediaSVG from "../../../../components/SVGs/MediaSVG";
import PollSVG from "../../../../components/SVGs/PollSVG";
import GIFSVG from "../../../../components/SVGs/GIFSVG";
import EmojiSVG from "../../../../components/SVGs/EmojiSVG";
import ScheduleSVG from "../../../../components/SVGs/ScheduleSVG";
import LocationSVG from "../../../../components/SVGs/LocationSVG";
import { FeedPostCreatorProgress } from "../FeedPostCreatorProgress/FeedPostCreatorProgress";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { Post } from "../../../../utils/GlobalInterface";
import {
  createPoll,
  createPost,
  createPostWithMedia,
  initializeCurrentPost,
  updateCurrentPost,
  updateCurrentPostImages,
} from "../../../../redux/Slices/PostSlice";
import { FeedPostAudienceDropDown } from "../FeedPostAudienceDropDown/FeedPostAudienceDropDown";
import { FeedPostReplyRestrictionDropDown } from "../FeedPostReplyRestrictionDropDown/FeedPostReplyRestrictionDropDown";
import { FeedPostCreatorImages } from "../FeedPostCreatorImages/FeedPostCreatorImages";
import {
  updateDisplayGif,
  updateDisplaySchedule,
} from "../../../../redux/Slices/ModalSlice";
import { FeedPostCreatorPoll } from "../FeedPostCreatorPoll/FeedPostCreatorPoll";
import { EmojiDropDown } from "../../../../components/EmojiDropDown/EmojiDropDown";

export const FeedPostCreator: React.FC = () => {
  //
  const state = useSelector((state: RootState) => state);
  const dispatch: AppDispatch = useDispatch();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const imageSelectorRef = useRef<HTMLInputElement>(null);

  const [active, setActive] = useState<boolean>(false);
  const [postContent, setPostContent] = useState<string>("");
  const [overloadImages, setOverloadImages] = useState<boolean>(false);

  const activate = (e: React.MouseEvent<HTMLDivElement>) => {
    // console.log(e.target);

    if (!active) {
      // console.log("Setting active !");
      setActive(true);
      if (state.user.loggedIn) {
        let p: Post = {
          postId: 0,
          content: "",
          author: state.user.loggedIn,
          likes: 0,
          images: [],
          reposts: 0,
          views: 0,
          scheduled: false,
          audience: "EVERYONE",
          replyRestriction: "EVERYONE",
        };

        dispatch(initializeCurrentPost(p));
      }
    }

    let targetElement: any = e.target;

    if (targetElement.id === "post-text") {
      if (textAreaRef && textAreaRef.current) textAreaRef.current.focus();
    }
  };

  const autoGrow = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = "25px";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }

    dispatch(
      updateCurrentPost({
        name: "content",
        value: e.target.value,
      })
    );
  };

  const submitPost = () => {
    if (state.post.currentPost && state.user.loggedIn) {
      if (state.post.currentPostImages.length === 0) {
        //
        let poll = undefined;
        if (
          state.post.currentPost.poll !== undefined &&
          state.post.currentPost.images.length < 1
        ) {
          poll = JSON.parse(JSON.stringify(state.post.currentPost.poll));
          console.log("There is a poll in post!");
          let timeString = state.post.currentPost.poll.endTime;

          let days = timeString.split(":")[0];
          let hours = timeString.split(":")[1];
          let minutes = timeString.split(":")[2];

          let endTime = new Date();
          // console.log("Time: ", endTime.toUTCString());
          endTime.setDate(endTime.getDate() + +days);
          endTime.setHours(endTime.getHours() + +hours);
          endTime.setMinutes(endTime.getMinutes() + +minutes);

          // console.log("Time +: ", endTime.toUTCString());
          // console.log({ days, hours, minutes });

          poll = {
            ...poll,
            endTime: `${endTime.getFullYear()}-${endTime.getMonth()}-${endTime.getDate()} ${endTime.getHours()}:${endTime.getMinutes()}`,
          };
        }

        let body = {
          content: state.post.currentPost.content,
          author: state.post.currentPost.author,
          images: state.post.currentPost.images,
          poll,
          replies: [],
          audience: state.post.currentPost.audience,
          replyRestriction: state.post.currentPost.replyRestriction,
          scheduled: state.post.currentPost.scheduled,
          scheduledDate: state.post.currentPost.scheduledDate,
          token: state.user.token,
        };

        dispatch(createPost(body));
      } else {
        let body = {
          content: state.post.currentPost.content,
          author: state.post.currentPost.author,
          replies: [],
          audience: state.post.currentPost.audience,
          replyRestriction: state.post.currentPost.replyRestriction,
          scheduled: state.post.currentPost.scheduled,
          scheduledDate: state.post.currentPost.scheduledDate,
          token: state.user.token,
          images: [],
          poll: undefined,
          imageFiles: state.post.currentPostImages,
        };

        dispatch(createPostWithMedia(body));

        if (imageSelectorRef && imageSelectorRef.current) {
          imageSelectorRef.current.value = "";
        }
      }
    }

    setActive(false);
    setPostContent("");

    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.blur();
      textAreaRef.current.value = "";
    }
  };

  const handleGetImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Lấy danh sách hình ảnh hiện tại từ state
    const imageList = state.post.currentPostImages;
    setOverloadImages(false);

    if (imageSelectorRef.current && e.target.files) {
      if (e.target.files.length + imageList.length > 4) {
        console.log("Selected to many files");
        imageSelectorRef.current.value = "";
        setOverloadImages(true);
        return;
      }

      if (imageList[0]?.type === "image/gif") {
        console.log("Only one gif and no other images allowed");
        imageSelectorRef.current.value = "";
        setOverloadImages(true);
        return;
      }

      let fileArr: File[] = [...imageList];

      for (let i = 0; i < e.target.files.length; i++) {
        let file = e.target.files.item(i);

        if (
          (file?.type === "image/gif" && imageList.length >= 1) ||
          (file?.type === "image/gif" && e.target.files.length > 1)
        ) {
          console.log("Only one gif and no other images allowed");
          imageSelectorRef.current.value = "";
          setOverloadImages(true);
          return;
        }

        if (file) fileArr.push(file);
      }

      dispatch(updateCurrentPostImages(fileArr));
    }
  };

  const determineFull = (): boolean => {
    if (state.post.currentPostImages.length === 4) return true;

    if (state.post.currentPostImages[0]?.type === "image/gif") return true;

    return false;
  };

  const displayGif = () => {
    dispatch(updateDisplayGif());
  };

  const generatePoll = (e: React.MouseEvent<HTMLDivElement>) => {
    if (state.post.currentPost === undefined) {
      activate(e);
    } else {
      dispatch(createPoll());
    }
  };

  const generateButtonClass = (): string => {
    return postContent !== "" ||
      state.post.currentPostImages.length > 0 ||
      (state.post.currentPost && state.post.currentPost.images.length >= 1) ||
      (state.post.currentPost && state.post.currentPost.poll !== undefined)
      ? "feed-post-creator-post-button post-active"
      : "feed-post-creator-post-button";
  };

  const activateButton = (): boolean => {
    return !(
      postContent !== "" ||
      state.post.currentPostImages.length > 0 ||
      (state.post.currentPost && state.post.currentPost.images.length >= 1) ||
      (state.post.currentPost && state.post.currentPost.poll !== undefined)
    );
  };

  const openScheduleModal = () => {
    dispatch(updateDisplaySchedule());
  };

  useEffect(() => {
    if (!state.post.currentPost) setPostContent("");

    console.log(postContent);
    // console.log(state.post.currentPost?.poll);
  }, [
    state.post.currentPost,
    postContent,
    activate,
    state.post.currentPost?.poll,
  ]);

  return (
    <div className="feed-post-creator" onClick={activate}>
      <Link to="">
        <img
          src={process.env.REACT_APP_PFP}
          alt=""
          className="feed-post-creator-pfp"
        />
      </Link>

      <div className="feed-post-creator-right">
        {active ? <FeedPostAudienceDropDown /> : <></>}

        <textarea
          className={
            active
              ? "feed-post-creator-input input-active"
              : "feed-post-creator-input"
          }
          placeholder="What is happening?!"
          ref={textAreaRef}
          onChange={autoGrow}
          cols={50}
          maxLength={256}
          id={"post-text"}
          value={
            state.post.currentPost
              ? state.post.currentPost.content
              : postContent
          }
        />

        {(state.post.currentPostImages.length > 0 ||
          (state.post.currentPost &&
            state.post.currentPost.images.length > 0)) && (
          <FeedPostCreatorImages />
        )}

        {state.post.currentPost && state.post.currentPost?.poll && (
          <FeedPostCreatorPoll />
        )}

        {active ? <FeedPostReplyRestrictionDropDown /> : <></>}

        <div
          className={
            active
              ? "feed-post-creator-bottom-icon icons-border"
              : "feed-post-creator-bottom-icon"
          }
        >
          <div className="feed-post-creator-icons-left">
            <div className="feed-post-creator-icon-bg">
              <input
                className="feed-post-creator-file-update"
                onChange={handleGetImages}
                type="file"
                id="images"
                accept="image/*"
                multiple={true}
                ref={imageSelectorRef}
                hidden
                disabled={determineFull()}
              />
              <label
                htmlFor="images"
                className={
                  determineFull()
                    ? "feed-post-creator-icon-bg"
                    : "feed-post-creator-icon-bg icon-active"
                }
              >
                <MediaSVG
                  height={20}
                  width={20}
                  color={determineFull() ? "rgba(19,161,242,.5)" : "#1DA1F2"}
                />
              </label>
            </div>
            <div
              className={
                state.post.currentPostImages.length > 0
                  ? "feed-post-creator-icon-bg"
                  : "feed-post-creator-icon-bg icon-active"
              }
              onClick={displayGif}
            >
              {" "}
              <GIFSVG
                height={20}
                width={20}
                color={
                  state.post.currentPostImages.length > 0
                    ? "rgba(19,161,242,.5)"
                    : "#1DA1F2"
                }
              />
            </div>
            <div
              className={
                state.post.currentPostImages.length > 0
                  ? "feed-post-creator-icon-bg"
                  : "feed-post-creator-icon-bg icon-active"
              }
              onClick={generatePoll}
            >
              {" "}
              <PollSVG
                height={20}
                width={20}
                color={
                  state.post.currentPostImages.length > 0
                    ? "rgba(19,161,242,.5)"
                    : "#1DA1F2"
                }
              />
            </div>
            <div className="feed-post-creator-icon-bg icon-active">
              {" "}
              <EmojiSVG height={20} width={20} color={"#1DA1F2"} />
            </div>
            <div
              className="feed-post-creator-icon-bg icon-active"
              onClick={openScheduleModal}
            >
              {" "}
              <ScheduleSVG height={20} width={20} color={"#1DA1F2"} />
            </div>
            <div className="feed-post-creator-location">
              {" "}
              <LocationSVG
                height={20}
                width={20}
                color={"rgba(29,161,242,.5)"}
              />
            </div>
          </div>
          <div className="feed-post-creator-submit-cluster">
            {postContent !== "" ? (
              <div className="feed-post-creator-submit-cluster-left">
                <FeedPostCreatorProgress
                  percent={(postContent.length / 256) * 100}
                />
                <span className="feed-post-creator-submit-cluster-divider"></span>
                <div className="feed-post-creator-submit-cluster-add">+</div>
              </div>
            ) : (
              <></>
            )}

            <button
              className={generateButtonClass()}
              disabled={activateButton()}
              onClick={submitPost}
            >
              Post
            </button>
          </div>
        </div>
      </div>

      {/* <EmojiDropDown /> */}
    </div>
  );
};
