import { useDispatch, useSelector } from "react-redux";
import { Client, over } from "stompjs";
import { AppDispatch, RootState } from "../redux/Store";
import { useState } from "react";
import SockJS from "sockjs-client";
import {
  loadNotifications,
  recievedNotification,
} from "../redux/Slices/NotificationSlice";

export function useWebsocket() {
  const API_URL = process.env.REACT_APP_API_URL;
  let stompClient: Client | null = null;
  const user = useSelector((state: RootState) => state.user.loggedIn);
  const token = useSelector((state: RootState) => state.user.token);
  const dispatch: AppDispatch = useDispatch();
  const [connected, setConnected] = useState<boolean>(false);

  function connect() {
    console.log(user, token);
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
    // console.log("Connected to websocket server");
    setConnected(true);
    if (stompClient) {
      stompClient.subscribe(
        `/user/${user?.username}/notifications`,
        onMessageReceived
      );
    }
  }

  function onError() {
    setConnected(false);
  }

  function onMessageReceived(payload: any) {
    const notification = JSON.parse(payload.body);
    dispatch(recievedNotification(notification));
    // console.log(payload);
  }

  return { connected, connect };
}
