import Link from "next/link";
import { Container, SingleColumn, Section } from "foundation-design-system";
import { useInputChange } from "../../lib/hooks";
import ob from "urbit-ob";
import Sigil from "../../components/Sigil";
import Head from "next/head";
import Meta from "../../components/Meta";

const SubmissionPage = () => {
  const [form, handleFormChange] = useInputChange();

  const href = `https://github.com/urbit/urbit.org/new/master?filename=/content/ids/${form?.ship?.substring(
    1
  )}.md&value=${encodeURIComponent(
    `+++
ship = "${form?.ship}"
nickname = "${form?.nickname || ""}"
bgColor = "${form?.bgColor || "#000000"}"
image = "${form?.image || ""}"
+++

${form?.description || ""}`
  )}`;

  let validColor = /^#[0-9A-F]{6}$/i.test(form?.bgColor)
    ? form?.bgColor
    : "#24201E";

  return (
    <Container>
      <Head>
        <title>Claim an Urbit ID page • Urbit.org</title>
        {Meta}
      </Head>
      <SingleColumn>
        <Section narrow className="space-y-12">
          <div className="flex flex-col space-y-4">
            <h2>Claim your page</h2>
            <p>
              Urbit ID page claims are accomplished through a GitHub pull
              request.
            </p>
            <p>
              You’ll need <a href="https://github.com">a GitHub account</a>{" "}
              before you get started.
            </p>
            <p>
              First, enter your information and then click “Submit with GitHub.”
              You’ll be directed to a GitHub pull request page with a
              pre-populated markdown file. Click “Propose new file,” and then
              “Create pull request” on the following page.
            </p>
            <p>
              Then, to validate that you own that ID, send a DM to{" "}
              <Link href="/ids/~haddef-sigwen" passHref>
                <a>~haddef-sigwen</a>
              </Link>{" "}
              from your <code>@p</code> with a link to the pull request on
              GitHub. We’ll approve the pull request and your page will be
              online shortly.
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            <h3>Enter your Urbit ID information</h3>
            <div className="flex flex-col">
              <p>Urbit ID (required)</p>
              <div className="flex items-center">
                {form?.image ? (
                  <img
                    className="mr-2 rounded-lg"
                    src={form?.image}
                    style={{ height: 32, width: 32 }}
                  />
                ) : (
                  <div
                    className="flex p-2 rounded-lg mr-2"
                    style={{
                      backgroundColor: validColor,
                      display: form?.ship?.length > 14 ? "none" : "block",
                    }}
                  >
                    <Sigil
                      icon
                      color={validColor}
                      size="25"
                      patp={
                        ob.isValidPatp(form?.ship || "") ? form?.ship : "~zod"
                      }
                    />
                  </div>
                )}
                <input
                  className="bg-wall-100 p-2 flex-1"
                  name="ship"
                  placeholder="~bitbet-bolbel"
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <p>Nickname (optional)</p>
              <input
                placeholder="Bitbet"
                name="nickname"
                onChange={handleFormChange}
                className="bg-wall-100 p-2"
              />
            </div>
            <div>
              <p>Sigil color (or avatar image)</p>
              <div className="flex space-x-2">
                <input
                  placeholder="#24201E"
                  name="bgColor"
                  className="bg-wall-100 p-2 flex-1"
                  onChange={handleFormChange}
                />
                <input
                  placeholder="https://..."
                  name="image"
                  className="bg-wall-100 p-2 flex-1"
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <p>Hosted groups</p>
              <input
                className="bg-wall-100 p-2 text-wall-400"
                readOnly
                value="Submitted groups associated with this ID will automatically appear"
              />
            </div>
            <div className="flex flex-col">
              <p>Applications</p>
              <input
                className="bg-wall-100 p-2 text-wall-400"
                readOnly
                value="Submitted applications associated with this ID will automatically appear"
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
