import Link from "next/link";
import SingleColumn from "./SingleColumn";
import Section from "./Section";
import { contact } from "../lib/constants";

export default function Footer() {
  return (
    <footer className="bg-wall-100 mt-20 w-full flex justify-center">
      <SingleColumn>
        <Section short className="flex flex-row flex-wrap">
          <div className="w-1/2 md:w-1/3 flex flex-col flex-shrink">
            <h4 className="mt-16 mb-8">Use Urbit</h4>
            <Link href="/getting-started">
              <div>
                <a className="type-bold text-wall-500">Getting Started</a>
              </div>
            </Link>
            <Link href="/using">
              <div>
                <a className="type-bold text-wall-500">User's Manual</a>
              </div>
            </Link>
            <Link href="https://github.com/urbit/port/releases">
              <div>
                <a className="type-bold text-wall-500">Urbit Client</a>
              </div>
            </Link>
            <Link href="https://github.com/urbit/urbit/releases">
              <div>
                <a className="mt-2 type-bold text-wall-500">Urbit Binaries</a>
              </div>
            </Link>
            {
              //   <Link href="">
              //   <div>
              //     <a className="mt-2 type-bold text-wall-500">Urbit Apps</a>
              //   </div>
              // </Link>
            }
            <Link href="/getting-started/planet/#hosting-providers">
              <div>
                <a className="mt-2 type-bold text-wall-500">
                  Hosting Providers
                </a>
              </div>
            </Link>
          </div>
          <div className="w-1/2 md:w-1/3 flex flex-col flex-shrink">
            <h4 className="mt-16 mb-8">About</h4>
            <Link href="/understanding-urbit">
              <div>
                <a className="type-bold text-wall-500">What's Urbit?</a>
              </div>
            </Link>
            <Link href="/understanding-urbit/urbit-id">
              <div>
                <a className="mt-2 type-bold text-wall-500">Urbit ID</a>
              </div>
            </Link>
            <Link href="/understanding-urbit/urbit-os">
              <div>
                <a className="mt-2 type-bold text-wall-500">Urbit OS</a>
              </div>
            </Link>
            <Link href="/audits">
              <div>
                <a className="mt-2 type-bold text-wall-500">Security Audits</a>
              </div>
            </Link>
            <Link href="/faq">
              <div>
                <a className="mt-2 type-bold text-wall-500">FAQ</a>
              </div>
            </Link>
            <Link href="//media.urbit.org/whitepaper.pdf">
              <div>
                <a className="mt-2 type-bold text-wall-500">Whitepaper</a>
              </div>
            </Link>
          </div>
          <div className="w-1/2 md:w-1/3 flex flex-col flex-shrink">
            <h4 className="mt-16 mb-8">News</h4>
            <Link href="/blog">
              <div>
                <a className="type-bold text-wall-500">Blog</a>
              </div>
            </Link>
            <Link href="/events">
              <div>
                <a className="mt-2 type-bold text-wall-500">Events</a>
              </div>
            </Link>
            <Link href="/updates">
              <div>
                <a className="mt-2 type-bold text-wall-500">Updates</a>
              </div>
            </Link>
          </div>

          <div className="w-1/2 md:w-1/3 flex flex-col">
            <h4 className="mt-16 mb-8">Develop</h4>
            <Link href="/docs">
              <div>
                <a className="type-bold text-wall-500">Documentation</a>
              </div>
            </Link>
            <Link href="https://github.com/urbit">
              <div>
                <a className="mt-2 type-bold text-wall-500">Github</a>
              </div>
            </Link>
            <Link href="https://github.com/urbit/awesome-urbit#http-apis-airlock">
              <div>
                <a className="mt-2 type-bold text-wall-500">Airlock APIs</a>
              </div>
            </Link>
          </div>
          <div className="w-1/2 md:w-1/3 flex flex-col">
            <h4 className="mt-16 mb-8">Contribute</h4>
            <Link href="https://github.com/urbit/urbit/issues">
              <div>
                <a className="type-bold text-wall-500">Issue Tracker</a>
              </div>
            </Link>
            <Link href="/grants">
              <div>
                <a className="mt-2 type-bold text-wall-500">Urbit Grants</a>
              </div>
            </Link>
          </div>

          <div className="w-1/2 md:w-1/3 flex flex-col">
            <h4 className="mt-16 mb-8">Community</h4>
            <Link href="https://groups.google.com/a/urbit.org/g/dev?pli=1">
              <div>
                <a className="type-bold text-wall-500">Dev Mailing List</a>
              </div>
            </Link>
            <Link href="https://github.com/urbit/azimuth">
              <div>
                <a className="mt-2 type-bold text-wall-500">Governance</a>
              </div>
            </Link>
            <Link href="https://twitter.com/urbit">
              <div>
                <a className="mt-2 type-bold text-wall-500">Twitter</a>
              </div>
            </Link>
          </div>
        </Section>
        <Section className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <Link href="/privacy">
              <div>
                <a className="type-bold text-wall-500">Privacy Policy</a>
              </div>
            </Link>
          </div>
          <div className="md:w-1/3">
            <Link href="/terms-of-service">
              <div>
                <a className="type-bold text-wall-500">Terms of Service</a>
              </div>
            </Link>
          </div>
          <div className="md:w-1/3">
            <div>
              <a
                href={"mailto:" + contact.email}
                className="type-bold text-wall-500"
              >
                {contact.email}
              </a>
            </div>
          </div>
        </Section>
      </SingleColumn>
    </footer>
  );
}
