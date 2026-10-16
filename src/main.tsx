import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrivyProvider } from "@privy-io/react-auth";
import { base } from "@privy-io/chains";
import App from "./App";
import { PRIVY_APP_ID } from "./config";
import "./styles.css";

function Root() {
  // Without a Privy app ID the site still renders fully (pre-launch state,
  // stats, FAQ, compliance) — the buy widget shows a configuration notice.
  if (!PRIVY_APP_ID) {
    return <App privyReady={false} />;
  }

  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        loginMethods: ["email", "wallet"],
        appearance: {
          theme: "dark",
          accentColor: "#6E3CFB",
        },
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets",
          },
        },
        defaultChain: base,
        supportedChains: [base],
      }}
    >
      <App privyReady={true} />
    </PrivyProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
