import React, { useContext, useEffect } from "react";

import "./DiscoverySearchDropDown.css";
import { User } from "../../../../utils/GlobalInterface";
import { DiscoveryContext } from "../../context/DiscoveryContext";
import { DiscoveryContextType } from "../../context/Modals";
import { DiscoverySearchDropDownResult } from "./DiscoverySearchDropDownResult/DiscoverySearchDropDownResult";

export const DiscoverySearchDropDown: React.FC = () => {
  //
  const { searchContent, searchResultUsers } = useContext(
    DiscoveryContext
  ) as DiscoveryContextType;

  useEffect(() => {
    console.log("user list changed");
  }, [searchResultUsers]);

  return (
    <div className="discovery-search-dropdown">
      <div className="discovery-search-dropdown-search-for">
        {searchContent ? (
          <p className="discovery-search-dropdown-content">
            Search for "{searchContent}"
          </p>
        ) : (
          <p className="discovery-search-dropdown-empty">
            Try searching for people, lists, or keywords
          </p>
        )}
      </div>

      {searchContent && (
        <div className="discovery-search-dropdown-results">
          {/* map through the results */}

          <div className="discovery-search-dropdown-results-list">
            {searchResultUsers.slice(0, 8).map((user) => {
              //   return <div>{user.username}</div>;
              return (
                <DiscoverySearchDropDownResult
                  pfp={user.profilePicture}
                  nickname={user.nickname}
                  verified={false}
                  privateAccount={false}
                  organization={""}
                  username={user.username}
                />
              );
            })}
          </div>

          <div className="discovery-search-dropdown-go-to">
            <p className="discovery-search-dropdown-go-to-text">
              Go to @{searchContent}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
