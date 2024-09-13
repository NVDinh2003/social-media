import React, { useContext, useEffect } from "react";

import SearchIcon from "@mui/icons-material/Search";
import "./DiscoverySearchDropDown.css";
import { User } from "../../../../utils/GlobalInterface";
import { DiscoveryContext } from "../../context/DiscoveryContext";
import { DiscoveryContextType } from "../../context/Modals";
import { DiscoverySearchDropDownResult } from "./DiscoverySearchDropDownResult/DiscoverySearchDropDownResult";
import { useNavigate } from "react-router-dom";

interface DiscoveryDropDownProps {
  toggleDropDown: (value: boolean) => void;
}

export const DiscoverySearchDropDown: React.FC<DiscoveryDropDownProps> = ({
  toggleDropDown,
}) => {
  //
  const { searchContent, searchResultUsers, updateSearchContent } = useContext(
    DiscoveryContext
  ) as DiscoveryContextType;
  const navigate = useNavigate();

  const navigateToUserProfile = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    toggleDropDown(false);
    updateSearchContent("");
    navigate(`/${e.currentTarget.id}`);
  };

  useEffect(() => {
    console.log("user list changed");
  }, [searchResultUsers]);

  return (
    <div className="discovery-search-dropdown">
      <div className="discovery-search-dropdown-search-for">
        {searchContent ? (
          <div
            className="discovery-search-dropdown-content-wrapper"
            onClick={() => {
              /* navigate to the search page and do the search*/
            }}
          >
            <SearchIcon
              sx={{
                height: "30px",
                width: "30px",
              }}
            />
            <p className="discovery-search-dropdown-content">{searchContent}</p>
          </div>
        ) : (
          <div className="discovery-search-dropdown-empty-wrapper">
            <p className="discovery-search-dropdown-empty">
              Try searching for people, lists, or keywords
            </p>
          </div>
        )}
      </div>

      {searchContent && (
        <div className="discovery-search-dropdown-results">
          {/* map through the results */}

          {/* <div className="discovery-search-dropdown-search-content-box">
            <SearchIcon />
            <p className="discovery-search-dropdown-search-content-box-text">
              {searchContent}
            </p>
          </div> */}

          <div>
            {searchResultUsers.slice(0, 8).map((user) => {
              //   return <div>{user.username}</div>;
              return (
                <div
                  className="discovery-search-dropdown-results-wrapper"
                  onClick={navigateToUserProfile}
                  key={user.userId}
                  id={user.username}
                >
                  {" "}
                  <DiscoverySearchDropDownResult
                    pfp={user.profilePicture}
                    nickname={user.nickname}
                    verified={user.verifiedAccount}
                    privateAccount={user.privateAccount}
                    organization={user.organization}
                    username={user.username}
                  />
                </div>
              );
            })}
          </div>

          <div className="discovery-search-dropdown-go-to">
            <p
              className="discovery-search-dropdown-go-to-text"
              onClick={navigateToUserProfile}
              id={searchContent}
            >
              Go to @{searchContent}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
