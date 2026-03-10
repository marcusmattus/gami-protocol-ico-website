// Type definitions for backend
// TODO: Update with actual backend types

export interface UserProfile {
  name: string;
  email: string;
  walletAddress?: string;
}

export interface ICOConfig {
  startTime: bigint;
  endTime: bigint;
  hardCap: bigint;
  softCap: bigint;
  tokenPrice: bigint;
}

export interface ICOProgress {
  raised: bigint;
  participants: bigint;
  progress: number;
}

export interface SystemStatus {
  active: boolean;
  xpRate: number;
  message: string;
}

export interface Document {
  title: string;
  url: string;
  size: string;
  type: string;
}

export interface KYCSubmission {
  name: string;
  email: string;
  domain?: string;
  status: 'pending' | 'approved' | 'rejected' | 'PENDING' | 'APPROVED' | 'REJECTED';
  submittedAt: number | bigint;
}

export type StablecoinSymbol = 'USDC' | 'USDT';

export interface PurchaseIntentInput {
  wallet: string;
  email: string;
  domain: string;
  stablecoin: StablecoinSymbol;
  amount: number;
  estimatedGami: number;
  referralCode?: string;
}

export interface PurchaseIntent extends PurchaseIntentInput {
  id: string;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED';
  createdAt: number;
}

export interface WalletAccount {
  address: string;
  balance: bigint;
  createdAt: bigint;
}

export interface DepositReceipt {
  id: string;
  amount: bigint;
  balance: bigint;
  timestamp: number;
}

export interface FixAllocationResult {
  status: 'SYNCED' | 'NOOP';
  updatedAt: number;
}
