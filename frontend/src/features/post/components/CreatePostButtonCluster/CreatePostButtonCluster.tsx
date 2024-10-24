import React, { useRef, useState } from "react";

import "./CreatePostButtonCluster.css";
import MediaSVG from "../../../../components/SVGs/MediaSVG";
import GIFSVG from "../../../../components/SVGs/GIFSVG";
import PollSVG from "../../../../components/SVGs/PollSVG";
import EmojiSVG from "../../../../components/SVGs/EmojiSVG";
import ScheduleSVG from "../../../../components/SVGs/ScheduleSVG";
import LocationSVG from "../../../../components/SVGs/LocationSVG";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import {
  createPoll,
  updateCurrentPostImages,
} from "../../../../redux/Slices/PostSlice";
import {
  updateDisplayGif,
  updateDisplayLocation,
  updateDisplaySchedule,
} from "../../../../redux/Slices/ModalSlice";

interface CreatePostButtonClusterProps {
  type: string;
}

export const CreatePostButtonCluster: React.FC<
  CreatePostButtonClusterProps
> = ({ type }) => {
  const currentPostImages = useSelector(
    (state: RootState) => state.post.currentPostImages
  );
  const currentReplyImages = useSelector(
    (state: RootState) => state.post.currentReplyImages
  );
  const currentPost = useSelector((state: RootState) => state.post.currentPost);
  const currentReply = useSelector(
    (state: RootState) => state.post.currentReply
  );
  const dispatch: AppDispatch = useDispatch();

  const imageSelectorRef = useRef<HTMLInputElement>(null);

  const handleGetImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageList: File[] = currentPostImages;

    if (imageSelectorRef.current && e.target.files) {
      if (e.target.files.length + imageList.length > 4) {
        console.log("Selected too many files");
        imageSelectorRef.current.value = "";
        return;
      }

      if (imageList[0]?.type === "image/gif") {
        console.log("Only one gif and no other images allowed");
        imageSelectorRef.current.value = "";
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
          return;
        }

        if (file) fileArr.push(file);
      }

      dispatch(updateCurrentPostImages(fileArr));
    }
  };

  const determineFull = (): boolean => {
    if (currentPostImages.length === 4) return true;
    if (currentPostImages[0]?.type === "image/gif") return true;
    if (
      (currentReply && currentReply.images.length > 0) ||
      (currentPost && currentPost.images.length > 0)
    )
      return true;
    return false;
  };

  const disableGif = (): boolean => {
    if (
      currentPostImages.length > 0 ||
      currentReplyImages.length > 0 ||
      (currentPost && currentPost.images.length > 0) ||
      (currentReply && currentReply.images.length > 0)
    )
      return true;
    return false;
  };

  const displayGif = () => {
    dispatch(updateDisplayGif());
  };

  const generatePoll = (e: React.MouseEvent<HTMLDivElement>) => {
    if (currentPost || currentReply) {
      dispatch(createPoll());
    }
  };

  const openScheduleModal = () => {
    dispatch(updateDisplaySchedule());
  };

  const openLocationModal = () => {
    dispatch(updateDisplayLocation());
  };

  // choose emoji
  const openEmojiPicker = () => {};

  return (
    <div className="create-post-button-cluster">
      <div className="create-post-button-cluster-icon-bg-media">
        <input
          className="create-post-button-cluster-file-update"
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
              ? "create-post-button-cluster-icon-bg"
              : "create-post-button-cluster-icon-bg icon-active"
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
          disableGif()
            ? "create-post-button-cluster-icon-bg"
            : "create-post-button-cluster-icon-bg icon-active"
        }
        onClick={displayGif}
      >
        <GIFSVG
          height={20}
          width={20}
          color={
            currentPostImages.length > 0 ? "rgba(19,161,242,.5)" : "#1DA1F2"
          }
        />
      </div>

      {type === "post" && (
        <div
          className={
            currentPostImages.length > 0
              ? "create-post-button-cluster-icon-bg"
              : "create-post-button-cluster-icon-bg icon-active"
          }
          onClick={generatePoll}
        >
          <PollSVG
            height={20}
            width={20}
            color={
              currentPostImages.length > 0 ? "rgba(19,161,242,.5)" : "#1DA1F2"
            }
          />
        </div>
      )}

      <div
        className="create-post-button-cluster-icon-bg icon-active"
        onClick={openEmojiPicker}
      >
        <EmojiSVG height={20} width={20} color={"#1DA1F2"} />
      </div>

      {type === "post" && (
        <div
          className="create-post-button-cluster-icon-bg icon-active"
          onClick={openScheduleModal}
        >
          <ScheduleSVG height={20} width={20} color={"#1DA1F2"} />
        </div>
      )}

      {type !== "reply" && (
        <div
          className="create-post-button-cluster-location icon-active"
          onClick={openLocationModal}
        >
          <LocationSVG height={20} width={20} color={"#1DA1F2"} />
        </div>
      )}
    </div>
  );
};
