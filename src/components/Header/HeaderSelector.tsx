"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header/Header";

export default function HeaderSelector() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return <Header />;
}
