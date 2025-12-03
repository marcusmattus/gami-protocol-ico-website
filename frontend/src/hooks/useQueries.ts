import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ICOConfig, ICOProgress, SystemStatus, Document, KYCSubmission, UserProfile } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetICOConfig() {
  const { actor, isFetching } = useActor();

  return useQuery<ICOConfig>({
    queryKey: ['icoConfig'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getICOConfig();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetICOProgress() {
  const { actor, isFetching } = useActor();

  return useQuery<ICOProgress>({
    queryKey: ['icoProgress'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getICOProgress();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

export function useGetSystemStatus() {
  const { actor, isFetching } = useActor();

  return useQuery<SystemStatus>({
    queryKey: ['systemStatus'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getSystemStatus();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 10000, // Refetch every 10 seconds
  });
}

export function useGetDocuments() {
  const { actor, isFetching } = useActor();

  return useQuery<Document[]>({
    queryKey: ['documents'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getDocuments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTotalSupply() {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['totalSupply'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getTotalSupply();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCirculatingSupply() {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['circulatingSupply'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCirculatingSupply();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitKYC() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, email }: { name: string; email: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitKYC(name, email);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kycStatus'] });
    },
  });
}

export function useGetCallerKYCStatus() {
  const { actor, isFetching } = useActor();

  return useQuery<KYCSubmission | null>({
    queryKey: ['kycStatus'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerKYCStatus();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}
