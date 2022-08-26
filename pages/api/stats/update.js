import jwt from "jsonwebtoken";
import { updateStats } from "../../../lib/db/hasura";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const token = req.cookies.token;

      if (!token) {
        return res.status(403).json({ message: "forbidden" });
      }

      const decodedToken = jwt.verify(
        token,
        process.env.NEXT_PUBLIC_JWT_SECRET
      );

      const { issuer } = decodedToken;

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
