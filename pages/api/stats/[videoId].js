import { verifyToken } from "../../../lib/auth";
import {
  getStatsByUserIdAndVideoId,
  insertNewStats,
} from "../../../lib/db/hasura";

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

      const { videoId } = req.query;

      const response = await getStatsByUserIdAndVideoId(token, issuer, videoId);

      if (response.data.stats.length > 0) {
        const statsData = response.data.stats[0];
        return res.status(200).json({ favourited: statsData.favourited });
      } else {
        const response = await insertNewStats(token, issuer, videoId);
        return res.status(201).json({ message: "done" });
      }
    } catch (error) {
      console.log("Error /api/stats", error);
      return res.status(500).json({ message: "getStats Error" });
    }
  } else {
    return res.status(400).json({ message: "request invalid" });
  }
};

export default handler;
