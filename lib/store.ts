import { create } from 'zustand';
import { TimelogEntry } from '@/types';

type TimelogStore = {
  timelogs: TimelogEntry[];
  setTimelogs: (timelogs: TimelogEntry[]) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

export const useTimelogStore = create<TimelogStore>((set) => ({
  timelogs: [],
  sidebarOpen: false,
  setTimelogs: (timelogs) => {
    set({ timelogs });
    if (timelogs.length > 0) {
      set({ sidebarOpen: true });
    }
  },
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));