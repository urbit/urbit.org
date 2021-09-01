import { useRouter } from "next/router";
import { DateTime } from "luxon";
import {
  getPostBySlug,
  getAllPosts,
  getNextPost,
  getPreviousPost,
  formatDate,
  formatTime,
  formatTimeZone,
  generateDisplayDate,
  generateRealtimeDate,
} from "../../lib/lib";
import Head from "next/head";
import Meta from "../../components/Meta";
import Container from "../../components/Container";
import Markdown from "../../components/Markdown";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SingleColumn from "../../components/SingleColumn";
import Contact from "../../components/Contact";
import EventPreview from "../../components/EventPreview";
import Section from "../../components/Section";
import TwoUp from "../../components/TwoUp";

import {
  Person,
  ReadableList,
  ShowOrHide,
  DateRange,
} from "../../components/Snippets";
import { decode } from "html-entities";
import { eventKeys } from "../../lib/constants";

export default function Event({
  event,
  nextEvent,
  previousEvent,
  markdown,
  search,
}) {
  const starts = generateDisplayDate(event.starts, event.timezone);
  const ends = generateDisplayDate(event.ends, event.timezone);

  const inFuture = generateRealtimeDate(starts) > DateTime.now();

  const happeningNow =
    generateRealtimeDate(event.starts) > DateTime.now() && !inFuture;

  return (
    <Container>
      <Head>
        <title>{event.title} • Events • urbit.org</title>
        {Meta(event)}
      </Head>
      <SingleColumn>
        <Header search={search} />
        <Section narrow short>
          <h1>{event.title}</h1>
          <h3 className="mt-6">{event.description}</h3>
          <p className="mt-6">{event.location}</p>
          <DateRange starts={starts} ends={ends} className="text-wall-400" />
          <div>
            <ShowOrHide condition={event.hosts}>
              <p className="mt-6">
                {"Hosted by "}
                <ReadableList>
                  {event.hosts?.map((host, index) => {
                    return (
                      <Person
                        key={`${host.name}-${host.patp}`}
                        name={host.name}
                        patp={host.patp}
                      />
                    );
                  })}
                </ReadableList>
              </p>
            </ShowOrHide>
            <ShowOrHide condition={event.guests}>
              <p>
                {event.guests?.length > 1 ? "With guest " : "With guest "}
                <ReadableList>
                  {event.guests?.map((guest, index) => (
                    <Person
                      key={`${guest.name}-${guest.patp}`}
                      name={guest.name}
                      patp={guest.patp}
                    />
                  ))}
                </ReadableList>
              </p>
            </ShowOrHide>
          </div>
          {inFuture && event.registration_url ? (
            <div className="table mt-6">
              <a
                className="button-sm bg-green-400 text-white"
                href={event.registration_url}
                onClick={(e) => e.stopPropagation()}
                target="_blank"
              >
                RSVP
              </a>
            </div>
          ) : null}
        </Section>

        {event.youtube ? (
          <Section short wide>
            <iframe
              className="rounded-xl"
              width="100%"
              height="640px"
              src={`https://www.youtube.com/embed/${event.youtube}`}
              frameBorder="0"
              allow="encrypted-media"
              allowFullScreen
            ></iframe>
          </Section>
        ) : null}

        <Section short narrow className="markdown">
          <article
            className="pt-12 w-full"
            dangerouslySetInnerHTML={{ __html: decode(markdown) }}
          ></article>
        </Section>
        <Section narrow>
          <Contact />
        </Section>
        <Section wide className="flex">
          <TwoUp>
            {previousEvent ? (
              <div>
                <h3 className="mb-2">Next Event</h3>
                <EventPreview event={previousEvent} />
              </div>
            ) : null}

            {nextEvent ? (
              <div>
                <h3 className="mb-2">Previous Event</h3>
                <EventPreview event={nextEvent} />
              </div>
            ) : null}
          </TwoUp>
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}

//
export async function getStaticProps({ params }) {
  const nextEvent = getNextPost(params.slug, eventKeys, "events") || null;

  const previousEvent =
    getPreviousPost(params.slug, eventKeys, "events") || null;

  const event = getPostBySlug(params.slug, eventKeys, "events");

  const markdown = await Markdown({ post: event });

  return {
    props: { event, markdown, nextEvent, previousEvent },
  };
}

export async function getStaticPaths() {
  const events = getAllPosts(["slug", "date"], "events");

  return {
    paths: events.map((event) => {
      return {
        params: {
          slug: event.slug,
        },
      };
    }),
    fallback: false,
  };
}
