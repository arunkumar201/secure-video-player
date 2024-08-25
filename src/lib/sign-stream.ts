


import crypto from 'crypto';
export const signStreamURL = async (iFrameUrl: string,securityKey: string) => {
	const expirationTime = 30;

	const parsedUrl = new URL(iFrameUrl);
	const segment = parsedUrl.pathname.split('/');
	const videoId = segment[3];

	const expires = Math.floor(Date.now() / 1000) + expirationTime;

	const token = await generateToken(videoId,expires,securityKey);

	parsedUrl.searchParams.set('token',token);
	parsedUrl.searchParams.set('expires',String(expires));

	return parsedUrl.toString();
}
async function generateToken(videoId: string,expires: number,securityKey: string) {
	const data = securityKey + videoId + String(expires);
	const signature = await crypto.createHash('sha256').update(data).digest('hex');
	return signature;
}
