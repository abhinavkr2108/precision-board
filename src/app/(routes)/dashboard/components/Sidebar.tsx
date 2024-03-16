import React from "react";
import SidebarTeam from "./SidebarTeam";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import CreateNewFile from "./CreateNewFile";
import User from "./User";

export default async function Sidebar() {
  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();

  if (!currentUser || !currentUser.email) {
    return "Not logged in";
  }

  return (
    <div className="p-4 w-full h-full flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        <SidebarTeam user={currentUser} />
        {/* <CreateNewFile user={currentUser} /> */}
      </div>
      <User user={currentUser} />
    </div>
  );
}
