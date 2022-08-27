import jwt from "jsonwebtoken";

export const veriftToken = (token) => {
  const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);

  const { issuer } = decodedToken;

  return issuer;
};
