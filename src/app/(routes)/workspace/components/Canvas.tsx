"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { ExcalidrawArrowElement } from "@excalidraw/excalidraw/types/element/types";
import { useDocumentStore } from "@/lib/store";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

interface CanvasProps {
  fileId: string;
}
export default function Canvas({ fileId }: CanvasProps) {
  const { setWhiteboardData, whiteboardData, convexFile } = useDocumentStore();
  const [excalidrawElements, setExcalidrawElements] = useState<any>([]);

  console.log("convexFile");
  console.log(convexFile);

  useEffect(() => {
    if (excalidrawElements) {
      setWhiteboardData(excalidrawElements);
      console.log("WHiteboardData");
      console.log(whiteboardData);
    }
  }, [excalidrawElements, setWhiteboardData, whiteboardData]);
  return (
    <div style={{ height: "500px" }}>
      {convexFile && (
        <Excalidraw
          onChange={(excalidrawElements, appState, files) => {
            setExcalidrawElements(excalidrawElements);
          }}
          initialData={{
            elements: convexFile?.whiteboard
              ? JSON.parse(convexFile?.whiteboard)
              : [],
          }}
        >
          <MainMenu>
            <MainMenu.DefaultItems.ChangeCanvasBackground />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.SaveToActiveFile />
            <MainMenu.DefaultItems.LoadScene />
            <MainMenu.DefaultItems.Export />
          </MainMenu>
          <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.HelpHint />
            <WelcomeScreen.Hints.ToolbarHint />
          </WelcomeScreen>
        </Excalidraw>
      )}
    </div>
  );
}
