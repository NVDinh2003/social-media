import React, { useRef } from "react";

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
  updateDisplaySchedule,
} from "../../../../redux/Slices/ModalSlice";

export const CreatePostButtonCluster = () => {
  //
  const state = useSelector((state: RootState) => state);
  const dispatch: AppDispatch = useDispatch();

  const imageSelectorRef = useRef<HTMLInputElement>(null);

  const handleGetImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Lấy danh sách images hiện tại từ state
    const imageList: File[] = state.post.currentPostImages;

    if (imageSelectorRef.current && e.target.files) {
      if (e.target.files.length + imageList.length > 4) {
        console.log("Selected to many files");
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
    if (state.post.currentPostImages.length === 4) return true;

    if (state.post.currentPostImages[0]?.type === "image/gif") return true;

    return false;
  };

  const displayGif = () => {
    dispatch(updateDisplayGif());
  };

  const generatePoll = (e: React.MouseEvent<HTMLDivElement>) => {
    if (state.post.currentPost || state.post.currentReply) {
      dispatch(createPoll());
    }
  };

  const openScheduleModal = () => {
    dispatch(updateDisplaySchedule());
  };

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
          state.post.currentPostImages.length > 0
            ? "create-post-button-cluster-icon-bg"
            : "create-post-button-cluster-icon-bg icon-active"
        }
        onClick={displayGif}
      >
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
            ? "create-post-button-cluster-icon-bg"
            : "create-post-button-cluster-icon-bg icon-active"
        }
        onClick={generatePoll}
      >
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
      <div className="create-post-button-cluster-icon-bg icon-active">
        <EmojiSVG height={20} width={20} color={"#1DA1F2"} />
      </div>
      <div
        className="create-post-button-cluster-icon-bg icon-active"
        onClick={openScheduleModal}
      >
        <ScheduleSVG height={20} width={20} color={"#1DA1F2"} />
      </div>
      <div className="create-post-button-cluster-location">
        <LocationSVG height={20} width={20} color={"rgba(29,161,242,.5)"} />
      </div>
    </div>
  );
};
