import React, { useEffect, useRef, useState } from "react";

import "./CreatePostTextArea.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { updateCurrentPost } from "../../../../redux/Slices/PostSlice";
import { convertPostContentToElements } from "../../utils/PostUtils";
import { updateDisplayPostMention } from "../../../../redux/Slices/ModalSlice";
import DiscoveryProvider from "../../../discovery/context/DiscoveryContext";
import { CreateMentionPostModal } from "../CreateMentionPostModal/CreateMentionPostModal";

interface CreatePostTextAreaProps {
  location: string;
  placeholder: string;
}

export const CreatePostTextArea: React.FC<CreatePostTextAreaProps> = ({
  location,
  placeholder,
}) => {
  const currentPost = useSelector((state: RootState) => state.post.currentPost);
  const currentReply = useSelector(
    (state: RootState) => state.post.currentReply
  );
  const mentioning = useSelector(
    (state: RootState) => state.modal.displayPostMention
  );
  const dispatch: AppDispatch = useDispatch();
  const [content, setContent] = useState<string>("");
  const [mentionedUser, setMentionedUser] = useState<string>("");
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
      newContent = currentPost?.content || "";
    } else if (location === "reply") {
      newContent = currentReply?.replyContent || "";
    }
    setContent(newContent);

    // Reset chiều cao nếu nội dung trống
    if (newContent === "") {
      resetTextAreaHeight();
    }
  }, [currentPost, currentReply, location]);

  const autoGrow = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = "25px";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
    const content = textContent();
    if (
      content.elements[content.elements.length - 1].props.className.includes(
        "mention"
      )
    ) {
      dispatch(updateDisplayPostMention(true));
      setMentionedUser(
        content.elements[content.elements.length - 1].props.children.substring(
          1
        )
      );
    } else {
      dispatch(updateDisplayPostMention(false));
    }

    const newContent = e.target.value;
    setContent(newContent);

    if (location === "post") {
      dispatch(updateCurrentPost({ name: "content", value: newContent }));
    }

    if (location === "reply") {
      dispatch(updateCurrentPost({ name: "replyContent", value: newContent }));
    }
  };

  const activate = (e: React.MouseEvent<HTMLDivElement>) => {
    if (textAreaRef && textAreaRef.current) textAreaRef.current.focus();
  };

  const textContent = (): { elements: JSX.Element[]; content: string } => {
    if (location === "post" && currentPost) {
      return {
        elements: convertPostContentToElements(currentPost.content, "creator"),
        content: currentPost.content,
      };
    }

    if (location === "reply" && currentReply) {
      return {
        elements: convertPostContentToElements(
          currentReply.replyContent,
          "creator"
        ),
        content: currentReply.replyContent,
      };
    }

    return { elements: [], content: "" };
  };

  const selectMention = (username: string) => {
    dispatch(updateDisplayPostMention(false));
    if (location === "post") {
      dispatch(
        updateCurrentPost({
          name: "content",
          value:
            content.substring(0, content.lastIndexOf("@") + 1) + username + " ",
        })
      );
    }

    if (location === "reply") {
      dispatch(
        updateCurrentPost({
          name: "replyContent",
          value:
            content.substring(0, content.lastIndexOf("@") + 1) + username + " ",
        })
      );
      setMentionedUser(username);
      setContent(
        (content) =>
          content.substring(0, content.lastIndexOf("@") + 1) + username + " "
      );
    }
  };

  return (
    <DiscoveryProvider>
      <div className="create-post-text-area" onClick={activate}>
        {mentioning && (
          <CreateMentionPostModal
            content={mentionedUser}
            userClicked={selectMention}
          />
        )}
        {content !== "" && (
          <div className="create-post-text-area-content">
            {textContent().elements}
          </div>
        )}

        <textarea
          className={
            currentPost || currentReply
              ? "create-post-text-area-creator-input input-active"
              : "create-post-text-area-creator-input"
          }
          placeholder={placeholder}
          ref={textAreaRef}
          onChange={autoGrow}
          cols={50}
          maxLength={256}
          id={"post-text"}
          value={textContent().content}
        />
      </div>
    </DiscoveryProvider>
  );
};
