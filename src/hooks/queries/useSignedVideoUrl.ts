import { honoClient } from "@/lib/hono-client";
import { useQuery } from "@tanstack/react-query"



export const useSignedVideoUrl = (iFrameUrl: string) => {

	const query = useQuery({
		queryKey: ['signed-video-url'],
		queryFn: async () => {
			const response = await honoClient.api.video["signed-iframe-url"].$get({
				query: {
					iFrameUrl,
				}
			});
			if (!response.ok) {
				throw new Error("Failed to fetch signed video url");
			}
			const data = await response.json();
			return data;
		},

	})
	return query;
}
