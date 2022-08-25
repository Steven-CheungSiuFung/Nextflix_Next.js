import jwt from "jsonwebtoken";

import { magicAdmin } from "../../lib/magic-sever";
import { getIsNewUser, createNewUser } from "../../lib/db/hasura";
import { setTokenCookie } from "../../lib/cookie";

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

      if (isNewUser) {
        const result = await createNewUser(token, metadata);
        const cookie = setTokenCookie(token, res);
        return res.status(201).json({ message: "user created" });
      } else {
        const cookie = setTokenCookie(token, res);
        return res.status(200).json({ message: "user login" });
      }
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
