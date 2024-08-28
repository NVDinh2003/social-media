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
  createPost,
  initializeCurrentPost,
  updateCurrentPost,
  updateCurrentPostImages,
} from "../../../../redux/Slices/PostSlice";
import { FeedPostAudienceDropDown } from "../FeedPostAudienceDropDown/FeedPostAudienceDropDown";
import { FeedPostReplyRestrictionDropDown } from "../FeedPostReplyRestrictionDropDown/FeedPostReplyRestrictionDropDown";
import { FeedPostCreatorImages } from "../FeedPostCreatorImages/FeedPostCreatorImages";

export const FeedPostCreator: React.FC = () => {
  //
  const state = useSelector((state: RootState) => state);
  const dispatch: AppDispatch = useDispatch();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const imageSelectorRef = useRef<HTMLInputElement>(null);

  const [active, setActive] = useState<boolean>(false);
  const [postContent, setPostContent] = useState<string>("");
  const [overloadImages, setOverloadImages] = useState<boolean>(false);

  const activate = () => {
    if (!active) {
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
    if (textAreaRef && textAreaRef.current) textAreaRef.current.focus();
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
      let body = {
        content: state.post.currentPost.content,
        author: state.post.currentPost.author,
        replies: [],
        audience: state.post.currentPost.audience,
        replyRestriction: state.post.currentPost.replyRestriction,
        scheduled: state.post.currentPost.scheduled,
        scheduledDate: state.post.currentPost.scheduledDate,
        token: state.user.token,
      };

      dispatch(createPost(body));
    }

    setActive(false);

    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.blur();
      textAreaRef.current.value = "";
    }
  };

  const handleGetImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageURLList: string[] = [];

    if (imageSelectorRef.current && e.target.files) {
      if (e.target.files.length > 4) {
        console.log("Selected to many files");
        imageSelectorRef.current.value = "";
        setOverloadImages(true);
        return;
      }

      for (let i = 0; i < e.target.files.length; i++) {
        let file = e.target.files.item(i);

        if (file?.type === "image/gif" && e.target.files.length > 1) {
          console.log("Only one gif and no other images allowed");
          imageSelectorRef.current.value = "";
          setOverloadImages(true);
          return;
        }

        const localImageUrl = window.URL.createObjectURL(e.target.files[i]);
        imageURLList.push(localImageUrl);
      }

      console.log(imageURLList);
      dispatch(updateCurrentPostImages(imageURLList));
    }
  };

  useEffect(() => {
    if (!state.post.currentPost) setPostContent("");

    console.log(postContent);
  }, [state.post.currentPost, postContent, activate]);

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
        />

        <FeedPostCreatorImages />

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
              />
              <label htmlFor="images" className="feed-post-creator-icon-bg">
                <MediaSVG height={20} width={20} color={"#1DA1F2"} />
              </label>
            </div>
            <div className="feed-post-creator-icon-bg">
              {" "}
              <GIFSVG height={20} width={20} color={"#1DA1F2"} />
            </div>
            <div className="feed-post-creator-icon-bg">
              {" "}
              <PollSVG height={20} width={20} color={"#1DA1F2"} />
            </div>
            <div className="feed-post-creator-icon-bg">
              {" "}
              <EmojiSVG height={20} width={20} color={"#1DA1F2"} />
            </div>
            <div className="feed-post-creator-icon-bg">
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
              className={
                postContent === ""
                  ? "feed-post-creator-post-button"
                  : "feed-post-creator-post-button post-active"
              }
              disabled={postContent === ""}
              onClick={submitPost}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
