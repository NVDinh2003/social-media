import React from "react";
import { User } from "../../../../utils/GlobalInterface";
import CameraSVG from "../../../../components/SVGs/EditProfile/Camera.svg";

interface EditProfileAndBannerPictureProps {
  currentUser: User | undefined;
}

export const EditProfileAndBannerPicture: React.FC<
  EditProfileAndBannerPictureProps
> = ({ currentUser }) => {
  //
  const default_pfp = process.env.REACT_APP_PFP;

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
            currentUser?.bannerPicture
              ? {
                  backgroundImage: `url("${currentUser.bannerPicture.imageURL}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : { backgroundColor: "#aab8c2" }
          }
        />

        {/* Overlay với camera */}
        <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-all">
          <div className="w-full h-full relative flex items-center justify-center">
            <img
              src={CameraSVG}
              width="30"
              className="cursor-pointer z-20"
              alt=""
            />
            <input
              id="bannerPhotoInput"
              // onInput={(e) => setBanner(e.target.files[0])}
              // onChange={() => update("bannerPhoto")}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div id="profilephoto" className="relative pl-6 z-20">
        <div className="w-[116px] h-[116px] rounded-full border-2 border-black absolute -bottom-16 overflow-hidden flex items-center justify-center ">
          <img
            id="profilePhotoImg"
            src={currentUser?.profilePicture?.imageURL ?? default_pfp}
            className="object-cover w-full h-full"
            alt="user's profile picture"
          />
          <div className="z-10 bg-black/10 hover:bg-black/20 transition-all absolute w-full h-full flex items-center justify-center bg-opacity-30">
            <img
              src={CameraSVG}
              width="30"
              className="cursor-pointer z-20"
              alt=""
            />
            <input
              id="profilePhotoInput"
              //   onInput={(e) => setPhoto(e.target.files[0])}
              //   onChange={() => update("profilePhoto")}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="opacity-0 absolute z-20 cursor-pointer "
            />
          </div>
        </div>
      </div>
    </>
  );
};
