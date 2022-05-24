import { index } from "../../cache/data";

export default (req, res) => {
  const results = index
    .filter(
      (e) =>
        e.title?.toLowerCase().includes(req.query.q.toLowerCase()) ||
        e?.slug.includes(req.query.q.toLowerCase())
    )
    .sort((a, b) => {
      let aMatch =
        a?.title.toLowerCase() === req.query.q.toLowerCase() ||
        a?.slug === req.query.q.toLowerCase()
          ? 1
          : 0;
      let bMatch =
        b?.title.toLowerCase() === req.query.q.toLowerCase() ||
        b?.slug === req.query.q.toLowerCase()
          ? 1
          : 0;
      return bMatch - aMatch;
    });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ results }));
};
