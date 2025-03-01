import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {fetchTimelogs, batchUpsertTimeLog, deleteTimelog, batchUpdateTimelog} from '../api';
import { TimelogUpdateInput} from "@/features/timelog";

export const TIMELOGS_QUERY_KEY = ['timelogs'] as const;

export function useTimelogs() {
  return useQuery({
    queryKey: TIMELOGS_QUERY_KEY,
    queryFn: async () => {
      const data = await fetchTimelogs();
      return data.data
    },
  });
}

export function useBatchUpsertTimeLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: batchUpsertTimeLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TIMELOGS_QUERY_KEY });
    },
  });
}

export function useBatchUpdateTimelog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({data }: { data: TimelogUpdateInput[] }) =>
      batchUpdateTimelog( data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TIMELOGS_QUERY_KEY });
    },
  });
}

export function useDeleteTimelog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTimelog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TIMELOGS_QUERY_KEY });
    },
  });
}