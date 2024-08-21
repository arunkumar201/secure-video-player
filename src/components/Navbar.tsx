"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Navbar: React.FC = () => {
	const { data: session, status } = useSession();
	const signInHandler = async () => {
		redirect("/api/auth/signin");
	};
	return (
		<nav className="bg-blue-500 p-4">
			<div className="container mx-auto flex justify-between items-center">
				<div className="text-white text-2xl">Secure Video Player</div>
				<div>
					{status == "authenticated" ? (
						<button
							onClick={async () => await signOut()}
							className="bg-red-500 text-white py-2 px-4 rounded"
						>
							Sign Out
						</button>
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
