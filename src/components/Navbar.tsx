"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { useCancelSubscription } from "@/hooks/mutations/useCancelSubscription";
import { useUserPremiumStatus } from "@/hooks/queries/useUserPremiumStatus";

const Navbar: React.FC = () => {
	const { status } = useSession();
	const { mutate: cancelSubscription, isPending } = useCancelSubscription();
	const { data: premiumData } = useUserPremiumStatus();
	const signInHandler = async () => {
		redirect("/api/auth/signin");
	};
	return (
		<nav className="bg-blue-500 p-4">
			<div className="container mx-auto flex justify-between items-center">
				<div className="text-white text-2xl">Secure Video Player</div>
				<div className="flex gap-2">
					{status === "authenticated" &&
						premiumData &&
						premiumData.isPremium && (
							<Button
								variant="outline"
								onClick={() => cancelSubscription()}
								disabled={isPending}
							>
								Cancel Subscription
							</Button>
						)}
					{status == "authenticated" ? (
						<Button
							onClick={async () => await signOut()}
							className="bg-red-500 text-white py-2 px-4 rounded"
						>
							Sign Out
						</Button>
					) : (
						<button
							onClick={signInHandler}
							className="bg-green-500 text-white py-2 px-4 rounded"
						>
							Sign In
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
