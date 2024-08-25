import { Hono } from 'hono'
import { zValidator } from "@hono/zod-validator"
import { auth } from '@/auth';
import { z } from 'zod';
import { db } from '@/db/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

const app = new Hono()
	.post('/create-order',async (c) => {
		const session = await auth();
		if (!session) return c.json({ error: "Unauthorized" },401);

		zValidator("json",z.object({
			planId: z.string(),
		})
		);

		//create-order 
		// const options = {
		// 	amount: "99",
		// 	currency: "INR",
		// 	receipt: "order-receipt-" + new Date().toISOString(),
		// }
		const user = await db.select().from(users).where(eq(users.email,session.user?.email!)).execute();

		if (!user[0]) return c.json({ error: "User not found" },404);

		if (user[0].isPremium) return c.json({ error: "User already has a premium account" },400);

		//update the user premium status
		await db.update(users).set({ isPremium: true }).where(eq(users.email,session.user?.email!)).execute();

		return c.json({ message: "Order created successfully" });

	});

export default app;
