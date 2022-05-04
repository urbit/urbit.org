import Link from "next/link";
import { DateTime } from "luxon";
import {
  ShowOrHide,
  ReadableList,
  Person,
  Name,
  DateRange,
} from "../components/Snippets";
import {
  generateDisplayDate,
  generateRealtimeDate,
  formatDate,
  formatTime,
  formatTimeZone,
} from "../lib/lib";

// JAL(2021.9.13) Couldn't quite get this to work properly. There's a trailing
// "and"
//
// function GuestList({ guests, textClass }) {

//   const renderGuests = guests?.length > 2 ? guests?.slice(0,2) : guests;
//   const noRenderGuestsCount = guests?.slice(2).length;

//   return (
//     <p className={textClass + " type-sub"}>
//       <b>
//         {renderGuests?.length > 1 ? "With guests " : "With guest "}
//       </b>
//       <ReadableList>
//         {renderGuests?.map((guest, index) => (
//           <>
//             <Person
//               key={`${guest.name}-${guest.patp}`}
//               nameClassNames={textClass}
//               patpClassNames={textClass}
//               name={guest.name}
//               patp={guest.patp}
//             />
//           {renderGuests?.length > 1 ? <span>, </span> : <></>}
//           </>
//         ))}
//        {noRenderGuestsCount > 1 ?
//          <Name>{noRenderGuestsCount} more </Name>
//         :
//          <></>
//         }
//       </ReadableList>
//     </p>
//   );
// }

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
              className={`grow-1 flex ${
                big ? "justify-center" : ""
              } flex-col h-full`}
            >
              <h3 className={`${blackText} mb-2`}>{event.title}</h3>
              <p className={blackText + ""}>{event.description}</p>
            </div>

            <div className="absolute p-6 left-0 bottom-0 w-full pr-32">
              <p className={`${blackText} type-sub mb-1`}>{event.location}</p>
              <DateRange
                starts={starts}
                ends={ends}
                className={`${grayText} type-sub`}
              />
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
