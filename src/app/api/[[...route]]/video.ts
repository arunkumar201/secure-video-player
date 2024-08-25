import { auth } from "@/auth";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { env } from "@/env";
import { signStreamURL } from "@/lib/sign-stream";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";




const app = new Hono()
	.get('/signed-iframe-url',async (c) => {
		const session = await auth();
		if (!session) return c.json({ error: "Unauthorized" },401);

		zValidator("query",z.object({
			iFrameUrl: z.string().url(),
		}));

		const { iFrameUrl } = c.req.query();

		//check the user premium status 
		const user = await db.select().from(users).where(eq(users.email,session.user?.email!)).execute();

		if (!user[0].isPremium) return c.json({ error: "User is not premium" },403);

		const signedIframeUrl = await signStreamURL(iFrameUrl,env.BUNNY_SECURITY_KEY);



		if (!signedIframeUrl) return c.json({ error: "Failed to sign iframe url" },500);

		return c.json({ signedIframeUrl },200);


	})
	.post('/cancel-subscription',async (c) => {
		const session = await auth();
		if (!session) return c.json({ error: "Unauthorized" },401);


		//check the user premium status 
		const user = await db.select().from(users).where(eq(users.email,session.user?.email!)).execute();

		if (!user[0].isPremium) return c.json({ error: "User is not premium" },403);

		//update the user premium status
		await db.update(users).set({ isPremium: false }).where(eq(users.email,session.user?.email!)).execute();

		return c.json({ message: "Subscription cancelled successfully" });

	});

export default app;
