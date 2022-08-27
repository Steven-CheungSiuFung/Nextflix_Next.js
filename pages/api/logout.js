import { magicAdmin } from "../../lib/magic-sever";
import { removeTokenCookie } from "../../lib/cookie";
import { verifyToken } from "../../lib/auth";

const handler = async (req, res) => {
  try {
    if (!req.cookies.token) {
      return res.status(401).json({ message: "User is not logged in" });
    }

    const token = req.cookies.token;
    const userId = await verifyToken(token);
    await magicAdmin.users.logoutByIssuer(userId);

    removeTokenCookie(res);
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Error /api/logout", error);
    res.status(500).json({ message: "logout error" });
  }
};

export default handler;
