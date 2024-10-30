type DateFormat = '%H:%M:%S' | '%m/%d/%Y' | '%B-%Y';

type Args = {
  format: DateFormat;
  date: string | Record<string, any>;
  timezone: string;
};

export const setTimezoneQuery = ({
  date,
  format,
  timezone = 'Asia/Karachi',
}: Args) => {
  return {
    $dateToString: {
      format: format,
      date: date,
      timezone: timezone,
    },
  };
};
