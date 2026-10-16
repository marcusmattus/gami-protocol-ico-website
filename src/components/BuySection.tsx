import { IS_LIVE, TOKEN_ADDRESS } from "../config";
import { BuyWidget } from "./BuyWidget";

function PreLaunchPanel() {
  return (
    <div className="prelaunch-panel">
      <span className="blink">▮ Launching soon</span>
      <h3>$GAMI is not live yet</h3>
      <p>
        The GAMI token has not been deployed. Any token claiming to be $GAMI
        right now is fake — the official contract address will be published
        here and on Gami's official channels at launch, and the buy flow will
        unlock on this page.
      </p>
      <a
        className="btn"
        href="https://gamiprotocol.io"
        target="_blank"
        rel="noopener noreferrer"
      >
        Join the waitlist
      </a>
      <p className="widget-note">
        $GAMI will be a utility token for the Gami loyalty ecosystem. Tokens
        can lose all of their value. Nothing on this page is investment advice.
      </p>
    </div>
  );
}

function MissingPrivyConfig() {
  return (
    <div className="prelaunch-panel">
      <h3>Buy flow unavailable</h3>
      <p>
        This deployment is missing its <code>VITE_PRIVY_APP_ID</code>{" "}
        configuration, so sign-in and card funding are disabled. You can still
        swap on Uniswap with your own wallet via the contract address published
        on Gami's official channels.
      </p>
    </div>
  );
}

export function BuySection({ privyReady }: { privyReady: boolean }) {
  return (
    <section id="buy">
      <div className="container">
        <span className="section-label">
          {IS_LIVE ? "Buy" : "Pre-launch"}
        </span>
        <h2 className="section-title">
          {IS_LIVE ? "Get $GAMI on Base" : "Launch pending"}
        </h2>
        {!IS_LIVE || TOKEN_ADDRESS === null ? (
          <PreLaunchPanel />
        ) : privyReady ? (
          <BuyWidget tokenAddress={TOKEN_ADDRESS} />
        ) : (
          <MissingPrivyConfig />
        )}
      </div>
    </section>
  );
}
