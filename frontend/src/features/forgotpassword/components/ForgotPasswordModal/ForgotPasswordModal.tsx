import React from "react";
import { Modal } from "../../../../components/Modal/Modal";

export const ForgotPasswordModal: React.FC<{ toggleModal: () => void }> = ({
  toggleModal,
}) => {
  return (
    <Modal
      topContent={<>Top</>}
      content={<>Content</>}
      bottomContent={<>Bottom</>}
    />
  );
};
