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
import { AppDispatch } from "../../../redux/Store";
import { useDispatch } from "react-redux";
import { setScheduleDate } from "../../../redux/Slices/PostSlice";
import { updateDisplaySchedule } from "../../../redux/Slices/ModalSlice";
import { validateFutureDate } from "../../../services/Validator";

export const SchedulePostModalContent: React.FC = () => {
  //
  const dateSelectorRef = useRef<HTMLInputElement>(null);
  const [scheduledDate, setScheduledDate] = useState<Date>(() => new Date());
  const [amPm, setAmPm] = useState<number>(() =>
    new Date().getHours() / 12 > 0 ? 1 : 0
  );

  const dispatch: AppDispatch = useDispatch();

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

    if (name === "year" && typeof value === "number") {
      dateCopy.setFullYear(value);
      setScheduledDate(dateCopy);
    }

    if (name === "hour" && typeof value === "number") {
      if (amPm === 0) {
        let newHours = value % 12;
        dateCopy.setHours(newHours);
      } else {
        let newHours = value === 12 ? 12 : value + 12;
        dateCopy.setHours(newHours);
      }

      setScheduledDate(dateCopy);
    }

    // update to caculate army time/24 hours time
    if (name === "minute" && typeof value === "number") {
      dateCopy.setMinutes(value);
      setScheduledDate(dateCopy);
    }

    if (name === "am/pm" && typeof value === "number") {
      if (value === 0) {
        dateCopy.setHours(dateCopy.getHours() - 12);
      } else {
        dateCopy.setHours(dateCopy.getHours() + 12);
      }
      setScheduledDate(dateCopy);
      setAmPm(value);
    }

    if (validateFutureDate(dateCopy)) dispatch(setScheduleDate(scheduledDate));
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
    // const hours = scheduledDate.getHours() % 12;
    // const minutes = scheduledDate.getMinutes();
    // const amPm = scheduledDate.getHours() / 12 > 0 ? "PM" : "AM";
    const time = scheduledDate.toLocaleTimeString();
    return `${day}, ${month} ${dayOfMonth}, ${year} at ${time.split(":")[0]}:${
      time.split(":")[1]
    } ${time.split(" ")[1]}`;
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
            valid={validateFutureDate(scheduledDate)}
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
            valid={validateFutureDate(scheduledDate)}
            dropDown={getDays}
            dispatcher={updateScheduledDate}
            data={scheduledDate.getDate()}
          />

          <ValidatedDateSelector
            name={"Year"}
            valid={validateFutureDate(scheduledDate)}
            dropDown={getScheduleYears}
            dispatcher={updateScheduledDate}
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
            valid={validateFutureDate(scheduledDate)}
            dropDown={getScheduleHours}
            dispatcher={updateScheduledDate}
            data={+scheduledDate.toLocaleTimeString().split(":")[0]}
          />

          <ValidatedDateSelector
            name={"Minute"}
            valid={validateFutureDate(scheduledDate)}
            dropDown={getScheduleMinutes}
            dispatcher={updateScheduledDate}
            data={scheduledDate.getMinutes()}
          />

          <ValidatedDateSelector
            name={"AM/PM"}
            valid={validateFutureDate(scheduledDate)}
            dropDown={getAmPm}
            dispatcher={updateScheduledDate}
            data={amPm}
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
