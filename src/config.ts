/**
 * Launch gate + site configuration.
 *
 * The site ships BEFORE the GAMI token contract is deployed. Until
 * VITE_GAMI_TOKEN_ADDRESS is set to a valid, non-zero Base mainnet address,
 * the site renders the pre-launch state: no buy UI, no contract links.
 */

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const ADDRESS_RE = /^0x[0-9a-fA-F]{40}$/;

/** Strict validation: 0x + 40 hex chars, and not the zero address. */
export function isValidTokenAddress(value: string | undefined): value is string {
  if (!value) return false;
  const v = value.trim();
  if (!ADDRESS_RE.test(v)) return false;
  if (v.toLowerCase() === ZERO_ADDRESS) return false;
  return true;
}

const rawTokenAddress = import.meta.env.VITE_GAMI_TOKEN_ADDRESS?.trim();

/** The validated GAMI token address, or null while pre-launch. */
export const TOKEN_ADDRESS: string | null = isValidTokenAddress(rawTokenAddress)
  ? rawTokenAddress
  : null;

/** True once a valid token address is configured — the site is "live". */
export const IS_LIVE = TOKEN_ADDRESS !== null;

export const PRIVY_APP_ID: string =
  import.meta.env.VITE_PRIVY_APP_ID?.trim() ?? "";

export const BASE_CHAIN_ID = 8453;

export const uniswapSwapUrl = (tokenAddress: string): string =>
  `https://app.uniswap.org/swap?chain=base&inputCurrency=NATIVE&outputCurrency=${tokenAddress}`;

export const basescanTokenUrl = (tokenAddress: string): string =>
  `https://basescan.org/token/${tokenAddress}`;

export const shortenAddress = (address: string): string =>
  `${address.slice(0, 6)}…${address.slice(-4)}`;

/**
 * Jurisdictions from which purchase is restricted. Shown in the jurisdiction
 * notice modal the first time a visitor starts the buy flow.
 */
export const RESTRICTED_JURISDICTIONS = [
  "United Kingdom (retail), unless FCA-compliant financial promotion rules are satisfied",
  "United States of America (including its territories)",
  "Any territory subject to comprehensive sanctions (including, without limitation, those administered by OFSI, OFAC, the UN or the EU)",
];
