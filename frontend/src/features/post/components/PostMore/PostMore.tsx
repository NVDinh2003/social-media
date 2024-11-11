import React, { useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import "./PostMore.css";
import { User } from "../../../../utils/GlobalInterface";
import { PostMoreModal } from "./PostMoreModal/PostMoreModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { updateDisplayPostMore } from "../../../../redux/Slices/ModalSlice";

interface PostMoreProps {
  postId: number;
  postAuthor: User;
}

export const PostMore: React.FC<PostMoreProps> = ({ postId, postAuthor }) => {
  const following = useSelector((state: RootState) => state.user.following);
  const displayPostMore = useSelector(
    (state: RootState) => state.modal.displayPostMore
  );
  const dispatch: AppDispatch = useDispatch();

  const [color, setColor] = useState<string>("#657786");
  const [active, setActive] = useState<boolean>(false);

  const openPostMoreOptions = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const id: number = +e.currentTarget.id;
    dispatch(updateDisplayPostMore());
    if (id === postId) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  useEffect(() => {
    if (!displayPostMore) {
      setActive(false);
    }
  }, [displayPostMore]); // when postmore display changes

  return (
    <div
      className="post-more"
      id={`${postId}`}
      onMouseOver={() => setColor("#1da1f2")}
      onMouseLeave={() => setColor("#657786")}
      onClick={openPostMoreOptions}
    >
      <MoreHorizIcon
        sx={{
          height: "20px",
          width: "20px",
        }}
      />
      {displayPostMore && active && (
        <PostMoreModal
          author={postAuthor}
          followingList={following}
          postId={postId}
        />
      )}
    </div>
  );
};
