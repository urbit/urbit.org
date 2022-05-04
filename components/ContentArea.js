import Section from "./Section";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { TableOfContents } from "./TableOfContents";

export default function ContentArea(props) {
  const [shortcut, setShortcut] = useState("");

  const detectOS = () => {
    const agent = window.navigator.appVersion;
    if (agent.includes("Win")) {
      return "Ctrl+K";
    } else if (agent.includes("Mac")) {
      return "⌘K";
    } else if (agent.includes("Linux")) {
      return "Ctrl+K";
    }
  };

  useEffect(() => {
    setShortcut(detectOS());
  }, []);

  const scrollBox = useRef();

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      if (scrollBox.current === null) return;
      scrollBox.current.scrollTop = 0;
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  return (
    <div className="w-full min-w-0 flex flex-col items-center">
      <div
        ref={scrollBox}
        className="px-4 md:px-12 lg:px-24 pb-24 pt-8 md:pt-10 lg:pt-16 flex flex-col w-full max-w-screen-xl max-h-screen h-screen overflow-y-scroll"
      >
        <div className="flex justify-between w-full items-center shrink-0">
          <div className="type-ui text-wall-500">{props.breadcrumbs}</div>
          <div className="hidden md:block">
            <button
              onClick={(e) => {
                e.stopPropagation();
                props.search.toggleSearch();
              }}
              className="bg-wall-100 text-wall-500 flex px-4 py-1 rounded-lg type-ui"
            >
              Search<div className="ml-4 text-wall-400">{shortcut}</div>
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center">
          {props.narrow ? (
            <Section narrow className={""}>
              <h2 className="mb-16 mt-24">{props.title}</h2>
              {props.children}
              <div className="pb-32" />
            </Section>
          ) : (
            <div className="min-w-0">
              <h2 className="mb-16 mt-24">{props.title}</h2>
              {props.children}
              <div className="pb-32" />
            </div>
          )}
          <TableOfContents
            key={props.params.slug?.join("/") || Math.random()}
          />
        </div>
      </div>
    </div>
  );
}
