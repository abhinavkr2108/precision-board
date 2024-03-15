"use client";
import React, { useCallback, useEffect, useState } from "react";
import { ChevronDown, CircleUser, LogOut, Settings, Users } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useConvex } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Team } from "@/lib/types/teams";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface SidebarTeamProps {
  user: KindeUser;
}
export default function SidebarTeam({ user }: SidebarTeamProps) {
  const menuItems = [
    {
      id: 1,
      name: "Create Team",
      icon: Users,
      link: "/teams/create",
    },
    {
      id: 2,
      name: "Settings",
      icon: Settings,
      link: "/settings",
    },
  ];
  const [teamList, setTeamList] = useState<Team[]>([]);
  const [activeTeam, setActiveTeam] = useState<Team>();

  const convex = useConvex();
  const router = useRouter();

  const getTeamList = useCallback(async () => {
    const result = await convex.query(api.teams.getTeams, {
      email: user?.email as string,
    });
    setTeamList(result);
    setActiveTeam(result[0]);
    return result;
  }, [convex, user]);

  useEffect(() => {
    getTeamList();
  }, [convex, user, getTeamList]);

  return (
    <div>
      <Popover>
        <PopoverTrigger className="w-full">
          <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 rounded-md border-b">
            <h2 className="text-xl font-bold">{activeTeam?.name}</h2>
            <ChevronDown />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-3 mt-2">
            <Select
              onValueChange={(value) =>
                setActiveTeam(teamList.find((team) => team.name === value))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={activeTeam?.name} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>All Teams: </SelectLabel>
                  {teamList.map((team, index) => (
                    <SelectItem
                      key={index}
                      value={team.name}
                      className="cursor-pointer"
                    >
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {menuItems.map((item) => (
              <div
                key={item.id}
                onClick={() => router.push(item.link)}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 rounded-md"
              >
                <item.icon className="w-5 h-5" />
                <p className="text-md">{item.name}</p>
              </div>
            ))}
            <LogoutLink>
              <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 rounded-md">
                <LogOut className="w-5 h-5" />
                <p className="text-md">Logout</p>
              </div>
            </LogoutLink>
            <div className="mt-4 flex items-center gap-2 cursor-pointer">
              <Avatar>
                <AvatarImage src={user.picture as string} />
                <AvatarFallback>
                  <CircleUser />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-md font-semibold">{user.given_name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
