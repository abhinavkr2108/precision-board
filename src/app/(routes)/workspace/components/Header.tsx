"use client";
import { useConvex, useMutation } from "convex/react";
import React, { useCallback, useEffect, useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { CopyIcon, Link, Save } from "lucide-react";
import { useDocumentStore } from "@/lib/store";
import { toast } from "sonner";
import { Id } from "../../../../../convex/_generated/dataModel";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ShareUrlDialog from "./ShareUrlDialog";

interface HeaderProps {
  fileId: string;
}

export default function Header({ fileId }: HeaderProps) {
  const [fileName, setFileName] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const convex = useConvex();
  const updateDocument = useMutation(api.files.updateDocument);
  const updateWhiteboard = useMutation(api.files.updateWhiteboard);

  const { saveDocument, editor, whiteboardData } = useDocumentStore();

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
      updateWhiteboard({
        _id: fileId as Id<"files">,
        whiteboard: JSON.stringify(whiteboardData),
      });

      toast.success("Saved Document");
    } catch (error) {
      toast.error("Error saving Documnent");
    }
  };

  const getFileUrl = () => {
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={`${process.env.NEXT_BASE_URL}/workspace/${fileId}`}
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>;
  };

  useEffect(() => {
    fileId && getFileName();
  }, [fileId, getFileName]);

  return (
    <div className="px-6 py-3 border-b flex justify-between items-center">
      <h1 className="text-2xl font-bold">{fileName}</h1>
      <div className="flex items-center gap-3">
        <ShareUrlDialog fileId={fileId} />
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
