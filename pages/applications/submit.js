import Link from "next/link";
import Container from "../../components/Container";
import Section from "../../components/Section";
import SingleColumn from "../../components/SingleColumn";
import { useInputChange } from "../../lib/hooks";
import Head from "next/head";
import Meta from "../../components/Meta";

const SubmissionPage = () => {
  const [form, handleFormChange] = useInputChange();

  const href = `https://github.com/urbit/urbit.org/new/master?filename=/content/applications/${
    form?.shortcode
  }.md&value=${encodeURIComponent(
    `+++
title = "${form?.appName}"
shortcode = "${form?.shortcode}"
license = "${form?.license || ""}"
image = "${form?.imageUrl || ""}"
bgColor = "${form?.bgColor || ""}"
developer = "${form?.developer || ""}"
website = "${form?.website || ""}"
+++

${form?.description || ""}`
  )}`;

  return (
    <Container>
      <Head>
        <title>Submit an application • Urbit.org</title>
        {Meta}
      </Head>
      <SingleColumn>
        <Section narrow className="space-y-12">
          <div className="flex flex-col space-y-4">
            <h2>Submit your application</h2>
            <p>
              Application submissions are accomplished through a GitHub pull
              request.
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
          </div>
          <div className="flex flex-col space-y-4">
            <h3>Enter your application information</h3>
            <div className="flex flex-col">
              <p>Application name (required)</p>
              <input
                className="bg-wall-100 p-2"
                name="appName"
                placeholder="pals"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col">
              <p>Shortcode (required)</p>
              <input
                className="bg-wall-100 p-2"
                name="shortcode"
                placeholder="~paldev/pals"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col w-full">
              <p>App image URL and color</p>
              <div className="flex space-x-4">
                <input
                  className="flex-1 bg-wall-100 p-2"
                  name="imageUrl"
                  placeholder="https://..."
                  onChange={handleFormChange}
                />
                <input
                  name="bgColor"
                  className="bg-wall-100 p-2 flex-1"
                  placeholder="#FFCED0"
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <p>License</p>
              <input
                className="bg-wall-100 p-2"
                name="license"
                placeholder="MIT"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col">
              <p>Developer</p>
              <input
                className="bg-wall-100 p-2"
                name="developer"
                placeholder="~paldev"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col">
              <p>Website</p>
              <input
                className="bg-wall-100 p-2"
                name="website"
                placeholder="https://pal.dev"
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
          <Link href="/">
            <a className="text-xl pt-8 block font-semibold">Urbit.org</a>
          </Link>
        </Section>
      </SingleColumn>
    </Container>
  );
};

export default SubmissionPage;
