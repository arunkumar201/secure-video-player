import { Context,Hono } from 'hono'
import { authHandler,initAuthConfig,verifyAuth,type AuthConfig } from "@hono/auth-js"
import { handle } from '@hono/node-server/vercel'
import { cors } from "hono/cors"
export const runtime = 'nodejs'

export const dynamic = 'force-dynamic'

import userRoutes from "./user";
import { authOptions } from '@/auth.config'



const app = new Hono({ strict: false }).basePath('/api')

const routes = app.route("/user",userRoutes)

app.use("*",initAuthConfig(getAuthConfig))


app.use(
	"*",
	cors({
		origin: (origin) => origin,
		allowHeaders: ["Content-Type"],
		allowMethods: ["*"],
		maxAge: 86400,
		credentials: true,
	})
)

app.use("/api/auth/*",authHandler())

app.use('/api/*',verifyAuth())

app.get('/hello',(c) => {
	return c.json({
		message: 'Hello Next.js!',
	})
})

app.get('/protected',(c) => {
	const auth = c.get("authUser");
	console.log(auth?.session);
	if (!auth) return c.json({
		error: "Unauthorized",
	},401);

	return c.json(JSON.stringify(auth));
})

function getAuthConfig(c: Context): AuthConfig {
	return {
		secret: process.env.AUTH_SECRET!,
		...authOptions
	}
}

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
export const PATCH = handle(app)

export type AppType = typeof routes;
