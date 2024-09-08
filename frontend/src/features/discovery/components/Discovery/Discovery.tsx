import React from "react";

import "./Discovery.css";
import { DiscoverySearchBar } from "../DiscoverySearchBar/DiscoverySearchBar";

export const Discovery: React.FC = () => {
  return (
    <div className="discovery">
      <div className="discovery-sticky">
        <DiscoverySearchBar />
      </div>
    </div>
  );
};
