"use client";
import { useUserPremiumStatus } from "@/hooks/queries/useUserPremiumStatus";
import React from "react";
import { Button } from "./ui/button";
import { useSubscribeToPremium } from "@/hooks/mutations/useSubscribeToPremium";
import { useSignedVideoUrl } from "@/hooks/queries/useSignedVideoUrl";
export const videoURL =
	"https://iframe.mediadelivery.net/embed/292749/e2044f24-1b1d-4244-87d3-e42effe3903e";

export const VideoPlayer = () => {
	const { data, isLoading, isPending, error } = useUserPremiumStatus();
	const { mutate: subscribeToPremium, isPending: isPendingPremium } =
		useSubscribeToPremium();

	const {
		data: signedVideoUrlData,
		isLoading: isLoadingVideoUrl,
		isPending: isLoadingVideoUrlPending,
		error: errorVideoUrl,
	} = useSignedVideoUrl({ iFrameUrl: videoURL, isPremium: data?.isPremium });

	async function upgradeToPremium(): Promise<void> {
		subscribeToPremium();
		return;
	}
	if (isLoading || isPending) {
		return (
			<div className="w-full h-full flex justify-center items-center">
				Loading...
			</div>
		);
	}
	if (data && !data.isPremium) {
		return (
			<div className="w-full h-full flex flex-col justify-center items-center mt-24">
				<h1>You need to be a premium subscriber to watch this video</h1>
				<Button
					aria-label="Upgrade to premium account"
					disabled={isLoading || isPending || isPendingPremium}
					onClick={async () => await upgradeToPremium()}
				>
					Please upgrade to a premium account
				</Button>
			</div>
		);
	}
	if (isLoadingVideoUrl || isLoadingVideoUrlPending) {
		return (
			<div className="w-full h-full flex justify-center items-center">
				Loading video...
			</div>
		);
	}

	if (error || errorVideoUrl) {
		return (
			<div className="w-full h-full flex justify-center items-center">
				<p>There was an error loading the video. Please try again later.</p>
			</div>
		);
	}

	return (
		<div className="relative pb-9/16 overflow-hidden h-full w-full flex justify-center">
			<iframe
				src={`${signedVideoUrlData.signedIframeUrl}`}
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
