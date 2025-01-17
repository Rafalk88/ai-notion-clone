import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // This is optional because it's only used in development.
    // See https://next-auth.js.org/deployment.
    NODE_ENV: "development" | "production" | "test",
    CLERK_SECRET_KEY: z.string().min(1).regex(/^(sk_test_|sk_).+$/),
    LIVEBLOCKS_SECRET_KEY: z.string().min(3).regex(/^(sk_dev_|sk_).+$/),
    NODEMAILER_USERNAME: z.string().min(1).email(),
    NODEMAILER_PASSWORD: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_SERVER_URL: z.string().min(1),
    NEXT_PUBLIC_BASE_URL: z.string().min(1),
    NEXT_PUBLIC_GAID: z.string().min(3).regex(/^G-\d+$/),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(3).regex(/^(pk_test_|pk_).+$/),
    NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY: z.string().min(3).regex(/^(pk_dev_|pk_).+$/)
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    LIVEBLOCKS_SECRET_KEY: process.env.LIVEBLOCKS_SECRET_KEY,
    NODEMAILER_USERNAME: process.env.NODEMAILER_USERNAME,
    NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_GAID: process.env.NEXT_PUBLIC_GAID,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY_URL: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY_URL,
    NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY,
  },
})