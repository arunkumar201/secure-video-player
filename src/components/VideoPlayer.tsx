"use client";
import { useUserPremiumStatus } from "@/hooks/queries/useUserPremiumStatus";
import React from "react";
import { Button } from "./ui/button";

export const VideoPlayer = () => {
	const { data, isLoading, isPending, error } = useUserPremiumStatus();
	if (isLoading || isPending) {
		return (
			<div className="w-full h-full flex justify-center items-center">
				Loading...
			</div>
		);
	}

	if (error) {
		return (
			<div className="w-full h-full flex justify-center items-center">
				<p>There was an error loading the video. Please try again later.</p>
			</div>
		);
	}

	if (data && !data.isPremium) {
		return (
			<div className="w-full h-full flex flex-col justify-center items-center mt-24">
				<h1>You need to be a premium subscriber to watch this video</h1>
				<Button aria-label="Upgrade to premium account">
					Please upgrade to a premium account
				</Button>
			</div>
		);
	}

	return (
		<div className="relative pb-9/16 overflow-hidden h-full w-full flex justify-center">
			<iframe
				src="https://iframe.mediadelivery.net/embed/292749/e2044f24-1b1d-4244-87d3-e42effe3903e?autoplay=true&loop=false&muted=false&preload=true&responsive=true"
				loading="lazy"
				className="absolute top-0 left-0 w-full h-full"
				allowFullScreen
				width={900}
				height={900}
				allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
			></iframe>
		</div>
	);
};
