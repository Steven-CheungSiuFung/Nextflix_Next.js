import jwt from "jsonwebtoken";

import { magicAdmin } from "../../lib/magic-sever";
import { getIsNewUser } from "../../lib/db/hasura";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(400).json({ message: "Missing token" });
      }
      const authToken = req.headers.authorization.slice(7);

      const metadata = await magicAdmin.users.getMetadataByToken(authToken);

      const { issuer, publicAddress, email } = metadata;

      const token = jwt.sign(
        {
          issuer,
          publicAddress,
          email,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-default-role": "user",
            "x-hasura-user-id": `${issuer}`,
          },
        },
        process.env.NEXT_PUBLIC_JWT_SECRET
      );

      const isNewUser = await getIsNewUser(token, issuer);

      return res.status(200).json({ done: true, isNewUser });
    } catch (error) {
      console.error("Login in error", error);
      res.status(500).json({ message: "Login failed" });
    }
  } else {
    console.log("Invalid request");
    res.status(400).json({ message: "Invalid request" });
  }
};

export default handler;
