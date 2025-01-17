import { Liveblocks } from "@liveblocks/node";
import { env } from "../../env.mjs";

const key = env.LIVEBLOCKS_SECRET_KEY

if (!key) {
  throw new Error("LIVEBLOCKS_SECRET_KEY is not set");
}

export const liveblocks = new Liveblocks({
  secret: key,
});