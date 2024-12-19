import { Liveblocks } from "@liveblocks/node";

const key = process.env.LIVEBLOCKS_SECRET_KEY

if (!key) {
  throw new Error("LIVEBLOCKS_SECRET_KEY is not set");
}

export const liveblocks = new Liveblocks({
  secret: key,
});