import { AppType } from "@/app/api/[[...route]]/route";
import { env } from "@/env";
import { hc } from "hono/client";


const baseUrl = env.NEXT_PUBLIC_WEB_URL;

export const honoClient = hc<AppType>(baseUrl)
