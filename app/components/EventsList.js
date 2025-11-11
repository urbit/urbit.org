"use client";
import { useState, useEffect } from "react";
import classNames from "classnames";
import { DateRange } from "./DateRange";
import Link from "next/link";

export const EventsList = ({ events }) => {
  const [showAll, setShowAll] = useState(false);


  return (
    <Section title="Past Events">
      <div className="col-span-5 text-xlarge leading-[120%]">
        <div className="grid md:grid-cols-2 gap-x-12">
          {events.slice(0, showAll ? 1000 : 4).map((event, i) => {
            return (
              <div key={event + i}>
                <Event event={event.data} slug={event.slug} />
              </div>
            );
          })}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault(); 
            setShowAll(true);
          }}
          className={classNames("action-button", {
            hidden: showAll,
          })}
        >
          More Events
        </button>
      </div>
    </Section>
  );
};
export const Section = ({ title, children }) => {
  return (
    <section className="block md:grid grid-cols-6 w-full h-full mb-12 pt-8 gap-x-4 border-t-[1.2px] border-gray-87">
      <div className="col-span-1 mb-4">
        <h1 className="8">{title}</h1>
      </div>
      <div className="col-span-4">{children}</div>
    </section>
  );
};

export const Event = ({ event, slug }) => {
  return (
    <Link href={`/events/${slug}`} className="block eventblock hover:text-gray-87 transition-all leading-[130%] text-xlarge mb-16 md:mb-24">

      <h1 className="font-[700]">{event.title}</h1>
      <div className="mb-[1em]">
        <DateRange starts={event.starts} ends={event.ends} />
      </div>
      <div className="mb-[1em]">{event?.description}</div>
      <div>{event.location}</div>
    </Link>
  );
};
