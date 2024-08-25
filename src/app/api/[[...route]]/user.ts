import { auth } from '@/auth'
import { db } from '@/db/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'

const app = new Hono()
	.get('/is-premium',async (c) => {
		const session = await auth();
		console.log("Session in Hono RPC",JSON.stringify(session));

		if (!session) {
			return c.json({ error: "Unauthorized" },401)
		}

		const user = await db.select().from(users).where(eq(users.email,session.user?.email!)).execute()

		if (user.length === 0) {
			return c.json({
				error: 'User not found',
			},404)
		}


		return c.json({ isPremium: user[0].isPremium })
	})

export default app;
