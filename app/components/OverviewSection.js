"use client";
import SVG from "react-inlinesvg";
import classNames from "classnames";

const OverviewSection = ({ title, children }) => {
  // console.log('title', title)
  return (
    <section className="overview-section mt-16 md:mt-0">
      <div className={classNames("overview-section-title",
        {"hidden md:block": title == undefined,}
      )}>{title}</div>
      <div className="overview-section-body">{children}</div>
    </section>
  );
};

const OverviewSVG = ({ src, alt }) => {
  return <SVG src={src} alt={alt} className="w-full my-[4rem] "></SVG> 
};

const OverviewImage = ({ src, alt }) => {
  return (
    <div className="img-container">
      <img src={src} alt={alt} />
    </div> 
  )
}

export { OverviewSection, OverviewSVG, OverviewImage };
