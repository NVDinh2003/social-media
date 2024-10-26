import { useDispatch, useSelector } from "react-redux";
import { Client, over } from "stompjs";
import { AppDispatch, RootState } from "../redux/Store";
import { useState } from "react";
import SockJS from "sockjs-client";
import {
  dispatchUnreadMessage,
  loadNotifications,
  recievedNotification,
} from "../redux/Slices/NotificationSlice";
import {
  loadConversations,
  recievedMessage,
} from "../redux/Slices/MessagesSlice";

export function useWebSocket() {
  const API_URL = process.env.REACT_APP_API_URL;
  let stompClient: Client | null = null;
  const user = useSelector((state: RootState) => state.user.loggedIn);
  const token = useSelector((state: RootState) => state.user.token);
  const conversations = useSelector(
    (state: RootState) => state.message.conversations
  );
  const dispatch: AppDispatch = useDispatch();

  const [connected, setConnected] = useState<boolean>(false);

  function connect() {
    // console.log(user, token);
    if (user) {
      const socket = new SockJS(`${API_URL}/ws`);
      stompClient = over(socket);

      stompClient.connect({}, onConnected, onError);
      if (token) {
        dispatch(
          loadNotifications({
            userId: user.userId,
            token,
          })
        );
      }
    }
  }

  function onConnected() {
    console.log("Connected to websocket server");
    setConnected(true);
    if (stompClient) {
      stompClient.subscribe(
        `/user/${user?.username}/notifications`,
        onNotificationRecieved
      );

      stompClient.subscribe(
        `/user/${user?.username}/messages`,
        onMessageRecieved
      );
      console.log("Subscribed to notifications");
    }
  }

  function onError(error: any) {
    console.error("WebSocket error:", error);
    setConnected(false);
  }

  function onNotificationRecieved(payload: any) {
    const notification = JSON.parse(payload.body);
    dispatch(recievedNotification(notification));
    if (notification.notificationType === "MESSAGE") {
      dispatch(dispatchUnreadMessage(notification));
    }
    // console.log(payload);
  }

  function onMessageRecieved(payload: any) {
    const message = JSON.parse(payload.body);
    const conversationExists = conversations.some(
      (conversation) => conversation.conversationId === message.conversationId
    );

    if (!conversationExists && user && token) {
      dispatch(
        loadConversations({
          userId: user.userId,
          token,
        })
      );
    } else {
      dispatch(recievedMessage(message));
    }
  }

  return { connected, connect };
}
