export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const getScheduleYears = (): JSX.Element[] => {
  let currentYear = new Date().getFullYear();

  let options: JSX.Element[] = [];

  for (let i = 2; i >= 0; i--) {
    options.push(
      <option key={currentYear + i} value={currentYear + i}>
        {currentYear + i}
      </option>
    );
  }

  return options;
};

export const getScheduleHours = (): JSX.Element[] => {
  let options: JSX.Element[] = [];

  for (let i = 1; i <= 12; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return options;
};

export const getScheduleMinutes = (): JSX.Element[] => {
  let options: JSX.Element[] = [];

  for (let i = 0; i < 60; i++) {
    if (i < 10)
      options.push(
        <option key={i} value={i}>
          0{i}
        </option>
      );
    else
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
  }

  return options;
};

export const getAmPm = (): JSX.Element[] => {
  let options: JSX.Element[] = [];

  options.push(
    <option key="AM" value={0}>
      AM
    </option>
  );
  options.push(
    <option key="PM" value={1}>
      PM
    </option>
  );

  return options;
};
