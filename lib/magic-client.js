import { Magic } from "magic-sdk";

export const getMagicClient = () => {
  const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY);
  return magic;
};
