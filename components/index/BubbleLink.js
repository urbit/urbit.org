export default function BubbleLink(props) {
  return (
    <li className={"list-none " + props.className}>
      <a className={"flex"} href={props.href} target={props.target}>
        <div>{props.children}</div>
        <div className="flex flex-col ml-4">
          <p className="font-bold">{props.title}</p>
          <p className="text-wall-400 dark:text-antiwall-400 font-bold leading-snug">
            {props.caption}
          </p>
        </div>
      </a>
    </li>
  );
}

BubbleLink.defaultProps = {
  className: "",
  title: "",
  caption: "",
  children: (
    <div className="w-12 h-12 bg-wall-500 dark:bg-antiwall-500 rounded-full" />
  ),
  target: "_blank",
};
