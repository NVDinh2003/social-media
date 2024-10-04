import React, { useEffect, useRef, useState } from "react";

import "./CreatePostTextArea.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import {
  updateCurrentPost,
  // updateCurrentReply,
} from "../../../../redux/Slices/PostSlice";
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
  const state = useSelector((state: RootState) => state);
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

      // console.log(newContent);
    }
  };

  const activate = (e: React.MouseEvent<HTMLDivElement>) => {
    if (textAreaRef && textAreaRef.current) textAreaRef.current.focus();
  };

  const textContent = (): { elements: JSX.Element[]; content: string } => {
    if (location === "post" && state.post.currentPost) {
      return {
        elements: convertPostContentToElements(
          state.post.currentPost.content,
          "creator"
        ),
        content: state.post.currentPost.content,
      };
    }

    if (location === "reply" && state.post.currentReply) {
      return {
        elements: convertPostContentToElements(
          state.post.currentReply.replyContent,
          "creator"
        ),
        content: state.post.currentReply.replyContent,
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
      setContent((content) => {
        return (
          content.substring(0, content.lastIndexOf("@") + 1) + username + " "
        );
      });
    }
  };

  useEffect(() => {
    console.log(mentioning, content);
  }, [content, mentionedUser]);

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
            state.post.currentPost || state.post.currentReply
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
