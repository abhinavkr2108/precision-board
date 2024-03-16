import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import Header from "./components/Header";
import FilesTable from "./components/FilesTable";

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();

  if (!currentUser || !currentUser.email) {
    return "Not logged in";
  }

  return (
    <div>
      <Header />
      <FilesTable />
    </div>
  );
}
