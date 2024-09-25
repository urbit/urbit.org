import React from "react";
import Head from "next/head";
import Link from "next/link";
import { DateTime } from "luxon";
import classnames from "classnames";
import path from "path";
import {
  Container,
  Main,
  Section,
  FatBlock,
  getAllPosts,
  generateRealtimeDate,
} from "@urbit/fdn-design-system";

import Carousel from "@/components/Carousel";
import EventCard from "@/components/EventCard";
import Footer from "@/components/Footer";
import IntraNav from "@/components/IntraNav";
import Meta from "@/components/Meta";

function CommunityCard({ className = "", title, image, slug }) {
  return (
    <Link
      className={classnames("relative aspect-square rounded-lg", className)}
      href={path.join("/events", "communities", slug)}
    >
      <h3 className="h3 absolute text-[#F8FAF8] p-2 sm:p-4 w-full rounded-t-lg bg-gradient-to-b from-[rgba(0,0,0,0.6)] to-transparent">
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

export default function Events({
  communities,
  events,
  upcomingEvents,
  ongoingEvents,
  pastEvents,
}) {
  const post = {
    title: "Events",
    description: "In-person and online events about Urbit.",
  };

  return (
    <Container>
      <Head>
        <title>{`${post.title} • urbit.org`}</title>
        {Meta(post)}
      </Head>
      <IntraNav />
      <Main className="text-primary overflow-x-hidden" singleColumn>
        <section>
          <h1 className="h1 mt-12 mb-8 md:mt-16 md:mb-16 lg:mb-20">Events</h1>
          <p className="h1">
            Explore Urbit and our community, in-person and online.
          </p>
        </section>
        {upcomingEvents.length > 0 && (
          <Section divider={"border-primary"}>
            <h1 className="h1">Upcoming</h1>
            <FatBlock className="grid grid-cols-1 sm:grid-cols-2 gap-1 lg:gap-6 xl:gap-8">
              {upcomingEvents.map((props) => (
                <EventCard className="w-full" {...props} />
              ))}
            </FatBlock>
          </Section>
        )}
        <Section divider={"border-primary"}>
        <h2 className="h1">Communities</h2>
          <p className="h2">
            Urbit has meetups <strong>worldwide</strong>. Join your local
            communities or{" "}
            <Link
              className="hover:text-secondary"
              href="grants/community-meetups"
            >
              <strong>start</strong>
            </Link>{" "}
            your own.
          </p>
          <Carousel>
            {communities.map((props) => (
              <CommunityCard className="w-44 sm:w-56 md:w-80" {...props} />
            ))}
          </Carousel>
        </Section>
        <Section divider={"border-primary"}>
            <h1 className="h1">Calendar</h1>
            <section className="w-full space-y-5 md:space-y-[1.875rem] markdown layout-narrow">
            <p className="h2">
             Schedule for official Urbit events. In addition to in-person, we regularly hold online events where you can hang out, learn, and get involved. Most of these are in the Urbit Hacker House, a shared virtual office space.
              </p>
            </section>
            <Link
            style={{ marginRight: '12px' }}
            className="btn bg-primary hover:bg-secondary text-surface body-lg w-min"
            href="https://calendar.google.com/calendar/ical/c_13647438d00ef31237be88b19de24de30aeb2609657c80cfb6b22350941c61dd%40group.calendar.google.com/public/basic.ics"
            >
            Subscribe to Calendar
            </Link>
            <Link
            className="btn bg-primary hover:bg-secondary text-surface body-lg w-min mr-4"
            href="https://app.gather.town/app/xAYeiPI2XDYhRM9t/urbit-hacker-house"
            >
            Enter Hacker House
            </Link>
            <iframe 
            src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&bgcolor=%23ffffff&showPrint=0&showTitle=0&showTabs=0&showCalendars=0&showDate=1&src=Y18xMzY0NzQzOGQwMGVmMzEyMzdiZTg4YjE5ZGUyNGRlMzBhZWIyNjA5NjU3YzgwY2ZiNmIyMjM1MDk0MWM2MWRkQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23D81B60" 
            style={{ width: '100%', borderWidth: 0, padding: '20px'}}
            height="600" 
            frameBorder="0" 
            scrolling="no">
            </iframe>
          </Section>
        {ongoingEvents.length > 0 && (
          <Section divider={"border-primary"}>
            <h2 className="h2">Ongoing</h2>
            <FatBlock className="grid grid-cols-1 sm:grid-cols-2 gap-1 lg:gap-6 xl:gap-8">
              {ongoingEvents.map((props) => (
                <EventCard className="w-full" {...props} />
              ))}
            </FatBlock>
          </Section>
        )}
        <Section divider={"border-primary"}>
          <h1 className="h1">Past events</h1>
          <FatBlock className="grid grid-cols-1 sm:grid-cols-2 gap-1 lg:gap-6 xl:gap-8">
            {pastEvents &&
              pastEvents
                .slice(0, 4)
                .map((props) => <EventCard className="w-full" {...props} />)}
          </FatBlock>
          <Link
            className="btn bg-primary hover:bg-secondary text-surface body-lg w-min"
            href="/events/all"
          >
            More Events
          </Link>
        </Section>
      </Main>
      <Footer />
    </Container>
  );
}

export async function getStaticProps() {
  const communities = getAllPosts(
    ["title", "description", "image", "content", "slug"],
    "communities",
    "title",
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
      "darken_image",
      "dark",
      "registration_url",
      "pinned",
      "content",
      "slug",
    ],
    "events",
    "starts",
  );

  let upcomingEvents = [];
  let ongoingEvents = [];
  let pastEvents = [];
  const now = DateTime.now();

  events.forEach((e) => {
    const starts = generateRealtimeDate(e.starts);
    const ends = generateRealtimeDate(e.ends);
    if (starts <= now && now <= ends) {
      ongoingEvents.push(e);
    } else if (now < starts) {
      upcomingEvents.push(e);
    } else if (starts < now) {
      pastEvents.push(e);
    }
  });

  pastEvents.reverse();

  return {
    props: { communities, events, pastEvents, upcomingEvents, ongoingEvents },
  };
}
