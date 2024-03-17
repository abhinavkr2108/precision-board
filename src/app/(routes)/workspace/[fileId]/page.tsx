import React from "react";
import Header from "../components/Header";
import Workspace from "../components/Workspace";
import Canvas from "../components/Canvas";

interface WorkspacePageProps {
  params: {
    fileId: string;
  };
}

export default function WorkspacePage(props: WorkspacePageProps) {
  const filedId = props.params.fileId;
  if (!filedId || filedId === undefined || filedId === "") {
    return null;
  }
  return (
    <div className="bg-violet-50 h-screen w-screen">
      <Header fileId={filedId} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        <div className="bg-white rounded-md shadow-md p-4">
          <Workspace />
        </div>
        <div>
          <Canvas />
        </div>
      </div>
    </div>
  );
}
