import GatewayImage from "./Image";

const GatewayHeader = ({
  image,
  patp,
  color,
  subtitle,
  subtitleMono,
  error,
  title,
  item,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <GatewayImage patp={patp} color={color} image={image} error={error} />
      <div className="flex flex-col">
        <h2>{title}</h2>
        {subtitle && (
          <p className={(subtitleMono ? "font-mono" : "font-sans") + " pb-1"}>
            {subtitle}
          </p>
        )}
        <p>{item}</p>
      </div>
    </div>
  );
};

export default GatewayHeader;
