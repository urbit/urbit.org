import { useState, useEffect, useRef } from "react";
import classNames from "classnames";

export const TableOfContents = ({ staticPosition, noh3s }) => {
  const { nestedHeadings } = useHeadingsData(noh3s);
  const [activeId, setActiveId] = useState();
  useIntersectionObserver(setActiveId);
  return (
    <nav
      className={
        (staticPosition ? "static" : "sticky") +
        " min-h-0 overflow-y-auto w-52 shrink-0 pb-24 hidden lg:block pl-4"
      }
      style={{ top: "8rem", height: "calc(100vh - 16rem)" }}
    >
      <div className="relative after:fixed after:bg-gradient-to-t after:from-white after:via-white after:bottom-0 after:w-52 after:h-60 after:pointer-events-none">
        <Headings headings={nestedHeadings} activeId={activeId} />
      </div>
    </nav>
  );
};

const getNestedHeadings = (headingElements) => {
  const nestedHeadings = [];

  headingElements.forEach((heading, index) => {
    const { innerText: title, id } = heading;

    if (heading.nodeName === "H2") {
      nestedHeadings.push({ id, title, items: [] });
    } else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
      nestedHeadings[nestedHeadings.length - 1].items.push({
        id,
        title,
      });
    }
  });

  return nestedHeadings;
};

const useHeadingsData = (noh3s) => {
  const [nestedHeadings, setNestedHeadings] = useState([]);

  const query = noh3s ? "h2" : "h2, h3";
  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll(query));

    const newNestedHeadings = getNestedHeadings(headingElements);
    setNestedHeadings(newNestedHeadings);
  }, []);

  return { nestedHeadings };
};

const Headings = ({ headings, activeId }) => (
  <ul
    className={classNames({
      hidden: headings.length === 1 && headings?.[0]?.items?.length === 0,
    })}
  >
    {headings.map((heading, index) => (
      <li key={heading.id}>
        <a
          className={classNames({
            "font-bold": index === 0,
            "font-medium text-sm": index !== 0,
            "text-green-400": heading.id === activeId && index !== 0,
          })}
          href={`#${heading.id}`}
        >
          {heading.title}
        </a>
        {heading.items.length > 0 && (
          <ul className="pl-2 text-xs">
            {heading.items.map((child) => (
              <li
                key={child.id}
                className={
                  child.id === activeId ? "text-green-400" : "text-wall-500"
                }
              >
                <a href={`#${child.id}`}>{child.title}</a>
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
);

const useIntersectionObserver = (setActiveId) => {
  const headingElementsRef = useRef({});
  useEffect(() => {
    const callback = (headings) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement;
        return map;
      }, headingElementsRef.current);

      const visibleHeadings = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id) =>
        headingElements.findIndex((heading) => heading.id === id);

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id)
        );
        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "0px 0px -50% 0px",
    });

    const headingElements = Array.from(document.querySelectorAll("h2, h3"));

    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [setActiveId]);
};
