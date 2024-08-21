import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './auth';
import { env } from './env';

const WEB_URL = env.NEXT_PUBLIC_WEB_URL;
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
	const token = await auth();

	console.debug("🚀 ~ middleware ~ token:",token);

	if (!token) return NextResponse.redirect(new URL("/api/auth/signin",WEB_URL));

	return NextResponse.next();
}

//"Matching Paths" 
export const config = {
	matcher: [
		"/",
	]
}
