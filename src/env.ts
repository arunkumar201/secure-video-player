import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		GITHUB_CLIENT_ID: z.string(),
		GITHUB_CLIENT_SECRET: z.string(),
		AUTH_SECRET: z.string(),
		NEXTAUTH_URL: z.string(),
		DATABASE_URL: z.string(),
		RAZORPAY_KEY_ID: z.string().optional(),
		RAZORPAY_KEY_SECRET: z.string().optional(),
		BUNNY_SECURITY_KEY: z.string(),
	},
	client: {
		NEXT_PUBLIC_WEB_URL: z.string(),
	},
	// For Next.js >= 13.4.4, you only need to destructure client variables:
	// experimental__runtimeEnv: {
	//   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
	// }
	runtimeEnv: {
		NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
		GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
		GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
		AUTH_SECRET: process.env.AUTH_SECRET,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		DATABASE_URL: process.env.DATABASE_URL,
		RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
		RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
		BUNNY_SECURITY_KEY: process.env.BUNNY_SECURITY_KEY,
	}
});
