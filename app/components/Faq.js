"use client"
import { useState, useEffect } from "react";
import classNames from "classnames";
export const FaqSection = ({question, children}) => {

  // const faqList = [
  //   {
  //     question: "Where can I talk to people about Grants?",
  //     answer: `<p>As mentioned in the Getting Help section, you should reach out to <a href="">grants@urbit.org↗</a> or stop by the Office Hours at 1pm Eastern Time every Thursday in the Urbit Hacker House↗.</p>`
  //   },
  //   {
  //     question: "What are grants funded with?",
  //     answer: `
  //     <p>Grants are usually funded with stars↗, which are immutable and scarce pieces of the Urbit network. 65,280 possible stars exist in the network, and they sit between the 256 galaxies which govern the network and the 4 billion planets which serve as user level identities. Stars have short, distinctive names like ~marzod or ~sonnet. Each star contains 65,536 planets of their own.
  //   Sometimes grants may be funded with other assets on a case-by-case basis.</p>
  //     `
  //   }
  // ]
  return (
    <div className="z-[100]">
        <Accordion title={question}>
          {children}
        </Accordion>
    </div>
  )
}

export const Accordion = ({title, children}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
    // console.log(isOpen)
  }

  return (
    <section onClick={toggle} className="py-[.375rem] flex flex-col items-between cursor-pointer border-y-[1px] border-gray-87">
      <div className="flex flex-row justify-between">
        <span>{title}</span>
        <span className="ml-2">{isOpen ? "↑" : "↓"}</span>
      </div>
      <article className={classNames("mt-8",
        isOpen ? "block" : "hidden"
      )}>
      {children}
      </article>
    </section>
  )
}