import React, { useRef, useState } from "react";

import "./SchedulePostModalContent.css";
import ScheduleTimeSVG from "../../../components/SVGs/ScheduleTimeSVG";
import { ValidatedDateSelector } from "../../../components/ValidatedInput/ValidatedDateSelector";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { getMonths, getDays, MONTHS } from "../../../utils/DateUtils";
import {
  DAYS,
  getAmPm,
  getScheduleHours,
  getScheduleMinutes,
  getScheduleYears,
} from "../SchedulePostUtils/SchedulePostUtils";

export const SchedulePostModalContent: React.FC = () => {
  //
  const dateSelectorRef = useRef<HTMLInputElement>(null);
  const [scheduledDate, setScheduledDate] = useState<Date>(() => new Date());

  const openDateSelector = () => {
    if (dateSelectorRef && dateSelectorRef.current) {
      let element: any = dateSelectorRef.current;
      element.showPicker();
    }
  };

  const updateScheduledDate = (
    name: string,
    value: string | number | boolean
  ) => {
    let dateCopy = new Date(scheduledDate);

    if (name === "month" && typeof value === "number") {
      dateCopy.setMonth(value);
      setScheduledDate(dateCopy);
    }

    if (name === "day" && typeof value === "number") {
      dateCopy.setDate(value);
      setScheduledDate(dateCopy);
    }
  };

  const generateDateString = () => {
    const month = MONTHS[
      scheduledDate.getMonth() === new Date().getMonth()
        ? scheduledDate.getMonth() + 1
        : scheduledDate.getMonth()
    ].slice(0, 3);
    const day = DAYS[scheduledDate.getDay()];
    const dayOfMonth = scheduledDate.getDate();
    const year = scheduledDate.getFullYear();
    const hours = scheduledDate.getHours() % 12;
    const minutes = scheduledDate.getMinutes();
    const amPm = scheduledDate.getHours() / 12 > 0 ? "PM" : "AM";
    return `${day}, ${month} ${dayOfMonth}, ${year} at ${hours}:${minutes} ${amPm}`;
  };

  return (
    <div className="schedule-post-modal-content">
      <div className="schedule-post-modal-content-top">
        <div className="schedule-post-modal-content-scheduled-info">
          <ScheduleTimeSVG height={20} width={20} color={"#657786"} />
          Will send on {generateDateString()}
        </div>
        <p className="schedule-post-modal-content-label">Date</p>
        <div className="schedule-post-modal-content-date-group">
          <ValidatedDateSelector
            name={"Month"}
            valid={true}
            dropDown={getMonths}
            dispatcher={updateScheduledDate}
            data={
              scheduledDate.getMonth() === new Date().getMonth()
                ? scheduledDate.getMonth() + 1
                : scheduledDate.getMonth()
            }
          />

          <ValidatedDateSelector
            name={"Day"}
            valid={true}
            dropDown={getDays}
            dispatcher={updateScheduledDate}
            data={scheduledDate.getDate()}
          />

          <ValidatedDateSelector
            name={"Year"}
            valid={true}
            dropDown={getScheduleYears}
            dispatcher={() => {}}
            data={scheduledDate.getFullYear()}
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
            dropDown={getScheduleHours}
            dispatcher={() => {}}
            data={scheduledDate.getHours() % 12}
          />

          <ValidatedDateSelector
            name={"Minute"}
            valid={true}
            dropDown={getScheduleMinutes}
            dispatcher={() => {}}
            data={scheduledDate.getMinutes()}
          />

          <ValidatedDateSelector
            name={"AM/PM"}
            valid={true}
            dropDown={getAmPm}
            dispatcher={() => {}}
            data={scheduledDate.getHours() / 12 > 0 ? "PM" : "AM"}
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
