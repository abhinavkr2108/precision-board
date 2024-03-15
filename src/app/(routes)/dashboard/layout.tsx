import React from "react";
import DashboardContent from "./dashboardcontent";
import Sidebar from "@/components/shared/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div>
        <DashboardContent>{children}</DashboardContent>
      </div>
    </div>
  );
}
