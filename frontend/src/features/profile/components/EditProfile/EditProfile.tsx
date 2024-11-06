import React, { useEffect, useState } from "react";
import { Modal } from "../../../../components/Modal/Modal";
import { BottomlessModal } from "../../../../components/BottomlessModal/BottomlessModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { updateDisplayEditProfile } from "../../../../redux/Slices/ModalSlice";
import Close from "@mui/icons-material/Close";

import axios from "axios";
import { ValidatedTextInput } from "../../../../components/ValidatedInput/ValidatedTextInput";
import { RegisterNameInputs } from "../../../register/components/RegisterNameInput/RegisterNameInputs";
import { RegisterEmailInput } from "../../../register/components/RegisterEmailInput/RegisterEmailInput";
import { RegisterDateInput } from "../../../register/components/RegisterDateInput/RegisterDateInput";
import { EditProfileAndBannerPicture } from "./EditProfileAndBannerPicture";

import { current } from "@reduxjs/toolkit";
import { EditUserInfoForm } from "./EditUserInfoForm";
import { User, Dob } from "../../../../utils/GlobalInterface";
import {
  updateProfilePicture,
  updateBannerPicture,
  updateUserInfo,
} from "../../../../redux/Slices/UserSlice";
import { convertDateStringToDob } from "../../../../utils/DateUtils";

export const EditProfile: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.loggedIn);
  // console.log(currentUser?.dateOfBirth);
  const token = useSelector((state: RootState) => state.user.token);

  const [banner, setBanner] = useState<File | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);

  const [dob, setDob] = useState<Dob>({
    day: 1,
    month: 1,
    year: 2000,
  });

  // console.log("dob", currentUser?.dateOfBirth);
  useEffect(() => {
    if (typeof currentUser?.dateOfBirth === "string") {
      setDob(convertDateStringToDob(currentUser.dateOfBirth));
    }
  }, [currentUser?.dateOfBirth]);

  useEffect(() => {
    // console.log("dob changed", dob);
    setFormData((prevFormData) => ({
      ...prevFormData,
      dateOfBirth: dob,
    }));
  }, [dob]);
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    nickname: currentUser?.nickname || "",
    bio: currentUser?.bio || "",
    dateOfBirth: dob,
  });
  const [valid, setValid] = useState(true);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const handleImageChange = (type: "banner" | "photo", file: File) => {
    if (type === "banner") {
      setBanner(file);
    } else {
      setPhoto(file);
    }
  };

  const handleSave = async () => {
    if (!currentUser || !valid) return;

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000)); // set loading for 2s

    try {
      const updatePromises = [];

      if (banner) {
        updatePromises.push(
          dispatch(updateBannerPicture({ token, file: banner })).unwrap()
        );
      }

      if (photo) {
        console.log("update pfp picture");
        updatePromises.push(
          dispatch(updateProfilePicture({ token, file: photo })).unwrap()
        );
      }

      const updatedFields: Partial<User> = {};
      if (formData.firstName !== currentUser.firstName) {
        updatedFields.firstName = formData.firstName;
      }
      if (formData.lastName !== currentUser.lastName) {
        updatedFields.lastName = formData.lastName;
      }
      if (formData.nickname !== currentUser.nickname) {
        updatedFields.nickname = formData.nickname;
      }
      if (formData.bio !== currentUser.bio) {
        updatedFields.bio = formData.bio;
      }

      updatedFields.dateOfBirth = formData.dateOfBirth;

      if (Object.keys(updatedFields).length > 0) {
        updatePromises.push(
          dispatch(updateUserInfo({ token, userInfo: updatedFields })).unwrap()
        );
      }

      await Promise.all(updatePromises);

      dispatch(updateDisplayEditProfile());
    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
      setLoading(false);
    }
  };
  function closeModal() {
    dispatch(updateDisplayEditProfile());
  }

  if (!currentUser) return null;

  return (
    <div
      id="edit"
      className="flex absolute md:fixed right-0 top-0 items-center justify-center w-full h-full z-20 md:pl-0 bg-transparent md:bg-current border-l border-l-gray-600 border-opacity-50 md:border-none"
      style={{ backgroundColor: "rgba(91, 112, 131, 0.4)" }}
    >
      <div className="md:min-w-[600px] md:max-w-[600px] md:min-h-[400px] md:max-h-[90vh] md:h-[650px] w-full min-h-full h-full bg-white md:rounded-3xl relative overflow-y-scroll z-30">
        <div
          className="px-4 flex items-center h-[53px] fixed bg-white w-[85%] md:max-w-max md:min-w-[600px] md:rounded-tl-3xl md:rounded-tr-3xl z-50"
          style={{
            backdropFilter: "blur(12px)",
            backgroundColor: "rgba(256, 256, 256, 0.5)",
          }}
        >
          <div
            className="schedule-post-modal-top-bar-close-bg"
            onClick={closeModal}
          >
            <Close
              sx={{
                width: "20px",
                height: "20px",
              }}
            />
          </div>
          <span className="font-bold text-xl ml-10">Edit profile</span>
          <button
            onClick={handleSave}
            disabled={loading || !valid}
            className="w-20 font-semibold text-sm rounded-2xl flex items-center justify-center h-8 text-white bg-blue-500 ml-auto transition-all hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-gray-600 border-t-[#1fe619] animate-spin rounded-full" />
            ) : (
              <span>Save</span>
            )}
          </button>
        </div>

        <div className="h-[53px] w-full" />

        <EditProfileAndBannerPicture
          currentUser={currentUser}
          onImageChange={handleImageChange}
          loading={loading}
        />

        <EditUserInfoForm
          formData={formData}
          setFormData={setFormData}
          setValid={setValid}
        />
      </div>
    </div>
  );
};
