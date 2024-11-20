import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Navigation } from "../components/Navigation/Navigation";
import { Discovery } from "../features/discovery/components/Discovery/Discovery";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getUserByToken, setToken } from "../redux/Slices/UserSlice";
import { useEffect } from "react";

import "./LayoutPage.css";
import {
  updateDisplayPostMention,
  updateDisplayPostMore,
} from "../redux/Slices/ModalSlice";
import ModalContainer from "../components/ModalContainer/ModalContainer";
import { MessagesPopup } from "../features/messaging/components/MessagesPopup/MessagesPopup";
import { TopUser } from "../features/topuser/TopUser";

export const LayoutPage: React.FC = () => {
  //
  const state = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const displayPostMore = useSelector(
    (state: RootState) => state.modal.displayPostMore
  );
  const displayPostMention = useSelector(
    (state: RootState) => state.modal.displayPostMention
  );

  const location = useLocation();

  const [jwt, setJwt, removeJwt] = useLocalStorage("token", "");

  useEffect(() => {
    if (jwt !== "" && state.token !== "") dispatch(getUserByToken(state.token));
    else if (jwt === "" && state.token !== "") setJwt(state.token);
    else if (jwt !== "" && state.token === "") dispatch(setToken(jwt));
    else if (!location.pathname.startsWith("/post")) navigate("/");
  }, [state.token]);

  // useEffect(() => {
  //   if (jwt !== "" && state.token === "") {
  //     // Nếu có jwt trong localStorage nhưng state.token rỗng, set lại token và lấy user info
  //     dispatch(setToken(jwt));
  //     dispatch(getUserByToken(jwt));
  //   } else if (jwt !== "" && state.token !== "") {
  //     // Nếu cả jwt và state.token đều tồn tại, lấy user info
  //     dispatch(getUserByToken(state.token));
  //   } else if (jwt === "" && state.token !== "") {
  //     // Nếu không có jwt trong localStorage nhưng có state.token, lưu lại jwt
  //     setJwt(state.token);
  //   } else {
  //     // Không có jwt hoặc state.token, điều hướng về trang login
  //     navigate("/");
  //   }
  // }, [jwt, state.token]);

  const closeOpenedModals = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (displayPostMore) dispatch(updateDisplayPostMore());
    if (displayPostMention) dispatch(updateDisplayPostMention(false));
  };

  return (
    <div className="layout-page" onClick={closeOpenedModals}>
      <ModalContainer />
      <div className="layout">
        <div className="layout-navigation-section">
          <Navigation currentPage={location.pathname} />
        </div>
        <div className="layout-content-section">
          <Outlet />
        </div>
        <div className="layout-info-section">
          <Discovery />
          <TopUser />
        </div>
      </div>

      <MessagesPopup />
    </div>
  );
};
