import { verifyToken } from "../../../lib/auth";
import { updateStats } from "../../../lib/db/hasura";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const token = req.cookies.token;

      if (!token) {
        return res.status(401).json({ message: "missing token" });
      }

      const issuer = verifyToken(token);
      if (!issuer) {
        return res.status(401).json({ message: "user invalid" });
      }

      const { videoId, favourited } = req.body;

      const response = await updateStats(token, issuer, videoId, favourited);
      const result = response.data.update_stats.returning[0];
      return res.status(201).json({ message: "stats updated", result });
    } catch (error) {
      console.log("Error /api/update", error);
      return res.status(500).json({ message: "update stats error" });
    }
  } else {
    return res.status(400).json({ message: "Invalid request" });
  }
};

export default handler;
