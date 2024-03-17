import { create } from "zustand";
import { Team } from "./types/teams";
import { api } from "../../convex/_generated/api";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { ConvexReactClient } from "convex/react";

type TeamState = {
  teamList: Team[] | undefined;
  activeTeam: Team | undefined;
  setActiveTeam: (team: Team) => void;
  getTeamList: (convex: ConvexReactClient, user: KindeUser) => Promise<void>;
};

type DocumentStore = {
  editor: any;
  setEditor: (editor: any) => void;
  saveDocument: (editor: any) => Promise<any>;
  // updateDocument: (fileId: string, document: string) => void;
};

export const useTeamStore = create<TeamState>((set, get) => {
  return {
    teamList: [],
    activeTeam: undefined,
    getTeamList: async (convex: ConvexReactClient, user: KindeUser) => {
      const result = await convex.query(api.teams.getTeams, {
        email: user?.email as string,
      });
      set({ teamList: result, activeTeam: result[0] });
    },
    setActiveTeam: (team: Team) => set({ activeTeam: team }),
  };
});

export const useDocumentStore = create<DocumentStore>((set) => ({
  editor: null,
  setEditor: (editor: any) => set({ editor }),
  saveDocument: (editor: any): Promise<any> => {
    return editor
      .save()
      .then((outputData: any) => {
        console.log("Article data: ", outputData);
        return outputData;
      })
      .catch((error: any) => {
        console.log("Saving failed: ", error);
      });
  },
}));
