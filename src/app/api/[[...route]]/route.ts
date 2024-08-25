import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const runtime = 'nodejs'

export const dynamic = 'force-dynamic'

import userRoutes from "./user";
import paymentRoutes from "./payment";
import videoRoutes from "./video";
import { auth } from '@/auth'


const app = new Hono({ strict: false }).basePath('/api');

const routes = app.route("/user",userRoutes).route("/payments",paymentRoutes).route("/video",videoRoutes);

// app.use(
// 	"*",
// 	cors({
// 		origin: (origin) => origin,
// 		allowHeaders: ["Content-Type"],
// 		allowMethods: ["*"],
// 		maxAge: 86400,
// 		credentials: true,
// 	})
// )

app.get('/hello',(c) => {
	return c.json({
		message: 'Hello Next.js!',
	})
})

app.get('/protected',async (c) => {
	const session = await auth();
	if (!session) return c.json({
		error: "Unauthorized",
	},401);

	return c.json(session);
})


export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes;
