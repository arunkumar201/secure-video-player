import { VideoPlayer } from "@/components/VideoPlayer";

export default function Home() {
	return (
		<main className="relative h-screen flex  flex-col items-center justify-between p-24">
			<VideoPlayer />
		</main>
	);
}
