"use client";
import React, { use, useCallback, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
// @ts-ignore
import Header from "@editorjs/header";
// @ts-ignore
import Checklist from "@editorjs/checklist";
// @ts-ignore
import List from "@editorjs/list";
import { useDocumentStore } from "@/lib/store";
import { useConvex, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { File } from "@/lib/types/files";

const rawDocument = {
  time: 1550476186479,
  blocks: [
    {
      data: {
        text: "Document Name",
        level: 2,
      },
      id: "123",
      type: "header",
    },
    {
      data: {
        level: 4,
      },
      id: "1234",
      type: "header",
    },
  ],
  version: "2.8.1",
};
interface WorkspaceProps {
  fileId: string;
}
export default function Workspace({ fileId }: WorkspaceProps) {
  const { saveDocument, setEditor } = useDocumentStore();

  const [fileData, setFileData] = useState<File>();
  const ref = useRef<EditorJS>();

  const convex = useConvex();

  const initializeEditor = useCallback(() => {
    const editor = new EditorJS({
      holder: "editorjs",
      data: fileData?.document ? JSON.parse(fileData.document) : rawDocument,
      tools: {
        header: Header,
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
      },
    });
    ref.current = editor;
    setEditor(editor);
  }, [setEditor, fileData]);

  const getDocument = useCallback(async () => {
    const result = await convex.query(api.files.retrieveFileContent, {
      _id: fileId as Id<"files">,
    });
    setFileData(result);
  }, [convex, fileId]);

  useEffect(() => {
    fileData && initializeEditor();
  }, [initializeEditor, fileData]);

  useEffect(() => {
    if (fileId) {
      const getDoc = async () => {
        const result = await convex.query(api.files.retrieveFileContent, {
          _id: fileId as Id<"files">,
        });
        setFileData(result);
      };
      getDoc();
    }
  }, [convex, fileId]);

  //   useEffect(() => {
  //     fileId && getDocument();
  //   }, [getDocument, fileId]);

  return (
    <div>
      <div id="editorjs"></div>
    </div>
  );
}
