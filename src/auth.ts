import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { authOptions,AuthProviders } from "./auth.config"
import { db } from "./db/db"

export const { handlers,signIn,signOut,auth } = NextAuth(authOptions)
