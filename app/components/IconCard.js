"use client"
import { useState, useEffect } from "react";
import classNames from "classnames";
import Link from "next/link";

export const IconCard = ({title, description, label, href, icon, small}) => {

  const iconList = {
    "Proposal": "https://media.urbit.org/icons/semibold/Proposal.svg",
    "Bounty": "https://media.urbit.org/icons/semibold/Bounty.svg"
  }
  return (
    <Link href={href} className="no-underline mb-6 p-3 w-full bg-gray-5a inline-block rounded-[1rem] group hover:bg-gray-87 ">
      <div  className="flex flex-col group-hover:text-white">
       <h3 className="text-gray-d9 text-large">
        {title} 
        {/* add icon https://media.urbit.org/icons/semibold/Proposal.svg using background-url css*/}
        </h3>
       <span className="text-large">{description}</span>
      
      </div>
    </Link>
  )
}
