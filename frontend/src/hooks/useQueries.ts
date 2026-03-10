import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type {
  ICOConfig,
  ICOProgress,
  SystemStatus,
  Document,
  KYCSubmission,
  UserProfile,
  PurchaseIntent,
  PurchaseIntentInput,
  WalletAccount,
  DepositReceipt,
  FixAllocationResult,
} from '../backend';

const isBrowser = typeof window !== 'undefined';
const LOCAL_KYC_KEY = 'gami_kyc_submission';
const LOCAL_PURCHASE_KEY = 'gami_purchase_intents';
const LOCAL_WALLET_KEY = 'gami_wallet_account';

const readLocalKYCSubmission = (): KYCSubmission | null => {
  if (!isBrowser) return null;
  const raw = window.localStorage.getItem(LOCAL_KYC_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.warn('Failed to parse stored KYC submission', error);
    return null;
  }
};

const persistLocalKYCSubmission = (submission: KYCSubmission): KYCSubmission => {
  if (!isBrowser) return submission;
  const enriched: KYCSubmission = {
    submittedAt: submission.submittedAt ?? Date.now(),
    status: submission.status ?? 'PENDING',
    ...submission,
  };
  window.localStorage.setItem(LOCAL_KYC_KEY, JSON.stringify(enriched));
  return enriched;
};

const readLocalPurchaseIntents = (): PurchaseIntent[] => {
  if (!isBrowser) return [];
  const raw = window.localStorage.getItem(LOCAL_PURCHASE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.warn('Failed to parse stored purchase intents', error);
    return [];
  }
};

const persistLocalPurchaseIntent = (payload: PurchaseIntentInput): PurchaseIntent => {
  if (!isBrowser) {
    return {
      ...payload,
      id: `${Date.now()}`,
      status: 'PENDING',
      createdAt: Date.now(),
    };
  }

  const intents = readLocalPurchaseIntents();
  const newIntent: PurchaseIntent = {
    ...payload,
    id:
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}`,
    status: 'PENDING',
    createdAt: Date.now(),
  };

  window.localStorage.setItem(LOCAL_PURCHASE_KEY, JSON.stringify([newIntent, ...intents]));
  return newIntent;
};

interface StoredWalletRecord {
  address: string;
  balance: string;
  createdAt: string;
}

const readLocalWalletAccount = (): WalletAccount | null => {
  if (!isBrowser) return null;
  const raw = window.localStorage.getItem(LOCAL_WALLET_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<StoredWalletRecord>;
    if (!parsed.address) return null;
    return {
      address: parsed.address,
      balance: parsed.balance ? BigInt(parsed.balance) : 0n,
      createdAt: parsed.createdAt ? BigInt(parsed.createdAt) : BigInt(Date.now()) * 1_000_000n,
    };
  } catch (error) {
    console.warn('Failed to parse stored wallet account', error);
    return null;
  }
};

const persistLocalWalletAccount = (wallet: WalletAccount): WalletAccount => {
  if (!isBrowser) return wallet;
  const payload: StoredWalletRecord = {
    address: wallet.address,
    balance: wallet.balance.toString(),
    createdAt: wallet.createdAt.toString(),
  };
  window.localStorage.setItem(LOCAL_WALLET_KEY, JSON.stringify(payload));
  return wallet;
};

const ensureLocalWalletAccount = (): WalletAccount => {
  const existing = readLocalWalletAccount();
  if (existing) return existing;
  const randomness =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}`;
  return persistLocalWalletAccount({
    address: `gami-${randomness.replace(/-/g, '').slice(0, 12)}`,
    balance: 0n,
    createdAt: BigInt(Date.now()) * 1_000_000n,
  });
};

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
    mutationFn: async ({
      name,
      email,
      domain,
    }: {
      name: string;
      email: string;
      domain: string;
    }) => {
      if (actor && actor.submitKYC) {
        return actor.submitKYC(name, email, domain);
      }

      return persistLocalKYCSubmission({
        name,
        email,
        domain,
        status: 'PENDING',
        submittedAt: Date.now(),
      });
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
      if (actor && actor.getCallerKYCStatus) {
        return actor.getCallerKYCStatus();
      }
      return readLocalKYCSubmission();
    },
    enabled: !isFetching,
    retry: false,
  });
}

export function useRecordPurchaseIntent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (intent: PurchaseIntentInput) => {
      if (actor && actor.recordPurchaseIntent) {
        return actor.recordPurchaseIntent(intent);
      }
      return persistLocalPurchaseIntent(intent);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchaseHistory'] });
    },
  });
}

export function useGetPurchaseHistory() {
  const { actor, isFetching } = useActor();

  return useQuery<PurchaseIntent[]>({
    queryKey: ['purchaseHistory'],
    queryFn: async () => {
      if (actor && actor.getCallerPurchaseHistory) {
        return actor.getCallerPurchaseHistory();
      }
      return readLocalPurchaseIntents();
    },
    enabled: !isFetching,
  });
}

export function useGetCallerWallet() {
  const { actor, isFetching } = useActor();

  return useQuery<WalletAccount | null>({
    queryKey: ['callerWallet'],
    queryFn: async () => {
      if (actor && actor.getCallerWallet) {
        return actor.getCallerWallet();
      }
      return readLocalWalletAccount();
    },
    enabled: !isFetching,
  });
}

export function useGenerateWallet() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (actor && actor.generateWallet) {
        return actor.generateWallet();
      }
      return ensureLocalWalletAccount();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['callerWallet'] });
    },
  });
}

export function useDeposit() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (amount: bigint): Promise<DepositReceipt> => {
      if (amount <= 0n) {
        throw new Error('Deposit amount must be positive');
      }

      if (actor && actor.deposit) {
        return actor.deposit(amount);
      }

      const wallet = ensureLocalWalletAccount();
      const updated: WalletAccount = {
        ...wallet,
        balance: wallet.balance + amount,
      };
      persistLocalWalletAccount(updated);

      return {
        id:
          typeof crypto !== 'undefined' && 'randomUUID' in crypto
            ? crypto.randomUUID()
            : `${Date.now()}`,
        amount,
        balance: updated.balance,
        timestamp: Date.now(),
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['callerWallet'] });
    },
  });
}

export function useFixAllocation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<FixAllocationResult> => {
      if (actor && actor.fixAllocation) {
        return actor.fixAllocation();
      }

      const wallet = ensureLocalWalletAccount();
      persistLocalWalletAccount(wallet);
      return {
        status: 'SYNCED',
        updatedAt: Date.now(),
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['callerWallet'] });
    },
  });
}
