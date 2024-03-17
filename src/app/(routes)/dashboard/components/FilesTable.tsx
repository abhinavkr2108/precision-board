"use client";
import { useConvex } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useTeamStore } from "@/lib/store";
import { useCallback, useEffect, useState } from "react";
import { File } from "@/lib/types/files";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function FilesTable() {
  const { activeTeam } = useTeamStore();

  const [files, setFiles] = useState<File[]>([]);

  const convex = useConvex();
  const router = useRouter();

  const fetchFiles = useCallback(async () => {
    const result = await convex.query(api.files.getFiles, {
      teamId: activeTeam?._id as string,
    });
    setFiles(result);
    return result;
  }, [convex, activeTeam]);

  useEffect(() => {
    activeTeam && fetchFiles();
  }, [convex, activeTeam, fetchFiles]);

  const navigateToWorkspace = (fileId: string) => {
    router.push(`/workspace/${fileId}`);
  };

  return (
    <div className="px-4 md:px-8">
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">File Name</th>
              <th className="py-3 px-6">Created At</th>
              <th className="py-3 px-6">Author</th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {files.map((file, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{file.fileName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {moment(file._creationTime).format("DD MMM YYYY")}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {file.createdBy}
                </td>
                <td className="px-6 py-2 h-full whitespace-nowrap flex justify-end items-center gap-2">
                  <Button
                    variant={"link"}
                    onClick={() => navigateToWorkspace(file._id)}
                  >
                    View
                  </Button>
                  <Button variant={"outline"}>Archive</Button>
                  <Button variant={"destructive"}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
