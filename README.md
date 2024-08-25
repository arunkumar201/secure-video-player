This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Secure Video Player

- This is a Secure Video Player system.

## Features
- Authentication with Github
- Premium Subscription
- Video Player with signed URL 
- Prevent Videos from being played without subscription
- Block Direct Url File Access
- Embed View Token Authentication using Bunny
- DRM Protection using Bunny


## Tech Stack 
- Next.js 14
- NextAuth
- Hono.js
- Drizzle ORM
- Postgres
- Bunny
- Tailwindcss

## Getting Started

create .env.local file from .env.local.example

```bash
bun install
bun run db-generate
bun run db-migrate
```

## Run the development server:

```bash
bun dev

```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
