import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { CircleUser } from "lucide-react";
import React from "react";

interface UserProps {
  user: KindeUser;
}
export default function User({ user }: UserProps) {
  return (
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
  );
}
