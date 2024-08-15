import React from "react";

import "../../../../assets/global.css";
import "./LandingFooter.css";

export const LandingFooter: React.FC = () => {
  return (
    <div className="landing-footer">
      <p className="footer-link color-gray">About</p>
      <p className="footer-link color-gray">Help Center</p>
      <p className="footer-link color-gray">Terms of Service</p>
      <p className="footer-link color-gray">Privacy Policy</p>
      <p className="footer-link color-gray">Cookie Policy</p>
      <p className="footer-link color-gray">Accessibility</p>
      <p className="footer-link color-gray">Ads Info</p>
      <p className="footer-link color-gray">Blog</p>
      {/* <p className="footer-link color-gray">Status</p>
      <p className="footer-link color-gray">Carrers</p>
      <p className="footer-link color-gray">Brand Resources</p> */}
      <p className="footer-link color-gray">Advertising</p>
      <p className="footer-link color-gray">Marketing</p>
      <p className="footer-link color-gray">Twitter for Business</p>
      <p className="footer-link color-gray">Developers</p>
      <p className="footer-link color-gray">Directory</p>
      <p className="footer-link color-gray">Settings</p>
      <p className="footer-copyright color-gray">&#169; 2024 Fwitter</p>
    </div>
  );
};
