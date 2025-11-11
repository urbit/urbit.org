"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * REDIRECT PAGE - DO NOT REMOVE
 *
 * This page exists solely to maintain backward compatibility with the old
 * /get-on-the-network URL. It redirects users to the new Running Urbit page.
 *
 * Purpose: Redirect /get-on-the-network → /overview/running-urbit
 *
 * Note: In Next.js static export mode (`output: 'export'`), server-side redirects
 * via next.config.js are not supported. Client-side redirect pages like this one
 * are the standard approach for handling URL changes in static exports.
 */
export default function GetOnTheNetworkRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/overview/running-urbit");
  }, [router]);

  return null;
}
