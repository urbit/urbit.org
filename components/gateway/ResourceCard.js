import Link from "next/link";
import GatewayImage from "./Image";

const ResourceCard = ({ type, shortcode, title, color, image }) => (
  <Link href={`/${type}s/${shortcode}`}>
    <div className="cursor-pointer rounded-xl bg-wall-100 p-4 flex items-center space-x-4 mr-2 my-1">
      <GatewayImage color={color} image={image || color} size={50} />
      <a className="font-semibold">{title}</a>
    </div>
  </Link>
);

export default ResourceCard;
