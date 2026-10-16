import { useCallback, useRef, useState } from "react";
import { useFundWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import { base } from "@privy-io/chains";
import {
  basescanTokenUrl,
  shortenAddress,
  uniswapSwapUrl,
} from "../config";
import { JurisdictionModal } from "./JurisdictionModal";

const JURISDICTION_KEY = "gami.jurisdiction.accepted.v1";

/** Optional convenience only — acceptance is held in React state. */
function readStoredAcceptance(): boolean {
  try {
    return window.localStorage.getItem(JURISDICTION_KEY) === "true";
  } catch {
    return false;
  }
}

function storeAcceptance(): void {
  try {
    window.localStorage.setItem(JURISDICTION_KEY, "true");
  } catch {
    // localStorage unavailable (private mode, blocked storage) — fine,
    // acceptance for this session lives in React state.
  }
}

export function BuyWidget({ tokenAddress }: { tokenAddress: string }) {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const { wallets } = useWallets();
  const { fundWallet } = useFundWallet();

  // Jurisdiction acceptance is a React state variable (not a localStorage
  // dependency); localStorage only pre-seeds it as a convenience.
  const [jurisdictionAccepted, setJurisdictionAccepted] =
    useState<boolean>(readStoredAcceptance);
  const [modalOpen, setModalOpen] = useState(false);
  const pendingAction = useRef<(() => void) | null>(null);

  const [fundError, setFundError] = useState<string | null>(null);
  const [funding, setFunding] = useState(false);

  const embeddedWallet = wallets.find(
    (w) => w.walletClientType === "privy" || w.walletClientType === "privy-v2",
  );
  const walletAddress = embeddedWallet?.address ?? user?.wallet?.address ?? null;

  /** Gate any buy interaction behind the jurisdiction notice (first time). */
  const gated = useCallback(
    (action: () => void) => {
      if (jurisdictionAccepted) {
        action();
        return;
      }
      pendingAction.current = action;
      setModalOpen(true);
    },
    [jurisdictionAccepted],
  );

  const onModalConfirm = () => {
    setJurisdictionAccepted(true);
    storeAcceptance();
    setModalOpen(false);
    const action = pendingAction.current;
    pendingAction.current = null;
    action?.();
  };

  const onModalCancel = () => {
    pendingAction.current = null;
    setModalOpen(false);
  };

  const handleSignIn = () => gated(() => login());

  const handleFund = () =>
    gated(() => {
      if (!walletAddress) return;
      setFundError(null);
      setFunding(true);
      // Privy funding flow: card / exchange / external wallet on Base.
      fundWallet(walletAddress, {
        chain: base,
        defaultFundingMethod: "card",
      })
        .catch((err: unknown) => {
          setFundError(
            err instanceof Error
              ? err.message
              : "Funding flow could not be started. Please try again.",
          );
        })
        .finally(() => setFunding(false));
    });

  const swapUrl = uniswapSwapUrl(tokenAddress);

  const handleSwapClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!jurisdictionAccepted) {
      e.preventDefault();
      gated(() => {
        window.open(swapUrl, "_blank", "noopener,noreferrer");
      });
    }
  };

  return (
    <div className="buy-widget" id="buy-widget">
      <h3>Get $GAMI</h3>

      {/* Step 1 — sign in */}
      <div className={`flow-step ${!authenticated ? "active" : ""}`}>
        <div className="step-head">
          <span className="step-tag">01</span>
          <h4>Sign in</h4>
        </div>
        {!ready ? (
          <p>Loading…</p>
        ) : authenticated ? (
          <>
            <p>
              Signed in
              {user?.email?.address ? ` as ${user.email.address}` : ""}. Your
              wallet on Base:
            </p>
            {walletAddress ? (
              <div className="wallet-row" title={walletAddress}>
                {shortenAddress(walletAddress)}
              </div>
            ) : (
              <p>Preparing your embedded wallet…</p>
            )}
            <button className="btn secondary" onClick={() => logout()}>
              Sign out
            </button>
          </>
        ) : (
          <>
            <p>
              Use your email or an existing wallet. New users get a secure
              embedded wallet on Base automatically.
            </p>
            <button className="btn full" onClick={handleSignIn}>
              Connect / Sign in
            </button>
          </>
        )}
      </div>

      {/* Step 2 — fund */}
      <div
        className={`flow-step ${authenticated && walletAddress ? "active" : ""}`}
      >
        <div className="step-head">
          <span className="step-tag">02</span>
          <h4>Fund with card</h4>
        </div>
        <p>
          Top up ETH on Base by card or on-ramp. Funds can take a few minutes
          to arrive after a successful payment.
        </p>
        <button
          className="btn full"
          onClick={handleFund}
          disabled={!authenticated || !walletAddress || funding}
        >
          {funding ? "Opening funding…" : "Fund wallet"}
        </button>
        {fundError && <div className="error-text">{fundError}</div>}
      </div>

      {/* Step 3 — swap */}
      <div className="flow-step">
        <div className="step-head">
          <span className="step-tag">03</span>
          <h4>Swap to GAMI</h4>
        </div>
        <p>Swap ETH for $GAMI on Uniswap (Base network).</p>
        <a
          className="btn success full"
          href={swapUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleSwapClick}
        >
          Swap to GAMI on Uniswap
        </a>
      </div>

      <div className="contract-line">
        Contract:{" "}
        <a href={basescanTokenUrl(tokenAddress)} target="_blank" rel="noopener noreferrer">
          {tokenAddress}
        </a>{" "}
        (BaseScan)
      </div>

      <div className="caution">
        Caution: always verify the contract address above against Gami's
        official channels before swapping. Scammers deploy fake tokens with
        similar names.
      </div>

      <p className="widget-note">
        $GAMI is a utility token. Tokens can lose all of their value. Nothing
        on this page is investment advice.
      </p>

      {modalOpen && (
        <JurisdictionModal onConfirm={onModalConfirm} onCancel={onModalCancel} />
      )}
    </div>
  );
}
