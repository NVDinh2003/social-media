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

export const EditProfile: React.FC = () => {
  //

  const dispatch: AppDispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.loggedIn);
  const token = useSelector((state: RootState) => state.user.token);

  const [banner, setBanner] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(null);
  const [name, setName] = useState(null);

  //   useEffect(() => {
  //     if (currentUser) {
  //       const userNameInput = document.getElementById(
  //         "userNameInput"
  //       ) as HTMLInputElement; // Chỉ định kiểu
  //       const userDescriptionInput = document.getElementById(
  //         "userDescriptionInput"
  //       ) as HTMLTextAreaElement; // Chỉ định kiểu
  //       if (userNameInput && userDescriptionInput) {
  //         // Kiểm tra xem phần tử có tồn tại không
  //         userNameInput.value = currentUser.nickname;
  //         userDescriptionInput.value = currentUser.bio;
  //         setName(currentUser.nickname);
  //         setDescription(currentUser.bio);
  //       }
  //     }
  //   }, [currentUser]);

  //   const update = (d: string) => {
  //     // Chỉ định kiểu cho tham số
  //     const data = document.getElementById(`${d}Input`)?.files?.[0]; // Sử dụng optional chaining
  //     if (data) {
  //       const imgElement = document.getElementById(`${d}Img`) as HTMLImageElement; // Chỉ định kiểu
  //       if (imgElement) {
  //         imgElement.src = URL.createObjectURL(data);
  //       }
  //     }
  //   };

  //   const sendPhoto = () => {
  //     if (loading) return;
  //     if (!description || description.length < 3 || !name || name.length < 3) {
  //       return alert("Cannot be blank!"); // Sửa thông báo
  //     }
  //     setLoading(true);

  //     const formData = new FormData();
  //     if (banner)
  //       formData.append("files", banner, `banner-${currentUser?.userId}`);
  //     if (photo) formData.append("files", photo, `photo-${currentUser?.userId}`);

  //     // Gọi API upload ảnh
  //     axios
  //       .post("/upload", formData, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((response) => {
  //         // dispatch(updateUser(response.data));
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });

  //     // api update user
  //     axios
  //       .post(
  //         "/update",
  //         {
  //           id: currentUser?.username,
  //           description,
  //           name,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         if (!response.data) return;
  //         // dispatch(updateUser(response.data)); // Cập nhật người dùng
  //         setDescription(response.data.description);
  //         setName(response.data.name);
  //       })
  //       .catch((err) => {
  //         console.error(err); // Ghi log lỗi
  //       })
  //       .finally(() => {
  //         setLoading(false); // Đặt loading về false
  //       });
  //   };

  function closeModal() {
    dispatch(updateDisplayEditProfile());
  }

  return (
    //   <BottomlessModal topBar={<>Top bar</>} content={<>Content</>} />;
    <div
      id="edit"
      className="flex absolute md:fixed right-0 top-0 items-center justify-center w-full h-full z-20 md:pl-0 bg-transparent md:bg-current border-l border-l-gray-600 border-opacity-50 md:border-none"
      style={{ backgroundColor: "rgba(91, 112, 131, 0.4)" }}
    >
      {currentUser && (
        <div className="md:min-w-[600px] md:max-w-[600px] md:min-h-[400px] md:max-h-[90vh] md:h-[650px] w-full min-h-full h-full bg-white md:rounded-3xl   relative z-30">
          <div
            className="px-4 flex items-center h-[53px] fixed bg-white w-[85%] md:max-w-max md:min-w-[600px] md:rounded-tl-3xl md:rounded-tr-3xl z-50 "
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
            <span className="font-bold text-xl ml-10 ">Edit profile</span>
            <button
              //   onClick={}
              className="w-20 font-semibold text-sm rounded-2xl flex items-center justify-center h-8 text-white bg-black ml-auto transition-all hover:bg-[#000000cc] "
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-gray-600 border-t-[#1d9bf0] animate-spin rounded-full "></div>
              ) : (
                <span>Save</span>
              )}
            </button>
          </div>

          <div className="h-[53px] w-full "></div>

          <EditProfileAndBannerPicture currentUser={currentUser} />

          <div id="inputs" className="flex flex-col px-4 mt-20 gap-6">
            <input
              type="text"
              //   onInput={(e) => setName(e.target.value)}
              id="userNameInput"
              className="outline-none rounded h-14 text-lg w-full bg-transparent transition-all focus-within:border-[#1d9bf0] border-2 border-gray-600 border-opacity-50 px-4"
              placeholder="Họ Tên"
            />

            <p className="location-modal-content-label">Địa chỉ chi tiết</p>
            <div className="location-modal-content-address-group">
              <div className="location-modal-content-address-input-wrapper">
                <ValidatedTextInput
                  valid={true}
                  name={"nickname"}
                  label={""}
                  changeValue={() => {}}
                  data={currentUser.nickname}
                />
              </div>
            </div>

            <div className="register-name-input">
              <div className="register-name-content">
                <ValidatedTextInput
                  valid={true}
                  name={"firstName"}
                  label={"Họ"}
                  changeValue={() => {}}
                  data={currentUser.firstName}
                  attributes={{
                    maxLength: 50,
                  }}
                />
                {true ? (
                  <></>
                ) : (
                  <span className="register-name-error">What's your name?</span>
                )}
              </div>

              <div className="register-name-content">
                <ValidatedTextInput
                  valid={true}
                  name={"lastName"}
                  label={"Tên"}
                  changeValue={() => {}}
                  data={currentUser.lastName}
                  attributes={{
                    maxLength: 50,
                  }}
                />
                {true ? (
                  <></>
                ) : (
                  <span className="register-name-error">What's your name?</span>
                )}
              </div>
            </div>

            <div className="register-one-dob-wrapper">
              <h4 className="register-h4">Ngày sinh</h4>
              <span className="register-text-sm color-gray">
                Thông tin này sẽ không được hiển thị công khai. Vui lòng xác
                nhận ngày sinh của bạn !
              </span>
            </div>
            {/* <RegisterDateInput date={currentUser.dateOfBirth} /> */}

            <div className="group w-full border-2 border-gray-600 border-opacity-50 rounded transition-all focus-within:border-[#1d9bf0] h-[96px] px-2 relative">
              <span className="text-sm text-gray-500 group-focus-within:text-[#1d9bf0] ">
                Bio
              </span>
              <textarea
                // onInput={(e) => setDescription(e.target.value)}
                id="userDescriptionInput"
                className="w-full h-[60px] bg-transparent outline-none"
                // cols="30"
                // rows="10"
              ></textarea>
            </div>
          </div>
        </div>
      )}

      <div
        //   onClick={() => setEditMode(false)}
        className="w-full h-full absolute"
      ></div>
    </div>
  );
};
