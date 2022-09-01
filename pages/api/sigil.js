const { sigil, stringRenderer } = require("@tlon/sigil-js");
const { createCanvas, loadImage, Image } = require("canvas");

const foregroundFromBackground = (background) => {
  const rgb = {
    r: parseInt(background.slice(1, 3), 16),
    g: parseInt(background.slice(3, 5), 16),
    b: parseInt(background.slice(5, 7), 16),
  };
  const brightness = (299 * rgb.r + 587 * rgb.g + 114 * rgb.b) / 1000;
  const whiteBrightness = 255;

  return whiteBrightness - brightness < 50 ? "black" : "white";
};

export default (req, res) => {
  const foreground = req?.query?.foreground
    ? `#${req?.query?.foreground}`
    : foregroundFromBackground(`#${req.query.color || "24201E"}`);
  const { patp = "~zod", color = "24201E", filetype = "png" } = req?.query;
  const svg = sigil({
    patp: patp,
    renderer: stringRenderer,
    size: 1024,
    colors: [`#${color}`, foreground],
    icon: false,
  });
  const svgDataString = "data:image/svg+xml," + svg;
  const canvas = createCanvas(
    1024,
    1024,
    filetype === "svg" ? "svg" : undefined
  );
  const ctx = canvas.getContext("2d");
  const canvasImage = new Image();
  canvasImage.src = svgDataString;
  ctx.drawImage(canvasImage, 0, 0);
  const buffer =
    filetype === "png" ? canvas.toBuffer() : canvas.toBuffer("image/svg+xml");
  res.writeHead(200, {
    "Content-Type": filetype === "png" ? "image/png" : "image/svg+xml",
    ...(filetype === "svg" && {
      "Content-Disposition": `attachment; filename=${patp}.svg`,
    }),
    "Content-Length": buffer.length,
  });
  res.end(buffer, "binary");
};
