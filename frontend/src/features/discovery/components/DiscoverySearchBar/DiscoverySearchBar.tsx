import React, { useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

import "./DiscoverySearchBar.css";

export const DiscoverySearchBar: React.FC = () => {
  //
  const [active, setActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setup our dispatcher
  };

  const focusInput = () => {
    if (inputRef && inputRef.current) inputRef.current.focus();
  };

  return (
    <div
      className={
        active ? "discovery-search-bar-active" : "discovery-search-bar-inactive"
      }
    >
      <div className="discovery-search-bar-icon-wrapper" onClick={focusInput}>
        <SearchIcon
          sx={{
            color: `${active ? "#1da1f2" : "#657786"}`,
            cursor: "pointer",
          }}
        />
      </div>

      <input
        className="discovery-search-bar-input"
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onChange={handleChange}
        placeholder="Search"
        ref={inputRef}
      />
    </div>
  );
};
