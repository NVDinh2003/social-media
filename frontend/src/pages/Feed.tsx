import React, { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { RootState, AppDispatch } from "../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/Slices/UserSlice";
import { useNavigate } from "react-router-dom";

export const Feed: React.FC = () => {
  //
  const state = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();

  const [jwt, setJwt, removeJwt] = useLocalStorage("token", "");

  useEffect(() => {
    if (jwt === "" && state.token !== "") {
      console.log("There is no token in localstorage, but theres one in state");
      console.log(
        "this means the user just logged in, store the token in localstorage"
      );
      setJwt(state.token);
    } else if (jwt !== "" && state.token === "") {
      console.log("user returned to the website and is logged in");
      console.log("need to store the token in the userSlice");
      dispatch(setToken(jwt));
    } else {
      console.log("user is not logged in");
      console.log("navigate to the login page");
      navigate("/");
    }
  }, []);

  return (
    <div>
      <h1>WELCOME FEED PAGE</h1>
    </div>
  );
};
