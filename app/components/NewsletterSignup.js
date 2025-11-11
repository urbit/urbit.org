"use client";

import { useState } from "react";
import React from "react";
import classNames from "classnames";
import { usePathname } from 'next/navigation'

export const NewsletterSignup = () => {
  const [isSuccess, setSuccess] = useState(false);
  const [email, setEmail] = useState(""); // Track input value
  const path = usePathname();

  const isHomepage = path === "/";

  const handleSubmit = (event) => {

    event.preventDefault();

    const emailInput = event.target.EMAIL.value;
    const script = document.createElement("script");

    // old mc method: post instead of post-json: const url = `https://urbit.us11.list-manage.com/subscribe/post-json?u=972a03db9e0c6c25bb58de8c8&id=be143888d2&EMAIL=${encodeURIComponent(emailInput)}&c=callbackFunction`;
    const url = `https://urbit.us11.list-manage.com/subscribe/post?u=972a03db9e0c6c25bb58de8c8&id=be143888d2&EMAIL=${encodeURIComponent(emailInput)}&c=callbackFunction`;

    // Set script source to Mailchimp with callback
    script.src = url;

    // Define callback function in the window to handle the response
    window.callbackFunction = (data) => {
      if (data.result === "success") {
        setEmail("You are subscribed.");
        setSuccess(true);
      } else {
        setEmail("Error. Try again.");
        setSuccess(false);
      }
    };

    // Append script to body
    document.body.appendChild(script);

    // Clean up the script tag after execution
    document.body.removeChild(script);
  };

  return (
    <React.Fragment>
      <form
        onSubmit={handleSubmit}
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        className="validate form"
        noValidate
      >
        <div className="input-group relative font-small" id="mc_embed_signup_scroll">
          <div className={classNames(
            "w-full max-w-[700px] mc-field-group h-max relative")}>
            <input
              className={classNames(
                email.length > 0 && !isSuccess && "text-primary border-white",
                isSuccess ? "bg-[#878787] text-secondary cursor-default border-none" : 'text-gray-87 bg-transparent ',
                "text-large border-[.0875rem] pt-[.1rem] pb-[.2rem] appearance-none font-[300] placeholder:font-[300]  placeholder:text-contrast-2 outline-none border-contrast-2  rounded-[.3125rem] pb-[.05em] pl-[.3em] pr-1 w-full leading-[1cap]",
                email.length > 0 && !isSuccess && "pr-[5.5rem]",
              )
              }
              disabled={isSuccess}
              type="email"
              name="EMAIL"
              id="mce-EMAIL"
              placeholder="Get email updates"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update state on input change
            />
            {email.length > 0 && !isSuccess && ( // Only show the button if input length > 0
              <div id="subscribe" className="flex font-[300] items-center justify-center absolute h-full top-0 right-0">
                <button
                  id="mc-embedded-subscribe"
                  className={classNames(
                    email.length > 0 && "text-contrast-2 hover:text-primary",
                    "body-lg text-contrast-2 hover:text-primary leading-[1cap] bg-transparent pr-[.4em]"
                  )}
                  type="submit"
                  name="subscribe"
                >
                  Subscribe
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};
