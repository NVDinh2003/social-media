import React from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";

import "./PostBanner.css";
import { useNavigate } from "react-router-dom";

export const PostBanner: React.FC = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/home");
  };

  return (
    <div className="post-banner">
      <div className="post-banner-back-container" onClick={navigateHome}>
        <ArrowBack
          sx={{
            fontSize: "20px",
          }}
        />
      </div>

      <h1 className="post-banner-header">Post</h1>
    </div>
  );
};
