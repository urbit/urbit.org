import NewsletterSignup from "./NewletterSignup";
import { name, contact } from "../lib/constants";
import Link from "next/link";

export default function Contact({ emphasize }) {
  const linkText = emphasize ? "text-green-400" : "text-wall-600";
  const border = emphasize ? "border-green-400" : "border-wall-600";

  return (
    <div>
      <div className="measure">
        <h4 className="pb-6">
          If you’d like to follow our progress, we send monthly updates via
          email:
        </h4>
      </div>
      <NewsletterSignup color={border} />
      <h4 className="mt-12 text-wall-500">
        Follow us on{" "}
        <a className={linkText} href={contact.twitter}>
          Twitter
        </a>
      </h4>
      <h4 className="mt-6 text-wall-500">
        Explore code on{" "}
        <a className={linkText} href={contact.github}>
          Github
        </a>
      </h4>
      <h4 className="mt-6 text-wall-500 flex-wrap">
        Boot Urbit and join{" "}
        <Link href={`/groups/${contact.urbitCommunity}`}>
          <a className={linkText}>Urbit Community</a>
        </Link>
      </h4>
    </div>
  );
}
