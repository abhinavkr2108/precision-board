"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function CreateTeamCard() {
  const [teamName, setTeamName] = useState<string>("");

  const { getUser, user } = useKindeBrowserClient();

  const router = useRouter();

  const createTeam = useMutation(api.teams.createTeam);
  const createNewTeam = async () => {
    createTeam({
      name: teamName,
      createdBy: user?.email as string,
    })
      .then((res) => {
        if (res) {
          toast.success("Team Created Successfully");
          router.push("/dashboard");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to create team");
      });
  };
  return (
    <Card className="w-1/4 shadow-md">
      <CardContent>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create Team</CardTitle>
          <p className="text-center font-semibold text-gray-500 text-lg">
            Create a team to get started
          </p>
        </CardHeader>
        <CardDescription>
          <label className=" text-gray-500">Team Name</label>
          <Input
            placeholder="Team Name"
            width={"full"}
            className="mt-2"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button
          disabled={!(teamName && teamName.length)}
          className="w-full"
          onClick={createNewTeam}
        >
          <span className="font-bold"> Create Team</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
