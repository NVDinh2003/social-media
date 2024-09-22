import React, { useEffect, useRef, useState } from "react";

import "./CreatePostTextArea.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import {
  updateCurrentPost,
  // updateCurrentReply,
} from "../../../../redux/Slices/PostSlice";

interface CreatePostTextAreaProps {
  location: string;
}

export const CreatePostTextArea: React.FC<CreatePostTextAreaProps> = ({
  location,
}) => {
  const state = useSelector((state: RootState) => state);
  const dispatch: AppDispatch = useDispatch();

  const [content, setContent] = useState<string>("");

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const resetTextAreaHeight = () => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = "25px"; // Đặt lại chiều cao ban đầu
    }
  };

  useEffect(() => {
    // Đồng bộ hóa state local với state Redux
    let newContent = "";
    if (location === "post") {
      newContent = state.post.currentPost?.content || "";
    } else if (location === "reply") {
      newContent = state.post.currentReply?.replyContent || "";
    }
    setContent(newContent);

    // Reset chiều cao nếu nội dung trống
    if (newContent === "") {
      resetTextAreaHeight();
    }
  }, [state.post.currentPost, state.post.currentReply, location]);

  const autoGrow = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // setPostContent(e.target.value);
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = "25px";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }

    const newContent = e.target.value;
    setContent(newContent);

    if (location === "post") {
      dispatch(
        updateCurrentPost({
          name: "content",
          value: newContent,
        })
      );
      // console.log(newContent);
    }

    if (location === "reply") {
      dispatch(
        updateCurrentPost({
          name: "replyContent",
          value: newContent,
        })
      );

      console.log(newContent);
    }
  };

  const activate = (e: React.MouseEvent<HTMLDivElement>) => {
    if (textAreaRef && textAreaRef.current) textAreaRef.current.focus();
  };

  return (
    <div className="create-post-text-area" onClick={activate}>
      {/* {content !== "" && (
        <div className="create-post-text-area-content">{content}</div>
      )} */}

      <textarea
        className={
          state.post.currentPost || state.post.currentReply
            ? "create-post-text-area-creator-input input-active"
            : "create-post-text-area-creator-input"
        }
        placeholder="What is happening?!"
        ref={textAreaRef}
        onChange={autoGrow}
        cols={50}
        maxLength={256}
        id={"post-text"}
        value={content}
      />
    </div>
  );
};
