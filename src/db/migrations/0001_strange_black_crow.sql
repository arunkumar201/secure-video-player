ALTER TABLE "user" ALTER COLUMN "isPremium" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT now();