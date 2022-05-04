import { sigil, reactRenderer } from "@tlon/sigil-js";

export const foregroundFromBackground = (background) => {
  const rgb = {
    r: parseInt(background.slice(1, 3), 16),
    g: parseInt(background.slice(3, 5), 16),
    b: parseInt(background.slice(5, 7), 16),
  };
  const brightness = (299 * rgb.r + 587 * rgb.g + 114 * rgb.b) / 1000;
  const whiteBrightness = 255;

  return whiteBrightness - brightness < 50 ? "black" : "white";
};

export const Sigil = ({ patp, size, color = "#24201E", icon }) => {
  if (patp.length > 14) {
    return <div />;
  }
  const foreground = foregroundFromBackground(color);
  return (
    <div
      className={icon ? "p-1" : ""}
      style={{ backgroundColor: icon ? color || "black" : "transparent" }}
    >
      {sigil({
        patp: patp,
        renderer: reactRenderer,
        size: icon ? size / 2 : size,
        colors: [color, foreground],
        icon: icon || false,
      })}
    </div>
  );
};

export default Sigil;
