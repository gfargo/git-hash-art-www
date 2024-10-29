import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    // DATABASE_URL: z.string().min(1),
    APP_URL: z.string().min(1),
    // GOOGLE_SITE_VERIFICATION_ID: z.string().optional(),
  },
  client: {
    // NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  },
  runtimeEnv: {
    // DATABASE_URL: process.env.DATABASE_URL,
    APP_URL: process.env.APP_URL,
    // GOOGLE_SITE_VERIFICATION_ID: process.env.GOOGLE_SITE_VERIFICATION_ID,
  },
});
