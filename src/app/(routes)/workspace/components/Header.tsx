"use client";
import { useConvex, useMutation } from "convex/react";
import React, { useCallback, useEffect, useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Link, Save } from "lucide-react";
import { useDocumentStore } from "@/lib/store";
import { toast } from "sonner";
import { Id } from "../../../../../convex/_generated/dataModel";

interface HeaderProps {
  fileId: string;
}

export default function Header({ fileId }: HeaderProps) {
  const [fileName, setFileName] = useState<string>("");

  const convex = useConvex();
  const updateDocument = useMutation(api.files.updateDocument);

  const { saveDocument, editor } = useDocumentStore();

  const getFileName = useCallback(async () => {
    const result = await convex.query(api.files.getFileName, {
      fileId,
    });
    setFileName(result[0].fileName);
    return result;
  }, [convex, fileId]);

  const handleSaveDocument = async (editor: any) => {
    try {
      const result = await saveDocument(editor);
      updateDocument({
        _id: fileId as Id<"files">,
        document: JSON.stringify(result),
      });

      toast.success("Saved Document");
    } catch (error) {
      toast.error("Error saving Documnent");
    }
  };

  useEffect(() => {
    fileId && getFileName();
  }, [fileId, getFileName]);

  return (
    <div className="px-6 py-3 border-b flex justify-between items-center">
      <h1 className="text-2xl font-bold">{fileName}</h1>
      <div className="flex items-center gap-3">
        <Button>
          <Link />
          Share
        </Button>
        <Button
          variant={"secondary"}
          onClick={() => handleSaveDocument(editor)}
        >
          <Save />
          Save
        </Button>
      </div>
    </div>
  );
}
