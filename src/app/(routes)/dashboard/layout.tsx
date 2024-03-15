import React from "react";
import DashboardContent from "./dashboardcontent";
import { MenuIcon } from "lucide-react";
import Sidebar from "./components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="hidden md:flex md:w-72 border-r h-screen">
        <Sidebar />
      </div>
      <div className="flex md:hidden p-4">
        <MenuIcon />
      </div>
      <div className="flex-grow">
        <DashboardContent>{children}</DashboardContent>
      </div>
    </div>
  );
}
