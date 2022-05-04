import Sigil from "../Sigil";

const GatewayImage = ({
  error = false,
  patp = false,
  color = "transparent",
  image = "",
  size = 100,
}) => {
  if (error) {
    return (
      <div className="overflow-hidden rounded-xl">
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="100" height="100" rx="10" fill="#24201E" />
          <path
            d="M28.8906 27.9844C28.5019 28.0215 28.1699 28.2833 28.043 28.6524C27.914 29.0235 28.0137 29.4336 28.2969 29.7032L70.2969 71.7032C70.4844 71.8965 70.7402 72.0059 71.0098 72.0059C71.2773 72.0079 71.5352 71.9004 71.7246 71.709C71.9141 71.5176 72.0176 71.2598 72.0137 70.9903C72.0098 70.7227 71.8984 70.4668 71.7031 70.2813L66.2501 64.8283C69.8204 60.9181 72.0001 55.7073 72.0001 50.0003C72.0001 37.8618 62.1386 28.0003 50.0001 28.0003C44.2931 28.0003 39.0976 30.1956 35.1876 33.7658L29.7031 28.2813C29.4922 28.0645 29.1934 27.9551 28.8906 27.9844L28.8906 27.9844ZM50.0001 30C61.0566 30 70.0001 38.9435 70.0001 50C70.0001 55.17 68.0411 59.8575 64.8281 63.406L36.5936 35.1715C40.1405 31.9606 44.8336 29.9995 49.9996 29.9995L50.0001 30ZM32.1721 37.8125C31.842 37.8321 31.5452 38.0137 31.3752 38.2969C29.2424 41.6856 28.0002 45.7029 28.0002 49.9999C28.0002 62.1384 37.8617 71.9999 50.0002 71.9999C54.2951 71.9999 58.3147 70.7558 61.7032 68.6249C62.1739 68.3319 62.3165 67.7128 62.0235 67.2421C61.7305 66.7714 61.1114 66.6288 60.6407 66.9218C57.5587 68.8593 53.9122 69.9999 50.0002 69.9999C38.9437 69.9999 30.0002 61.0564 30.0002 49.9999C30.0002 46.0878 31.1233 42.4414 33.0627 39.3594C33.2697 39.043 33.2815 38.6387 33.092 38.3125C32.9045 37.9844 32.5491 37.7929 32.1721 37.8125L32.1721 37.8125Z"
            fill="white"
          />
        </svg>
      </div>
    );
  }

  if (patp) {
    return (
      <div className="rounded-xl overflow-hidden">
        <Sigil patp={patp} size={size} color={color} />
      </div>
    );
  }

  if (image?.startsWith("#")) {
    return (
      <div
        style={{ height: size, width: size, backgroundColor: image }}
        className="rounded-xl"
      />
    );
  }

  return image ? (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: color }}
    >
      <img src={image} style={{ height: size, width: size }} />
    </div>
  ) : (
    <img
      className="object-contain shadow-sm rounded-xl"
      style={{ height: size, width: size }}
      src="https://media.urbit.org/public-links/placeholder-image.png"
    />
  );
};

export default GatewayImage;
