"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

export default function Header() {
  return (
    <div className="border-b flex justify-between items-center px-5 py-3">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex items-center gap-3 bg-gray-100 rounded-md px-3 py-2">
        <Search />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none"
        />
      </div>
    </div>
  );
}
