import React, { useRef } from "react";

import "./SchedulePostModalContent.css";
import ScheduleTimeSVG from "../../../components/SVGs/ScheduleTimeSVG";
import { ValidatedDateSelector } from "../../../components/ValidatedInput/ValidatedDateSelector";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { getMonths, getDays, getYears } from "../../../utils/DateUtils";

export const SchedulePostModalContent: React.FC = () => {
  //
  const dateSelectorRef = useRef<HTMLInputElement>(null);

  const openDateSelector = () => {
    if (dateSelectorRef && dateSelectorRef.current) {
      let element: any = dateSelectorRef.current;
      element.showPicker();
    }
  };

  return (
    <div className="schedule-post-modal-content">
      <div className="schedule-post-modal-content-top">
        <div className="schedule-post-modal-content-scheduled-info">
          <ScheduleTimeSVG height={20} width={20} color={"#657786"} />
          Will send on INJECT DATE HERE and INJECT TIME HERE
        </div>
        <p className="schedule-post-modal-content-label">Date</p>
        <div className="schedule-post-modal-content-date-group">
          <ValidatedDateSelector
            name={"Month"}
            valid={true}
            dropDown={getMonths}
            dispatcher={() => {}}
          />

          <ValidatedDateSelector
            name={"Day"}
            valid={true}
            dropDown={getDays}
            dispatcher={() => {}}
          />

          <ValidatedDateSelector
            name={"Year"}
            valid={true}
            dropDown={getYears}
            dispatcher={() => {}}
          />

          <label onClick={openDateSelector}>
            <CalendarMonthIcon
              sx={{
                fontSize: "14px",
              }}
            />
          </label>
          <input type="date" hidden id="date-selector" ref={dateSelectorRef} />
        </div>

        <div className="schedule-post-modal-content-time-group">
          <p className="schedule-post-modal-content-label">Time</p>
          <ValidatedDateSelector
            name={"Hour"}
            valid={true}
            dropDown={() => {
              return [<option></option>];
            }}
            dispatcher={() => {}}
          />

          <ValidatedDateSelector
            name={"Minute"}
            valid={true}
            dropDown={() => {
              return [<option></option>];
            }}
            dispatcher={() => {}}
          />

          <ValidatedDateSelector
            name={"AM/PM"}
            valid={true}
            dropDown={() => {
              return [<option></option>];
            }}
            dispatcher={() => {}}
          />
        </div>
        <p className="schedule-post-modal-content-label">Time Zone</p>
        <h3 className="schedule-post-modal-content-time-zone">
          {Intl.DateTimeFormat().resolvedOptions().timeZone}
        </h3>
      </div>

      <div className="schedule-post-modal-content-bottom">
        <p className="schedule-post-modal-content-scheduled-post">
          Schedule posts
        </p>
      </div>
    </div>
  );
};
