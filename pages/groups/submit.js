import Link from "next/link";
import { useState } from "react";
import { Container, Section, SingleColumn } from "foundation-design-system";
import { useInputChange } from "../../lib/hooks";
import Head from "next/head";
import Meta from "../../components/Meta";

const SubmissionPage = () => {
  const [form, handleFormChange] = useInputChange();
  const [publicGroup, setPublicGroup] = useState(true);

  const href = `https://github.com/urbit/urbit.org/new/master?filename=/content/groups/${
    form?.shortcode
  }.md&value=${encodeURIComponent(
    `+++
title = "${form?.groupName}"
shortcode = "${form?.shortcode}"
type = "${publicGroup ? "Public" : "Private"}"
tile = "${form?.tile || ""}"
participant_range = "${form?.members || ""}"
+++

${form?.description || ""}`
  )}`;

  return (
    <Container>
      <Head>
        <title>Submit a group • Urbit.org</title>
        {Meta}
      </Head>
      <SingleColumn>
        <Section narrow className="space-y-12">
          <div className="flex flex-col space-y-4">
            <h2>Submit your group</h2>
            <p>
              Groups submissions are accomplished through a GitHub pull request.
            </p>
            <p>
              You’ll need <a href="https://github.com">a GitHub account</a>{" "}
              before you get started to submit your group.
            </p>
            <p>
              First, enter your information and then click “Submit with GitHub.”
              You’ll be directed to a GitHub pull request page with a
              pre-populated markdown file. Click “Propose new file,” and then
              “Create pull request” on the following page.
            </p>
            <p>
              Then, to validate that you operate this group, send a DM to{" "}
              <Link href="/ids/~haddef-sigwen" passHref>
                <a>~haddef-sigwen</a>
              </Link>{" "}
              from your group host <code>@p</code> with a link to the pull
              request on GitHub. We’ll approve the pull request and your page
              will be online shortly.
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            <h3>Enter your group information</h3>
            <div className="flex flex-col">
              <p>Group name (required)</p>
              <input
                className="bg-wall-100 p-2"
                name="groupName"
                placeholder="Urbit Community"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col">
              <p>Group type</p>
              <div className="flex space-x-4">
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => setPublicGroup(true)}
                >
                  <input
                    type="radio"
                    onChange={() => null}
                    checked={publicGroup}
                  />
                  <p>Public</p>
                </div>
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => setPublicGroup(false)}
                >
                  <input
                    type="radio"
                    onChange={() => null}
                    checked={!publicGroup}
                  />
                  <p>Private</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <p>Shortcode (required)</p>
              <input
                className="bg-wall-100 p-2"
                name="shortcode"
                placeholder="~bitbet-bolbel/urbit-community"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col">
              <p>Group image URL or color</p>
              <input
                className="bg-wall-100 p-2"
                name="tile"
                placeholder="https://... or #FFCDE0"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col">
              <p>Members</p>
              <input
                className="bg-wall-100 p-2"
                name="members"
                placeholder="1000+"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col">
              <p>Description</p>
              <textarea
                className="resize-none bg-wall-100 p-2 h-60"
                name="description"
                onChange={handleFormChange}
              />
            </div>
          </div>
          <button
            className="button-lg bg-wall-600 text-wall-100"
            onClick={() => window.open(href)}
          >
            Submit with GitHub
          </button>
          <Link href="/" passHref>
            <a className="text-xl pt-8 block font-semibold">Urbit.org</a>
          </Link>
        </Section>
      </SingleColumn>
    </Container>
  );
};

export default SubmissionPage;
