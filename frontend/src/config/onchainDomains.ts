export const ALLOWED_ONCHAIN_DOMAIN_TLDS = [
  'eth',
  'lens',
  'btc',
  'bitcoin',
  'x',
  'dao',
  'crypto',
  'nft',
  'bit',
  'sats',
  'wallet',
  'zil',
  'coin',
  'blockchain',
  '888',
  'base',
  'arb',
  'polygon',
  'sol',
  'tez',
  'near',
];

export const ACCEPTED_DOMAIN_LABEL = ALLOWED_ONCHAIN_DOMAIN_TLDS.map((tld) => `.${tld}`).join(' • ');

export function hasAllowedOnchainDomain(domain: string): boolean {
  const normalized = domain.trim().toLowerCase();
  if (!normalized.includes('.')) return false;
  const tld = normalized.split('.').pop() || '';
  return ALLOWED_ONCHAIN_DOMAIN_TLDS.includes(tld);
}
