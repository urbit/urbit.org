import React from "react";
import classnames from "classnames";
import {
  formatDate,
  formatTime,
  formatTimeZone,
} from "@urbit/fdn-design-system";

export default function DateRange({ className, starts, ends, divider }) {
  // For events which have no end datetime
  if (!ends.isValid) {
    return (
      <div className={className}>
        <p>{formatDate(starts)}</p>
        {divider}
        <p>{`${formatTime(starts)} ${formatTimeZone(starts)}`}</p>
      </div>
    );
  }
  // For events which start and end on the same day
  if (starts.hasSame(ends, "day")) {
    return (
      <div className={classnames("whitespace-nowrap", className)}>
        <p>{formatDate(starts)}</p>
        {divider}
        <p>{`${formatTime(starts)} to ${formatTime(ends)} ${formatTimeZone(
          starts
        )}`}</p>
      </div>
    );
  }
  // For multi-day events
  return (
    <div className={className}>
      <p>
        {starts.hasSame(ends, "month")
          ? `${starts.toFormat("LLLL d")} to ${ends.toFormat("d, yyyy")}`
          : `${starts.toFormat("LLLL d")} to ${ends.toFormat("LLLL d, yyyy")}`}
      </p>
      <br />
    </div>
  );
}
