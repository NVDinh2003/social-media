import React, { useState } from "react";

import "./PostMoreModal.css";
import { User } from "../../../../../utils/GlobalInterface";
import NotInterestedSVG from "../../../../../components/SVGs/PostMoreSVG/NotInterestedSVG";
import SubscribeSVG from "../../../../../components/SVGs/PostMoreSVG/SubscribeSVG";
import UnfollowSVG from "../../../../../components/SVGs/PostMoreSVG/UnfollowSVG";
import FollowSVG from "../../../../../components/SVGs/PostMoreSVG/FollowSVG";
import ListAddSVG from "../../../../../components/SVGs/PostMoreSVG/ListAddSVG";
import MuteSVG from "../../../../../components/SVGs/PostMoreSVG/MuteSVG";
import BlockSVG from "../../../../../components/SVGs/PostMoreSVG/BlockSVG";
import ViewsSVG from "../../../../../components/SVGs/ViewsSVG";
import EmbedSVG from "../../../../../components/SVGs/PostMoreSVG/EmbedSVG";
import ReportSVG from "../../../../../components/SVGs/PostMoreSVG/ReportSVG";
import { checkFollowing } from "../../../../../services/UserService";

interface PostMoreModalProps {
  author: User;
  followingList: User[];
}

export const PostMoreModal: React.FC<PostMoreModalProps> = ({
  author,
  followingList,
}) => {
  const [following, setFollowing] = useState<boolean>(() => {
    return checkFollowing(followingList, author);
  });

  return (
    <div className="post-more-modal">
      <div className="post-more-modal-option">
        <NotInterestedSVG width={18} height={18} />
        <p className="post-more-modal-option-text">
          Not interested in this post
        </p>
      </div>

      {!following && (
        <div className="post-more-modal-option">
          <SubscribeSVG width={18} height={18} />
          <p className="post-more-modal-option-text">
            Subscrive to @{author.username}
          </p>
        </div>
      )}

      <div className="post-more-modal-option">
        {following ? (
          <UnfollowSVG width={18} height={18} />
        ) : (
          <FollowSVG width={18} height={18} />
        )}
        <p className="post-more-modal-option-text">
          {following ? "Unfollow" : "Follow"} @{author.username}
        </p>
      </div>

      <div className="post-more-modal-option">
        <ListAddSVG width={18} height={18} />
        <p className="post-more-modal-option-text">
          Add/remove @{author.username} from Lists
        </p>
      </div>

      <div className="post-more-modal-option">
        <MuteSVG width={18} height={18} />
        <p className="post-more-modal-option-text">Mute @{author.username}</p>
      </div>

      <div className="post-more-modal-option">
        <BlockSVG width={18} height={18} />
        <p className="post-more-modal-option-text">Block @{author.username}</p>
      </div>

      <div className="post-more-modal-option">
        <ViewsSVG width={18} height={18} />
        <p className="post-more-modal-option-text">View post engagements</p>
      </div>

      <div className="post-more-modal-option">
        <EmbedSVG width={18} height={18} />
        <p className="post-more-modal-option-text">Embed post</p>
      </div>

      <div className="post-more-modal-option">
        <ReportSVG width={18} height={18} />
        <p className="post-more-modal-option-text">Report post</p>
      </div>
    </div>
  );
};
