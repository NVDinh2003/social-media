import React from "react";

import "./DiscoverySearchDropDownResult.css";
import VerifiedSVG from "../../../../../components/SVGs/VerifiedSVG";
import LocksSVG from "../../../../../components/SVGs/LocksSVG";

interface DiscoverySearchDropDownResultProps {
  pfp: string;
  nickname: string;
  verified: boolean;
  privateAccount: boolean;
  organization: string;
  username: string;
}

export const DiscoverySearchDropDownResult: React.FC<
  DiscoverySearchDropDownResultProps
> = ({ pfp, nickname, verified, privateAccount, organization, username }) => {
  const DefaultPfp = process.env.REACT_APP_PFP;

  return (
    <div className="discovery-search-dropdown-result">
      <img
        src={pfp ? pfp : DefaultPfp}
        alt={`${username}'s profile picture`}
        className="discovery-search-dropdown-result-pfp"
      />
      <div className="discovery-search-dropdown-result-name-section">
        <div className="discovery-search-dropdown-result-nickname-section">
          <p className="discovery-search-dropdown-result-nickname">
            {nickname}
          </p>
          {verified && <VerifiedSVG color={"#1da1f2"} width={12} height={12} />}
          {privateAccount && <LocksSVG color={"#fff"} width={12} height={12} />}
          {organization && (
            <img
              className="discovery-search-dropdown-organization"
              src={organization}
              alt={`${username}'s organization`}
            />
          )}
        </div>

        <p className="discovery-search-dropdown-result-username">@{username}</p>
      </div>
    </div>
  );
};
