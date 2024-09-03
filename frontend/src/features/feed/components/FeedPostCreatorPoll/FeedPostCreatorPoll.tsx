import React, { useEffect, useState } from "react";
import { ValidatedTextInput } from "../../../../components/ValidatedInput/ValidatedTextInput";
import AddIcon from "@mui/icons-material/Add";
import { ValidatedDateSelector } from "../../../../components/ValidatedInput/ValidatedDateSelector";

import "./FeedPostCreatorPoll.css";
import {
  generatePollDaysSelection,
  generatePollHoursSelection,
  generatePollMinutesSelection,
} from "../../utils/FeedUtils";

export const FeedPostCreatorPoll: React.FC = () => {
  //
  const [labels, setLabels] = useState<string[]>(["Choice 1", "Choice 2"]);

  const addNewChoice = () => {
    if (labels.length < 4) {
      setLabels([...labels, `Choice ${labels.length + 1} (optional)`]);
    }
  };

  useEffect(() => {
    console.log("Addding a new choice");
  }, [labels.length]);

  return (
    <div className="feed-post-creator-poll" style={{ zIndex: 5 }}>
      <div className="feed-post-creator-poll-choices">
        {labels.map((label, index) => {
          return (
            <div className="feed-post-creator-poll-choice" key={label}>
              <div
                className={
                  labels.length < 4
                    ? "feed-post-creator-poll-choice-wrapper-min"
                    : "feed-post-creator-poll-choice-wrapper-max"
                }
              >
                <ValidatedTextInput
                  valid={true}
                  name={`choice:${index}`}
                  label={label}
                  changeValue={() => {}}
                  attributes={{ maxLength: 25 }}
                />
              </div>

              {index === labels.length - 1 && labels.length < 4 && (
                <div className="feed-post-creator-poll-choice-add">
                  <div
                    className="feed-post-creator-poll-choice-add-hover"
                    onClick={addNewChoice}
                  >
                    <AddIcon
                      sx={{
                        color: "rgb(29, 161, 242)",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="feed-post-creator-poll-length">
        <p className="feed-post-creator-poll-length-text">Poll length</p>
        <div className="feed-post-creator-poll-length-wrapper">
          <ValidatedDateSelector
            style=""
            valid={true}
            name="Days"
            dropDown={generatePollDaysSelection}
            dispatcher={() => {}}
          />

          <ValidatedDateSelector
            style=""
            valid={true}
            name="Hours"
            dropDown={generatePollHoursSelection}
            dispatcher={() => {}}
          />

          <ValidatedDateSelector
            style=""
            valid={true}
            name="Minutes"
            dropDown={generatePollMinutesSelection}
            dispatcher={() => {}}
          />
        </div>
      </div>

      <div className="feed-post-creator-poll-button">Remove Poll</div>
    </div>
  );
};
