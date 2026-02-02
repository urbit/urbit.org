"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { sigil, reactRenderer, stringRenderer } from "urbit-sigil-js";
import classNames from "classnames";
import Image from "next/image";

/* 
a ship can be one of five classes.
comet, moon, galaxy, star, planet

galaxies: network nodes 
  8 bit (256). 
  four-syllable names ~marzod-ballet
stars: network nodes
  16 bit (65,536). 
  two-syllable names ~taglux
planets: individual users
  32 bit (4,294,967,296) 
  one-syllable names ~zod
*/
export const SigilCard = () => {
  const ob = require("urbit-ob");

  const intervalRef = useRef(null);

  const randInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const randomPlanetNumber = () => {
    let bits = 32;
    return randInt(Math.pow(2, bits) - 1);
  };

  const createShip = () => {
    const number = randomPlanetNumber();
    const patp = ob.patp(number);
    const svg = sigil({
      patp,
      renderer: stringRenderer,
      size: 128,
      colors: ["#14140f", "white"],
    });

    return {
      number,
      name: patp,
      svg,
    };
  };

  const [ship, setShip] = useState(() => createShip());
  
  const starNumberFromPlanet = (n) => {
    return n % 65536;
  };
  const galaxyNumberFromPlanet = (n) => {
    return n % 256;
  };

  // const galaxyNumberFromPlanet = () => {
  //   return (planetId-65536) % 65536;
  // };
  // write function to decimal delimit every third number
  const decimalDelimit = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const planetNumber = ship?.number ?? null;
  const planetName = ship?.name ?? null;
  const svgString = ship?.svg ?? null;

  const starName = useMemo(() => {
    if (planetNumber === null) {
      return null;
    }

    const starNumber = starNumberFromPlanet(planetNumber);
    return ob.patp(starNumber).split("~")[1];
  }, [planetNumber, ob]);

  const galaxyName = useMemo(() => {
    if (planetNumber === null) {
      return null;
    }

    const galaxyNumber = galaxyNumberFromPlanet(planetNumber);
    return ob.patp(galaxyNumber).split("~")[1];
  }, [planetNumber, ob]);

  const generateNewShip = () => {
    setShip(createShip());
  };

  const setTimer = () => {
    const id = setInterval(() => {
      generateNewShip();
    }, 2500);
    intervalRef.current = id;
  }
  
  const handleClick = () => {
    clearInterval(intervalRef.current);   
    generateNewShip();
    setTimer();
  }
 
  useEffect(() => {
    setTimer();
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div  className="select-none  sigil-card w-full h-max flex items-center justify-center">
      <div onClick={handleClick} className="w-[28rem] cursor-pointer h-[16rem] xl:w-[34rem] xl:h-[20rem] border-2 border-gray-87 rounded-xl flex flex-col justify-between pt-6 px-6 pb-5 md:pt-10 md:px-10 md:pb-8">
        <div className="h-0 relative">
          {svgString && (
            <Image
              className={classNames("absolute w-[3.125rem]", {
                "w-[20px] h-[25px] bg-white": !svgString,
              })}
              src={`data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`}
              alt=""
              width={50}
              height={50}
              unoptimized
            />
          )}
          {!svgString && (
            <div className="w-[3.125rem] h-[3.125rem]  blur-[12px] bg-white opacity-[.5] animate-pulse"></div>
          )}
        </div>
        <h1 className="xl:text-2xlarge font-[400] pt-10 md:pt-6 2xl:text-3xlarge leading-[100%] w-full text-center">
          {planetName}
        </h1>

        <div className="flex flex-row font-[600]">
          <div className="flex flex-col w-full text-base xl:text-large gap-y-0 md:gap-y-2">
            <div className="flex flex-row ">
              <div className="w-[50%]">
                <span></span>
                <span className="ml-2">Star</span>
              </div>
              <div>{starName && `~ ${starName}`}</div>
            </div>
            <div className="flex flex-row">
              <div className="w-[50%]">
              <span></span>
              <span className="ml-2">Galaxy</span></div>
              <div>{galaxyName && `~ ${galaxyName}`}</div>
            </div>
          </div>
          <div className="flex flex-row gap-x-4 justify-start translate-y-[.4em] w-full text-small items-end ">
            <div className="">
              <span className=""></span>
              <span className="ml-2">{planetNumber && decimalDelimit(parseInt(planetNumber))}</span>
              </div>
            {/* <span className="border-2 border-white flex w-auto">L1</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};
