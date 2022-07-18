import { index } from "../../cache/data";
const levenSort = require("leven-sort");

export default (req, res) => {
  const results = index.filter(
    (e) =>
      e.title?.toLowerCase().includes(req.query.q.toLowerCase()) ||
      e?.slug.includes(req.query.q.toLowerCase()) ||
      e?.parent.toLowerCase().includes(req.query.q.toLowerCase())
  );
  const sorted = levenSort(results, req.q, ["title", "slug", "parent"]);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ results: sorted }));
};
