import React, { useState, useEffect } from "react";

import "./LocationModalContent.css";
import LocationSVG from "../../../../../components/SVGs/LocationSVG";
import { ValidatedLocationSelector } from "../../../../../components/ValidatedInput/ValidatedLocationSelector";
import { validateFutureDate } from "../../../../../services/Validator";
import {
  getDistricts,
  getLocationInfo,
  getProvinces,
  getWards,
} from "../../../utils/LocationUtils";
import { ValidatedTextInput } from "../../../../../components/ValidatedInput/ValidatedTextInput";

export const LocationModalContent: React.FC = () => {
  const [selectedProvince, setSelectedProvince] =
    useState<string>("Chọn tỉnh/TP");
  const [selectedDistrict, setSelectedDistrict] =
    useState<string>("Chọn quận/huyện");
  const [selectedWard, setSelectedWard] = useState<string>("Chọn phường/xã"); // Thêm state cho phường
  const [districtOptions, setDistrictOptions] = useState<JSX.Element[]>([]);
  const [wardOptions, setWardOptions] = useState<JSX.Element[]>([]);

  const [addressDetail, setAddressDetail] = useState<string>("");

  useEffect(() => {
    if (selectedProvince) {
      const districts = getDistricts(selectedProvince);
      setDistrictOptions(districts);
      setSelectedDistrict(""); // Reset district when province changes
      setSelectedWard(""); // Reset ward when province changes
    } else {
      setDistrictOptions([]); // Reset district options if no province is selected
      setSelectedDistrict(""); // Reset district if no province is selected
      setSelectedWard(""); // Reset ward if no province is selected
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      const wards = getWards(selectedDistrict);
      setWardOptions(wards);
    } else {
      setWardOptions([]); // Reset ward options if no district is selected
      setSelectedWard(""); // Reset ward if no district is selected
    }
  }, [selectedDistrict]);

  const updateLocationSelector = (
    name: string,
    value: string | number | boolean
  ) => {
    // console.log("name: ", name);
    if (name === "province" && typeof value === "string") {
      setSelectedProvince(value);
    }

    if (name === "district" && typeof value === "string") {
      setSelectedDistrict(value);
    }

    if (name === "ward" && typeof value === "string") {
      setSelectedWard(value);
    }
  };

  const handleAddressChange = (value: string) => {
    setAddressDetail(value); // Cập nhật địa chỉ chi tiết
  };

  const displayLocationInfo = () => {
    let locationInfo = "";
    if (selectedProvince && selectedDistrict && selectedWard) {
      if (addressDetail) {
        locationInfo = `: ${addressDetail}, ${getLocationInfo(
          selectedProvince,
          selectedDistrict,
          selectedWard
        )}`;
      } else {
        locationInfo = `: ${getLocationInfo(
          selectedProvince,
          selectedDistrict,
          selectedWard
        )}`;
      }
      return locationInfo;
    } else {
      return "...";
    }
  };

  return (
    <div className="location-modal-content">
      <div className="location-modal-content-top">
        <div className="location-modal-content-scheduled-info">
          <LocationSVG height={20} width={20} color={"#1da1f2"} />
          <p className="location-modal-content-scheduled-date">
            Địa chỉ đang chọn {displayLocationInfo()}
          </p>
        </div>
        <p className="location-modal-content-label">Địa chỉ chi tiết</p>
        <div className="location-modal-content-date-group">
          <div className="location-modal-content-month-selector-wrapper">
            <ValidatedTextInput
              valid={true}
              name={"addressDetail"}
              label={""}
              changeValue={(e) => handleAddressChange(e.target.value)}
              data={addressDetail}
            />
          </div>
        </div>

        <p className="location-modal-content-label">Chọn địa chỉ</p>
        <div className="location-modal-content-time-group">
          <div className="location-modal-content-hour-selector-wrapper">
            <ValidatedLocationSelector
              name={"Tỉnh/TP"}
              valid={true}
              dropDown={getProvinces}
              dispatcher={updateLocationSelector}
              data={selectedProvince}
            />
          </div>

          <div className="location-modal-content-minute-selector-wrapper">
            <ValidatedLocationSelector
              name={"Quận/Huyện"}
              valid={true}
              dropDown={() => districtOptions} // Sử dụng danh sách quận đã lọc
              dispatcher={updateLocationSelector}
              data={selectedDistrict}
            />
          </div>

          <div className="location-modal-content-ampm-selector-wrapper">
            <ValidatedLocationSelector
              name={"Phường/Xã"}
              valid={true}
              dropDown={() => wardOptions} // Sử dụng danh sách phường đã lọc
              dispatcher={updateLocationSelector} // Cập nhật phường
              data={selectedWard} // Dữ liệu cho phường
            />
          </div>
        </div>
      </div>

      <div className="location-modal-content-bottom">
        <div className="location-modal-content-scheduled-post-bg">
          <p className="location-modal-content-scheduled-post"></p>
        </div>
      </div>
    </div>
  );
};
