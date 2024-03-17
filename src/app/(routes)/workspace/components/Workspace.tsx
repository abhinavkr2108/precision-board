"use client";
import React, { useCallback, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
// @ts-ignore
import Header from "@editorjs/header";
// @ts-ignore
import Checklist from "@editorjs/checklist";
// @ts-ignore
import List from "@editorjs/list";
import { useDocumentStore } from "@/lib/store";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

export default function Workspace() {
  const { saveDocument, setEditor } = useDocumentStore();

  const ref = useRef<EditorJS>();

  const initializeEditor = useCallback(() => {
    const editor = new EditorJS({
      holder: "editorjs",
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
  }, [setEditor]);

  useEffect(() => {
    initializeEditor();
  }, [initializeEditor]);

  return (
    <div>
      <div id="editorjs"></div>
    </div>
  );
}
