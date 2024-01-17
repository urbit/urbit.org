import React from "react";
import Head from "next/head";
import Link from "next/link";
import classnames from "classnames";
import path from "path";
import { DateTime } from "luxon";
import {
  Container,
  Main,
  FatBlock,
  getAllPosts,
  generateDisplayDate,
  generateRealtimeDate,
} from "@urbit/fdn-design-system";
import IntraNav from "@/components/IntraNav";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";
import Carousel from "@/components/Carousel";
import DateRange from "@/components/DateRange";

function CommunityCard({ className = "", title, image, slug }) {
  return (
    <Link
      className={classnames("relative aspect-square rounded-lg", className)}
      href={path.join("/events", "communities", slug)}
    >
      <h3 className="h3 absolute text-brite p-2 sm:p-4 w-full rounded-t-lg bg-gradient-to-b from-[rgba(0,0,0,0.6)] to-transparent">
        {title}
      </h3>
      <img
        className="h-full w-full rounded-lg object-cover"
        src={image}
        /* onError={(e) => (e.target.style.display = "none")} */
      />
    </Link>
  );
}

function EventCard({
  className = "",
  title,
  description,
  location,
  starts,
  ends,
  timezone,
  image,
  slug,
}) {
  return (
    <>
      <Link
        className={classnames(
          "hidden md:flex flex-col justify-between aspect-[3/2]",
          "bg-cover bg-center rounded-lg text-lite bg-gray",
          className
        )}
        style={image ? { backgroundImage: `url(${image})` } : {}}
        href={path.join("/events", "events", slug)}
      >
        <div className="px-4 pt-4 rounded-t-lg bg-gradient-to-b from-[rgba(0,0,0,0.6)] to-transparent">
          <h3 className="text-lite h2 mb-3.5">{title}</h3>
          <p className="body-sm">{description}</p>
        </div>
        <div className="px-4 pb-4 rounded-b-lg bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent">
          <hr className="hr-horizontal border-lite mb-3.5" />
          <div className="flex justify-between body-sm h-[2.68em]">
            <p className="break-words line-clamp-2 text-ellipsis mr-3.5">
              {location}
            </p>
            <DateRange
              starts={generateDisplayDate(starts)}
              ends={generateDisplayDate(ends)}
            />
          </div>
        </div>
      </Link>
      <Link
        className={classnames(
          "flex md:hidden flex-col justify-between aspect-square",
          "bg-cover bg-center rounded-lg text-lite bg-gray",
          className
        )}
        style={image ? { backgroundImage: `url(${image})` } : {}}
        href={path.join("/events", "events", slug)}
      >
        <div className="px-4 pt-4 rounded-t-lg bg-gradient-to-b from-[rgba(0,0,0,0.6)] to-transparent">
          <h3 className="text-lite h3 mb-3.5">{title}</h3>
          <p className="body-sm">{description}</p>
        </div>
        <div className="px-4 pb-4 rounded-b-lg bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent">
          <hr className="hr-horizontal border-lite mb-3.5" />
          <div className="body-sm h-[2.68em]">
            <DateRange
              starts={generateDisplayDate(starts)}
              ends={generateDisplayDate(ends)}
            />
          </div>
        </div>
      </Link>
    </>
  );
}

export default function Events({
  communities,
  events,
  upcomingEvents,
  ongoingEvents,
  pastEvents,
}) {
  const post = {
    title: "Events",
    description: "In-person, remote, and recorded events about Urbit.",
  };

  return (
    <Container>
      <Head>
        <title>{`${post.title} • Urbit`}</title>
        {Meta(post)}
      </Head>
      <IntraNav ourSite="https://urbit.org" />
      <Main
        className="text-brite border-brite space-y-5 md:space-y-8"
        singleColumn
      >
        <section>
          <h1 className="h1 mt-12 mb-8 md:mt-16 md:mb-16 lg:mb-20">Events</h1>
          <p className="h1">
            Urbit is a <strong>new kind of computer</strong> that you can own
            completely in ways that matter: <strong>networking</strong>,{" "}
            <strong>identity</strong>, & <strong>data</strong>.
          </p>
        </section>
        <hr className="hr-horizontal border-brite" />
        <h2 className="h2">Communities</h2>
        <Carousel>
          {communities.map((props) => (
            <CommunityCard className="w-32 sm:w-56 md:w-80" {...props} />
          ))}
        </Carousel>
        {ongoingEvents.length > 0 && (
          <>
            <hr className="hr-horizontal border-brite" />
            <h2 className="h2">Ongoing</h2>
            <FatBlock className="grid grid-cols-1 xs:grid-cols-2 gap-1 lg:gap-6 xl:gap-8">
              {ongoingEvents.slice(0, 2).map((props) => (
                <EventCard {...props} />
              ))}
            </FatBlock>
          </>
        )}
        {upcomingEvents.length > 0 && (
          <>
            <hr className="hr-horizontal border-brite" />
            <h2 className="h2">Upcoming</h2>
            <FatBlock className="grid grid-cols-1 xs:grid-cols-2 gap-1 lg:gap-6 xl:gap-8">
              {upcomingEvents.slice(0, 2).map((props) => (
                <EventCard {...props} />
              ))}
            </FatBlock>
          </>
        )}
        <hr className="hr-horizontal border-brite" />
        <h2 className="h2">Past events</h2>
        <FatBlock className="grid grid-cols-1 xs:grid-cols-2 gap-1 lg:gap-6 xl:gap-8">
          {pastEvents &&
            pastEvents.slice(0, 4).map((props) => <EventCard {...props} />)}
        </FatBlock>
        <Link className="btn btn-light body-lg w-min" href="/events/events">
          More events
        </Link>
      </Main>
      <Footer />
    </Container>
  );
}

export async function getStaticProps() {
  const communities = getAllPosts(
    ["title", "description", "image", "content", "slug"],
    "communities",
    "title"
  );

  const events = getAllPosts(
    [
      "title",
      "description",
      "location",
      "starts",
      "ends",
      "timezone",
      "guests",
      "hosts",
      "image",
      "registration_url",
      "pinned",
      "content",
      "slug",
    ],
    "events",
    "starts"
  );

  let upcomingEvents = [];
  let ongoingEvents = [];
  let pastEvents = [];
  const now = DateTime.now();

  events.forEach((e) => {
    const starts = generateRealtimeDate(e.starts);
    const ends = generateRealtimeDate(e.ends);
    const inFuture = now < starts;
    if (starts <= now && now <= ends) {
      ongoingEvents.push(e);
    } else if (now < starts) {
      futureEvents.push(e);
    } else if (starts < now) {
      pastEvents.push(e);
    }
  });

  pastEvents.reverse();

  return {
    props: { communities, events, pastEvents, upcomingEvents, ongoingEvents },
  };
}
