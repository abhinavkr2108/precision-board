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
