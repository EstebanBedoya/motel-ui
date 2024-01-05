"use client";
/** @package */
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/rooms");
  }, [router]);

  return null;
}
