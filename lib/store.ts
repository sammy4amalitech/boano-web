import { create } from 'zustand';
import {TimeLogAgentResponse} from "@/lib/schemas";

type TimelogStore = {
  timelogs: TimeLogAgentResponse[];
  setTimelogs: (timelogs: TimeLogAgentResponse[]) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

export const useTimelogStore = create<TimelogStore>((set) => ({
  timelogs: [],
  sidebarOpen: false,
  setTimelogs: (timelogs) => {
    console.log('Setting timelogs:', timelogs);
    set({ timelogs });
    if (timelogs.length > 0) {
      set({ sidebarOpen: true });
    }
  },
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));