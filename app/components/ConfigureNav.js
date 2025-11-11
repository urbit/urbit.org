"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";

// TODO Update this to serve as the sub-navigation for the configurator
export const ConfigureNav = () => {
  const currentRoute = usePathname();
  return (
    <ul className="flex flex-row gap-x-4 text-[16px] md:text-large md:flex-col text-gray-87 col-span-6">
      <Link
        className={currentRoute === "/overview" ? "text-white" : "text-gray-87"}
        href="/overview"
      >
        <span className="nav-button">Introduction</span>
      </Link>
      <Link
        className={
          currentRoute === "/overview/urbit-os" ? "text-white" : "text-gray-87"
        }
        href="/overview/urbit-os"
      >
        <span className="nav-button">Urbit OS</span>
      </Link>
      <Link
        className={
          currentRoute === "/overview/urbit-id" ? "text-white" : "text-gray-87"
        }
        href="/overview/urbit-id"
      >
        <span className="nav-button">Urbit ID</span>
      </Link>
      <Link
        className={
          currentRoute === "/overview/history" ? "text-white" : "text-gray-87"
        }
        href="/overview/history"
      >
        <span className="nav-button">History</span>
      </Link>
    </ul>
  );
};
