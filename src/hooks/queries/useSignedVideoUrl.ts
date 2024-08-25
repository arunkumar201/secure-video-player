import { honoClient } from "@/lib/hono-client";
import { useQuery } from "@tanstack/react-query"

interface IUseSignedVideoUrl {
	iFrameUrl: string;
	isPremium: boolean | undefined | null;
}

export const useSignedVideoUrl = ({ iFrameUrl,isPremium }: IUseSignedVideoUrl) => {

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
		enabled: !!isPremium,
	})
	return query;
}
