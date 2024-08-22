import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import github from "next-auth/providers/github";
import { db } from "./db/db";

export const AuthProviders = [
	github({
		clientId: process.env.GITHUB_CLIENT_ID,
		clientSecret: process.env.GITHUB_CLIENT_SECRET,
	}),
	// credentials({
	// 	id: "email",
	// 	name: "Email-login",
	// 	type: "credentials",
	// 	authorize: async (credentials,req) => {
	// 		return null;
	// 	}
	// })

] satisfies NextAuthConfig["providers"]

const authOptions: NextAuthConfig = {
	providers: AuthProviders,
	adapter: DrizzleAdapter(db),
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 1day
	},
	secret: process.env.AUTH_SECRET,
	jwt: {
		maxAge: 30 * 24 * 60 * 60, // 1
	},
	cookies: {
		sessionToken: {
			name: "_secure-video-player.session-token"
		},
		csrfToken: {
			name: "_secure-video-player.csrf-token"
		},
		callbackUrl: {
			name: "_secure-video-player.callback-url"
		}

	},
}

export default authOptions;
