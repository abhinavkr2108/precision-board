"use client";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { useConvex, useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useCallback, useEffect } from "react";

interface HeaderProps {
  user?: KindeUser;
}
export default function Header({ user }: HeaderProps) {
  const convex = useConvex();
  const createUser = useMutation(api.user.createUser);
  const getUser = useQuery(api.user.getUser, { email: user?.email as string });

  const checkUserInConvexDb = useCallback(async () => {
    const result = await convex.query(api.user.getUser, {
      email: user?.email as string,
    });
    if (result.length == 0 || !result.length) {
      createUser({
        name: user?.given_name as string,
        email: user?.email as string,
        image: user?.picture as string,
      }).then((res) => {
        console.log("CREATE USER RESPONSE: ");
        console.log(res);
      });
    }
  }, [convex, createUser, user]);

  useEffect(() => {
    checkUserInConvexDb();
  }, [checkUserInConvexDb]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between py-4 border-b md:flex">
        <div>
          <h3 className="text-gray-800 text-2xl font-bold">Analytics</h3>
        </div>
        <div className="items-center gap-x-3 mt-6 md:mt-0 sm:flex">
          <a
            href="/dashboard"
            className="block px-4 py-2 text-center text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Login
          </a>
          <a
            href="/dashboard"
            className="block px-4 py-2 mt-3 text-center text-gray-700 duration-150 font-medium rounded-lg border hover:bg-gray-50 active:bg-gray-100 sm:mt-0 md:text-sm"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
