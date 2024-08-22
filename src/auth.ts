import NextAuth from "next-auth"
export const dynamic = 'force-dynamic'
import authOptions from "./auth.config"

export const { handlers,signIn,signOut,auth } = NextAuth(authOptions)
