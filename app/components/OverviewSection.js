"use client";
import SVG from "react-inlinesvg";
import classNames from "classnames";
import Image from "next/image";

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
      <Image src={src} alt={alt} width={1200} height={800} className="w-full h-auto" />
    </div> 
  )
}

export { OverviewSection, OverviewSVG, OverviewImage };
