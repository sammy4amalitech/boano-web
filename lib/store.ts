import { create } from 'zustand';
import { TimelogEntry } from '@/types';

type TimelogStore = {
  timelogs: TimelogEntry[];
  setTimelogs: (timelogs: TimelogEntry[]) => void;
};

export const useTimelogStore = create<TimelogStore>((set) => ({
  timelogs: [],
  setTimelogs: (timelogs) => set({ timelogs }),
}));