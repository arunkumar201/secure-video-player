import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

// Read the .env file if it exists, or a file specified by the
// dotenv_config_path parameter that's passed to Node.js
config({ path: ".env.local" });


if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL not found in environment');

export default defineConfig({
	schema: "./src/db/schema/index.ts",
	out: "./src/db/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL,
	},
	verbose: true,
	strict: true,
});
