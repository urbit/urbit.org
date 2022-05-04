import Link from "next/link";
import { formatDate } from "../lib/lib";

export default function Pagination(props) {
  return (
    <Link
      href={`/${props.section}/${props.post.slug}`}
      key={`post-${props.post.slug}`}
    >
      <div
        className="bg-wall-100 cursor-pointer font-semibold p-2 px-4 rounded-xl flex"
        style={{ maxWidth: "45%" }}
      >
        <p className="shrink-0 pr-1">{props.previous ? "<- " : ""}</p>
        <p className="text-wall-600 truncate">{props.post.title}</p>
        <p className="shrink-0 pl-1">{props.next ? " ->" : ""}</p>
      </div>
    </Link>
  );
}

Pagination.defaultProps = {
  className: "",
};
