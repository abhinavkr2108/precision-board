"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { Team } from "@/lib/types/teams";
import { toast } from "sonner";

interface CreateNewFileProps {
  user: KindeUser;
  team: Team | undefined;
}
export default function CreateNewFile({ user, team }: CreateNewFileProps) {
  const [fileName, setFileName] = useState<string>("");

  const createFile = useMutation(api.files.createFile);

  if (!team || team === undefined) {
    return null;
  }

  const createNewFile = (fileName: string) => {
    createFile({
      createdBy: user?.email as string,
      fileName: fileName,
      teamId: team._id,
      archived: false,
      document: "",
      whiteboard: "",
    })
      .then((res) => {
        if (res) {
          toast.success("File created successfully!");
        }
      })
      .catch((err) => {
        toast.error("Failed to create file");
        console.error(err);
      });
  };
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <button className="w-full bg-blue-500 px-3 py-2 rounded-md text-white font-bold">
          Create new File
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New File</DialogTitle>
          <DialogDescription>
            <p>Create a new file to get started</p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Label htmlFor="file">File Name</Label>
          <Input
            id="file"
            width={"full"}
            placeholder="Enter File Name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              disabled={!(fileName && fileName.length > 2)}
              onClick={() => {
                createNewFile(fileName);
              }}
            >
              Create File
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
