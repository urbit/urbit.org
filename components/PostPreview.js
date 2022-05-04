import Link from "next/link";
import BackgroundImage from "./BackgroundImage";
import { formatDate, generateDisplayDate } from "../lib/lib";

export default function PostPreview(props) {
  const section = props?.section ? props.section : "blog";

  const date = generateDisplayDate(props.post.date);
  return (
    <div className={`cursor-pointer ${props.className}`}>
      {props.title ? <h3 className="mb-2">{props.title}</h3> : null}

      <Link
        href={`/${section}/${props.post.slug}`}
        key={`post-${props.post.slug}`}
      >
        <div>
          <BackgroundImage
            className="aspect-w-5 aspect-h-4 rounded-lg"
            src={props.post.extra.image || ""}
          />

          <h4 className="mt-2">{props.post.title}</h4>
          <div className="flex items-baseline mt-1">
            {props.post.extra.author ? (
              <div className="type-sub-bold mr-2">
                {props.post.extra.author}
              </div>
            ) : null}
            {props.post.extra.ship ? (
              <Link href={`/ids/${props.post.extra.ship}`}>
                <a className="type-sub-bold text-wall-500 font-mono">
                  {props.post.extra.ship}
                </a>
              </Link>
            ) : null}
          </div>
          <div className="text-wall-500 type-sub mt-1">{formatDate(date)}</div>
        </div>
      </Link>
    </div>
  );
}

PostPreview.defaultProps = {
  className: "",
};
