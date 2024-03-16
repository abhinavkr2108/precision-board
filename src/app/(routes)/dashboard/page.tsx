import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../convex/_generated/api";

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();

  if (!currentUser || !currentUser.email) {
    return "Not logged in";
  }

  return <div>Dashboard</div>;
}
