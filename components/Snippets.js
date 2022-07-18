import Link from "next/link";
import {
  getAllEvents,
  generateDisplayDate,
  generateRealtimeDate,
  formatDate,
  formatTime,
  formatTimeZone,
} from "../lib/lib";

export function Name({ children, className }) {
  return <b className={`font-normal ${className || ""}`}>{children}</b>;
}

export function Patp({ children, className }) {
  return (
    <Link href={`/ids/${children}`} passHref>
      <a>
        <code className={`font-mono ${className || ""}`}>{children}</code>
      </a>
    </Link>
  );
}

// Used to render a human name alongside their @p
export function Person({
  name,
  patp,
  nameClassNames,
  patpClassNames,
  className,
}) {
  return (
    <>
      {patp && name ? (
        <>
          <Name className={nameClassNames}>{name}</Name>{" "}
          <Patp className={patpClassNames + " opacity-60"}>{patp}</Patp>
        </>
      ) : patp ? (
        <Patp className={patpClassNames}>{patp}</Patp>
      ) : name ? (
        <Name className={nameClassNames}>{name}</Name>
      ) : null}
    </>
  );
}

// This goes inside a <p/> tag
export function ReadableList({ children, serial = ",", conjunction = "and" }) {
  return (
    <>
      {children.map((Child, index) => {
        if (index < children.length - 2) {
          return (
            <>
              {Child}
              {serial}
            </>
          );
        } else if (index < children.length - 1) {
          return (
            <>
              {Child} {conjunction}{" "}
            </>
          );
        }
        return <>{Child}</>;
      })}
    </>
  );
}

export function ShowOrHide({ children, condition }) {
  if (condition) {
    return children;
  }
  return null;
}

export function DateRange({ starts, ends, className, short }) {
  // For events which have no end datetime
  if (!ends.isValid) {
    return (
      <div>
        <p className={className}>
          {`${formatDate(starts)} • ${formatTime(starts)} ${formatTimeZone(
            starts
          )}`}
        </p>
      </div>
    );
  }
  // For events which start and end on the same day
  if (starts.hasSame(ends, "day")) {
    return (
      <div>
        <p className={className}>
          {`${formatDate(starts)} • ${formatTime(starts)} to ${formatTime(
            ends
          )} ${formatTimeZone(starts)}`}
        </p>
      </div>
    );
  }
  // For multi-day events
  return (
    <div>
      <p className={className}>{`${starts.toFormat(
        "cccc, LLLL d"
      )} to ${formatDate(ends)}`}</p>
    </div>
  );
}
