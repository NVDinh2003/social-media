import { createContext, useState } from "react";
import { Notification as INotification } from "../../../utils/GlobalInterface";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";

export type MessagingContextType = {
  open: boolean;
  conversationOpen: boolean;
  unreadMessages: INotification[];
  togglePopup: () => void;
  toggleConversation: (conversationId: number) => void;
};

export const MessagingContext = createContext<MessagingContextType | null>(
  null
);

const MessagingContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //
  const unreadMessages = useSelector(
    (state: RootState) => state.notification.messageNotifications
  ).filter((notification) => !notification.acknowledged);

  const [open, setOpen] = useState<boolean>(false);
  const [conversationOpen, setConversationOpen] = useState<boolean>(false);

  function togglePopup() {
    setOpen((open) => {
      return !open;
    });
  }

  function toggleConversation(conversationId: number) {
    setConversationOpen((conversationOpen) => {
      return !conversationOpen;
    });
  }

  return (
    <MessagingContext.Provider
      value={{
        open,
        conversationOpen,
        unreadMessages,
        togglePopup,
        toggleConversation,
      }}
    >
      {children}
    </MessagingContext.Provider>
  );
};

export default MessagingContextProvider;
