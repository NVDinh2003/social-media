import React from "react";

import "./CreateReply.css";
import { Modal } from "../../../../components/Modal/Modal";
import { CreateReplyTop } from "./CreateReplyTop/CreateReplyTop";
import { CreateReplyBody } from "./CreateReplyBody/CreateReplyBody";
import { CreateReplyBottom } from "./CreateReplyBottom/CreateReplyBottom";

export const CreateReply: React.FC = () => {
  return (
    <Modal
      topContent={<CreateReplyTop />}
      content={<CreateReplyBody />}
      bottomContent={<CreateReplyBottom />}
      topPosition="50px"
      transform="translateX(-50%)"
    />
  );
};
