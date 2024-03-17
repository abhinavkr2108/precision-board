"use client";
import React from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";

export default function Canvas() {
  return (
    <div style={{ height: "500px" }}>
      <Excalidraw
        onChange={(excalidrawElements, appState, files) =>
          console.log(excalidrawElements)
        }
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
    </div>
  );
}
