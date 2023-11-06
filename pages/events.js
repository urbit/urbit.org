import Head from "next/head";
import cn from "classnames";
import { DateTime } from "luxon";
import { useState } from "react";
import Meta from "../components/Meta";
import {
  Container,
  SingleColumn,
  Section,
  TwoUp,
  generateRealtimeDate,
} from "@urbit/foundation-design-system";
import IntraNav from "../components/IntraNav";
import Footer from "../components/Footer";
import Header from "../components/Header";
import EventPreview from "../components/EventPreview";
import { getAllEvents, pair } from "../lib/lib";
import { useRouter } from "next/router";

import { eventKeys } from "../lib/constants";

export default function Events({ events, search }) {
  const [selected, setSelected] = useState("All");
  const router = useRouter();
  const { tag } = router.query;

  const post = {
    title: "Events",
    description: "In-person, remote, and recorded events about Urbit.",
  };

  const now = DateTime.now();

  const tagFilter = (event) => {
    if (tag) {
      return event?.tags?.includes(tag)
    } else {
      return true;
    }
  }
  const selectionFilter = (event) => {
    if (selected === "All") {
      return true;
    } else if (selected === "In-person") {
      return event.location !== "Online Event";
    } else if (selected === "Online") {
      return event.location === "Online Event";
    }
  };

  const pastEvents = pair(
    events.filter(selectionFilter).filter(tagFilter).filter((event) => {
      const ends = generateRealtimeDate(event.ends);
      return ends < now;
    })
  );

  const futureEvents = pair(
    events
      .filter(selectionFilter)
      .filter(tagFilter)
      .filter((event) => {
        const starts = generateRealtimeDate(event.starts);
        return starts > now;
      })
      .sort((a, b) => {
        const aStarts = generateRealtimeDate(a.starts).ts;
        const bStarts = generateRealtimeDate(b.starts).ts;
        if (aStarts > bStarts) {
          return 1;
        } else if (aStarts === bStarts) {
          return 0;
        }
        return -1;
      })
  );

  const happeningNow = pair(
    events.filter(selectionFilter).filter(tagFilter).filter((event) => {
      const starts = generateRealtimeDate(event.starts);
      const ends = generateRealtimeDate(event.ends);
      return starts < DateTime.now() && ends > now;
    })
  );

  const SelectedButton = ({ selection, text }) => {
    return (
      <a
        className={cn("badge-lg w-fit cursor-pointer type-ui", {
          "bg-wall-600 text-white": selected === selection,
          "bg-wall-100 text-wall-500": selected !== selection,
        })}
        onClick={() => setSelected(selection)}
      >
        {text}
      </a>
    );
  };

  return (
    <Container>
      <Head>
        <title>Events • urbit.org</title>
        {Meta(post)}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={search} />
      <SingleColumn>
        <Header search={search} />
        <Section>
          <div className="measure">
            {tag
              ? <h1 className="pb-16">{events.filter(tagFilter).length} events tagged "{tag}"</h1>
              : <h1 className="pb-16">Events</h1>}
            <div className="flex space-x-2">
              <SelectedButton selection="All" text="All Events" />
              <SelectedButton selection="In-person" text="In-person" />
              <SelectedButton selection="Online" text="Online" />
            </div>
          </div>
        </Section>

        <Section>
          {happeningNow.length > 0 ? (
            <>
              <div className="mb-8 mt-16 table">
                <h3 className="text-green-400">Happening Now</h3>
              </div>
              {happeningNow.map((group) => {
                return (
                  <TwoUp>
                    {group.map((post) => (
                      <EventPreview big event={post} className="mb-8" />
                    ))}
                  </TwoUp>
                );
              })}
            </>
          ) : null}
          {futureEvents.length > 0 ? (
            <>
              <div className="mb-8 mt-16 table">
                <h3 className="">Coming Soon</h3>
              </div>
              {futureEvents.map((group) => {
                return (
                  <TwoUp>
                    {group.map((post) => (
                      <EventPreview event={post} className="mb-8" />
                    ))}
                  </TwoUp>
                );
              })}
            </>
          ) : null}
          <div className="mb-8 mt-16 table">
            <h3 className="text-wall-500">Past Events</h3>
          </div>

          {pastEvents.map((group) => {
            return (
              <TwoUp>
                {group.map((post) => (
                  <EventPreview event={post} className="mb-8" />
                ))}
              </TwoUp>
            );
          })}
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}

export async function getStaticProps() {
  const events = getAllEvents(eventKeys, "events");

  return {
    props: { events },
  };
}
