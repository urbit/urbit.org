import React from "react";
import classnames from "classnames";
import { DateTime } from "luxon";

export const DateRange = ({ className, starts, ends, divider }) => {

  function generateDisplayDate(iso8601) {
    var zone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "UTC";
    var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "en-US";
    return DateTime.fromISO(iso8601, {
      zone: zone,
      locale: locale
    });
  }
  function formatDate(dateTimeObject) {
    return dateTimeObject.toLocaleString(DateTime.DATE_FULL);
  }
  function formatTime(dateTimeObject) {
    var dt = dateTimeObject.toLocaleString(DateTime.TIME_SIMPLE);
    return dt.replace(/:00/g, "");
  }
  
  function renderDate(date1, date2) {
    return date1.hasSame(date2, "day") ? date1.toLocaleString(DateTime.DATE_FULL) : "".concat(date1.toLocaleString(DateTime.DATE_FULL), " - ").concat(date2.toLocaleString(DateTime.DATE_FULL));
  }

  return (
    <div>
      {renderDate(generateDisplayDate(starts), generateDisplayDate(ends))},&nbsp;

      {formatTime(generateDisplayDate(starts))} to {formatTime(generateDisplayDate(ends))}
      {/* {formatDate(generateDisplayDate(ends))} */}
      {/* {formatDate(starts)} */}
    </div>
  );
  // For events which have no end datetime
  // if (!ends.isValid) {
  //   return (
  //     <div className={className}>
  //       <p>{formatDate(starts)}</p>
  //       {divider}
  //       <p>{`${formatTime(starts)} ${formatTimeZone(starts)}`}</p>
  //     </div>
  //   );
  // }
  // // For events which start and end on the same day
  // if (starts.hasSame(ends, "day")) {
  //   return (
  //     <div className={classnames("whitespace-nowrap", className)}>
  //       <p>{formatDate(starts)}</p>
  //       {divider}
  //       <p>{`${formatTime(starts)} to ${formatTime(ends)} ${formatTimeZone(
  //         starts
  //       )}`}</p>
  //     </div>
  //   );
  // }
  // // For multi-day events
  // return (
  //   <div className={className}>
  //     <p>
  //       {starts.hasSame(ends, "month")
  //         ? `${starts.toFormat("LLLL d")} to ${ends.toFormat("d, yyyy")}`
  //         : `${starts.toFormat("LLLL d")} to ${ends.toFormat("LLLL d, yyyy")}`}
  //     </p>
  //     <br />
  //   </div>
  // );
};
