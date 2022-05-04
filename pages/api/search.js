import { index } from "../../cache/data";

export default (req, res) => {
  const results = index.filter(
    (e) =>
      e.title?.toLowerCase().includes(req.query.q.toLowerCase()) ||
      e?.slug.includes(req.query.q.toLowerCase())
  );
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ results }));
};
