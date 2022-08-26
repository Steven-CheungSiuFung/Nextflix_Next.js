import jwt from "jsonwebtoken";
import {
  getStatsByUserIdAndVideoId,
  insertNewStats,
} from "../../../lib/db/hasura";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(403).json({ message: "forbidden" });
    }

    const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);

    const { issuer } = decodedToken;
    const { videoId } = req.query;

    const response = await getStatsByUserIdAndVideoId(token, issuer, videoId);

    if (response.data.stats.length > 0) {
      const statsData = response.data.stats[0];
      return res.status(200).json({ favourited: statsData.favourited });
    } else {
      const response = await insertNewStats(token, issuer, videoId);
      return res.status(201).json({ message: "done" });
    }
  } else {
    return res.status(400).json({ message: "request invalid" });
  }
};

export default handler;
