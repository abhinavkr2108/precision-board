import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import SidebarTeam from "./SidebarTeam";
import User from "./User";

export default async function Drawer() {
  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();

  if (!currentUser || !currentUser.email) {
    return "Not logged in";
  }

  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="h-full flex flex-col justify-between"
      >
        <div>
          <SidebarTeam user={currentUser} />
        </div>
        <div>
          <>
            <User user={currentUser} />
          </>
        </div>
      </SheetContent>
    </Sheet>
  );
}
