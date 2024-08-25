'use client';

import { honoClient } from "@/lib/hono-client";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


export const useSubscribeToPremium = () => {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: async (json) => {
			const response = await honoClient.api.payments["create-order"].$post({ json });

			if (!response.ok) {
				throw new Error("Failed to create order");
			}
			const data = await response.json();

			return data;
		},
		onError: (error) => {
			toast.error("Failed to create order");  // Show error to user and log error for debugging.
			console.error("Error creating order:",error);
		},
		onSuccess: async (data) => {
			await queryClient.invalidateQueries({
				queryKey: ['is-premium']
			});
			toast.success("You have successfully subscribed to the premium account");
			console.log("Order created successfully:",data);
		}
	})

	return mutation;
}
