import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTimelogs, batchCreateTimeLog, updateTimelog, deleteTimelog } from '../api';
import {Timelog, TimelogUpdateInput} from "@/features/timelog";

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

export function useBatchCreateTimelog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: batchCreateTimeLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TIMELOGS_QUERY_KEY });
    },
  });
}

export function useUpdateTimelog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TimelogUpdateInput }) =>
      updateTimelog(id, data),
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