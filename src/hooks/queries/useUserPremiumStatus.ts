'use client';

import { honoClient } from "@/lib/hono-client";
import { useQuery } from "@tanstack/react-query";

export const useUserPremiumStatus = () => {
	return useQuery({
		queryKey: ['is-premium'],
		queryFn: async () => {
			const response = await honoClient.api.user["is-premium"].$get();

			if (!response.ok) {
				throw new Error("Failed to fetch user premium status");
			}
			const data = await response.json();

			return data;
		},
		refetchOnWindowFocus: true,
		staleTime: 1000,

	});
};
