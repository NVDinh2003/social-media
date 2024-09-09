import React, { useState } from "react";

import DiscoveryProvider from "../../context/DiscoveryContext";

import { DiscoverySearchBar } from "../DiscoverySearchBar/DiscoverySearchBar";
import { DiscoverySearchDropDown } from "../DiscoverySearchDropDown/DiscoverySearchDropDown";

import "./Discovery.css";

export const Discovery: React.FC = () => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  const updateShowDropDown = (value: boolean) => {
    setShowDropDown(value);
  };

  return (
    <DiscoveryProvider>
      <div className="discovery">
        <div className="discovery-sticky">
          <DiscoverySearchBar toggleDropDown={updateShowDropDown} />

          {showDropDown && <DiscoverySearchDropDown />}
        </div>
      </div>
    </DiscoveryProvider>
  );
};
