import React, { useState } from "react";
import { User } from "../../../../utils/GlobalInterface";
import CameraSVG from "../../../../components/SVGs/EditProfile/Camera.svg";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

interface EditProfileAndBannerPictureProps {
  currentUser: User;
  onImageChange: (type: "banner" | "photo", file: File) => void;
  loading: boolean;
}

export const EditProfileAndBannerPicture: React.FC<
  EditProfileAndBannerPictureProps
> = ({ currentUser, onImageChange, loading }) => {
  const default_pfp = process.env.REACT_APP_PFP;

  // State để lưu URL preview
  const [profilePreviewUrl, setProfilePreviewUrl] = useState<string | null>(
    null
  );
  const [bannerPreviewUrl, setBannerPreviewUrl] = useState<string | null>(null);

  // Handle khi chọn profile picture
  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setProfilePreviewUrl(previewUrl);
    onImageChange("photo", file);

    // Cleanup URL cũ khi component unmount
    return () => URL.revokeObjectURL(previewUrl);
  };

  // Handle khi chọn banner picture
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setBannerPreviewUrl(previewUrl);
    onImageChange("banner", file);

    // Cleanup URL cũ khi component unmount
    return () => URL.revokeObjectURL(previewUrl);
  };

  return (
    <>
      <div
        id="bannerSection"
        className="w-full h-[200px] relative bg-[#333639]"
      >
        {/* Banner background */}
        <div
          className="w-full h-full absolute top-0 left-0"
          style={
            bannerPreviewUrl
              ? {
                  backgroundImage: `url("${bannerPreviewUrl}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : currentUser?.bannerPicture
              ? {
                  backgroundImage: `url("${currentUser.bannerPicture.imageURL}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : { backgroundColor: "#aab8c2" }
          }
        />

        {/* Overlay with camera */}
        <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-all">
          <div className="w-full h-full relative flex items-center justify-center">
            <img
              src={CameraSVG}
              width="30"
              className="cursor-pointer z-20"
              alt="Upload banner"
            />
            <input
              id="bannerPhotoInput"
              onChange={handleBannerChange}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={loading}
            />
          </div>
        </div>
      </div>

      <div id="profilephoto" className="relative pl-6 z-20">
        <div className="w-[116px] h-[116px] rounded-full border-2 border-black absolute -bottom-16 overflow-hidden flex items-center justify-center">
          <img
            src={
              profilePreviewUrl ??
              currentUser?.profilePicture?.imageURL ??
              default_pfp
            }
            className="object-cover w-full h-full"
            alt="Profile"
          />
          <div className="z-10 bg-black/10 hover:bg-black/20 transition-all absolute w-full h-full flex items-center justify-center">
            <img
              src={CameraSVG}
              width="30"
              className="cursor-pointer z-20"
              alt="Upload profile"
            />
            <input
              id="profilePhotoInput"
              onChange={handleProfilePictureChange}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="opacity-0 absolute z-20 cursor-pointer"
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </>
  );
};
