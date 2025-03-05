import {useMutation, useQuery, useQueryClient, useSuspenseQuery} from '@tanstack/react-query';
import { createPlugin, deletePlugin, fetchPlugins, updatePlugin } from '../api';
import { CreatePluginDTO, UpdatePluginDTO } from '../types';

export function usePlugins() {
    return useSuspenseQuery({
        queryKey: ['plugins'],
        queryFn: fetchPlugins,

    });
}

export function useCreatePlugin() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreatePluginDTO) => createPlugin(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['plugins'] });
        }
    });
}

export function useUpdatePlugin() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdatePluginDTO }) =>
            updatePlugin(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['plugins'] });
        }
    });
}

export function useDeletePlugin() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deletePlugin(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['plugins'] });
        }
    });
}