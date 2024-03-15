"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../../../convex/_generated/api";

export default function DashboardContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const convex = useConvex();
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  const checkTeam = useCallback(async () => {
    const result = await convex.query(api.teams.getTeams, {
      email: user?.email as string,
    });

    if (!result?.length) {
      router.push("teams/create");
    }
  }, [convex, user, router]);

  useEffect(() => {
    user && checkTeam();
  }, [user, checkTeam]);

  return <>{children}</>;
}
