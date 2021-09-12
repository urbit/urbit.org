import Link from "next/link";
import { DateTime } from "luxon";
import {
  ShowOrHide,
  ReadableList,
  Person,
  DateRange,
} from "../components/Snippets";
import {
  generateDisplayDate,
  generateRealtimeDate,
  formatDate,
  formatTime,
  formatTimeZone,
} from "../lib/lib";

export default function EventPreview({ event, className, big }) {
  // Event tiles have a 'dark mode' used when their background images are dark and white text is needed for legibility.
  const grayText = event?.dark ? "text-washedWhite" : "text-wall-400";
  const blackText = event?.dark ? "text-white" : "text-wall-600";

  const starts = generateDisplayDate(event.starts, event.timezone);
  const ends = generateDisplayDate(event.ends, event.timezone);

  const inFuture = generateRealtimeDate(starts) > DateTime.now();

  const happeningNow =
    generateRealtimeDate(event.starts) > DateTime.now() && !inFuture;

  return (
    <div
      className={`cursor-pointer aspect-w-4 aspect-h-5 md:aspect-w-5 md:aspect-h-4 ${className}`}
    >
      <div
        key={event.slug}
        className={`bg-wall-100 rounded-xl bg-cover bg-center bg-no-repeat `}
        style={{ backgroundImage: `url(${event.image})` || "" }}
      >
        <Link href={`/events/${event.slug}`}>
          <div
            className={`flex flex-col p-6 justify-between items-between h-full relative`}
          >
            <div
              className={`flex-grow-1 flex ${
                big ? "justify-center" : ""
              } flex-col h-full`}
            >
              <h3 className={`${blackText} mb-2`}>{event.title}</h3>
              <p className={`${blackText} mb-2`}>{event.location}</p>
              <DateRange
                starts={starts}
                ends={ends}
                className={`${grayText} type-sub`}
              />
            </div>

            <div className="absolute p-6 left-0 bottom-0 w-full pr-32">
              <ShowOrHide condition={event.hosts}>
                <p className={blackText + " type-sub"}>
                  <b>{"Hosted by "}</b>
                  <ReadableList>
                    {event.hosts?.map((host, index) => (
                      <Person
                        key={`${host.name}-${host.patp}`}
                        nameClassNames={blackText}
                        patpClassNames={blackText}
                        name={host.name}
                        patp={host.patp}
                      />
                    ))}
                  </ReadableList>
                </p>
              </ShowOrHide>
              <ShowOrHide condition={event.guests}>
                <p className={blackText + " type-sub"}>
                  <b>
                    {event.guests?.length > 1 ? "With guests " : "With guest "}
                  </b>
                  <ReadableList>
                    {event.guests?.map((guest, index) => (
                      <Person
                        key={`${guest.name}-${guest.patp}`}
                        nameClassNames={blackText}
                        patpClassNames={blackText}
                        name={guest.name}
                        patp={guest.patp}
                      />
                    ))}
                  </ReadableList>
                </p>
              </ShowOrHide>
            </div>

            {inFuture && event.registration_url ? (
              <div className="absolute right-0 bottom-0 p-6">
                <a
                  className="button-sm bg-green-400 text-white"
                  href={event.registration_url}
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                >
                  RSVP
                </a>
              </div>
            ) : event.youtube ? (
              <div className="absolute right-0 bottom-0 p-6">
                <a
                  className="button-sm bg-wall-600 text-white"
                  href={`https://www.youtube.com/watch?v=${event.youtube}`}
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                >
                  ▶ Watch
                </a>
              </div>
            ) : null}
          </div>
        </Link>
      </div>
    </div>
  );
}
