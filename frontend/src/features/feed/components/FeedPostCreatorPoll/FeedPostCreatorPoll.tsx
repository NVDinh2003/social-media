import React, { useState } from "react";
import { ValidatedTextInput } from "../../../../components/ValidatedInput/ValidatedTextInput";
import AddIcon from "@mui/icons-material/Add";
import { ValidatedDateSelector } from "../../../../components/ValidatedInput/ValidatedDateSelector";

export const FeedPostCreatorPoll: React.FC = () => {
  //
  const [numberOfChoices, setNumberOfChoices] = useState<number>(2);

  const [choices, setChoices] = useState<string[]>(["Choice 1", "Choice 2"]);

  return (
    <div className="feed-post-creator-poll" style={{ zIndex: 5 }}>
      <div className="feed-post-creator-poll-choices">
        {choices.map((choice, index) => {
          return (
            <div
              className="feed-post-creator-poll-choice"
              key={choice}
              id={choice}
            >
              <ValidatedTextInput
                valid={true}
                name={choice}
                label={choice}
                changeValue={() => {}}
              />
              {index === choices.length - 1 && (
                <p className="feed-post-creator-poll-choice-add">
                  <AddIcon />
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="feed-post-creator-poll-length">
        <p className="feed-post-creator-poll-length-text">Poll length</p>
        <ValidatedDateSelector
          style=""
          valid={true}
          name="Days"
          dropDown={() => {
            return [<>Hello</>];
          }}
          dispatcher={() => {}}
        />

        <ValidatedDateSelector
          style=""
          valid={true}
          name="Hours"
          dropDown={() => {
            return [<>Hello</>];
          }}
          dispatcher={() => {}}
        />

        <ValidatedDateSelector
          style=""
          valid={true}
          name="Minutes"
          dropDown={() => {
            return [<>Hello</>];
          }}
          dispatcher={() => {}}
        />
      </div>

      <div className="feed-post-creator-poll-button">Remove Poll</div>
    </div>
  );
};
