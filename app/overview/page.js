"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OverviewRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/overview/urbit-explained");
  }, [router]);

  return null;
}
