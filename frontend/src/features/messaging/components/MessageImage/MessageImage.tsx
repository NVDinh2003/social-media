import React, { useEffect, useRef, useState } from "react";

import "./MessageImage.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { updateDisplayEditPostImage } from "../../../../redux/Slices/ModalSlice";
import EditImageSVG from "../../../../components/SVGs/Messages/EditImageSVG";
import { Close } from "@mui/icons-material";
import PlayGifSVG from "../../../../components/SVGs/Messages/PlayGifSVG";
import gifIcon from "../../../../../src/assets/gif_icon.png";

interface MessageImageProps {
  image?: File;
  removeImage: () => void;
}

export const MessageImage: React.FC<MessageImageProps> = ({
  image,
  removeImage,
}) => {
  //
  const messageGif = useSelector((state: RootState) => state.message.gifUrl);
  const dispatch: AppDispatch = useDispatch();

  const [playGif, setPlayGif] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const openEditor = () => {
    dispatch(updateDisplayEditPostImage());
  };

  const freezeGif = () => {
    if (canvasRef && canvasRef.current && imageRef && imageRef.current) {
      const height = 150;
      const width = 150;
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      const context = canvasRef.current.getContext("2d");
      if (context !== null) {
        context.drawImage(imageRef.current, 0, 0, width, height);
      }
    }
  };

  const handlePlayGif = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPlayGif((play) => {
      return !play;
    });
  };
  const backgroundImage = () => {
    if (messageGif === "") {
      return image ? window.URL.createObjectURL(image) : "";
    } else {
      return playGif ? messageGif : "";
    }
  };

  useEffect(() => {
    if (!playGif) freezeGif();
  }, [playGif]);

  return (
    <div className="message-image-container">
      <div
        className="message-image"
        style={{ backgroundImage: `url("${backgroundImage()}")` }}
        onClick={handlePlayGif}
      >
        <div
          className="message-image-icon-wrapper message-image-edit message-image-icon-hover"
          onClick={openEditor}
        >
          <EditImageSVG height={16} width={16} color="#FFF" />
        </div>
        <div
          className="message-image-icon-wrapper message-image-remove message-image-icon-hover"
          onClick={removeImage}
        >
          <Close sx={{ fontSize: "18px", color: "white" }} />
        </div>
        {!playGif && !image && (
          <div className="message-gif-play message-image-icon-wrapper message-image-play-hover">
            <PlayGifSVG height={60} width={60} color={"#FFF"} />
          </div>
        )}
        {!playGif && !image && (
          <div onClick={handlePlayGif}>
            <img src={messageGif} ref={imageRef} hidden />
            <canvas ref={canvasRef} onClick={handlePlayGif}></canvas>
          </div>
        )}
      </div>
      {messageGif && (
        <div className="message-gif-bottom-text">
          via
          <img height={16} width={16} src={gifIcon} alt="gif icon" />
          <p className="message-gif-tenor-text">TENOR</p>
        </div>
      )}
    </div>
  );
};
