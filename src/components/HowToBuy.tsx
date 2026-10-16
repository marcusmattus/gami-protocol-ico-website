const STEPS = [
  {
    n: "01",
    title: "Sign in",
    body: "Sign in with your email or connect an existing wallet. If you don't have a wallet, a secure embedded wallet on Base is created for you automatically.",
  },
  {
    n: "02",
    title: "Fund with card",
    body: "Top up your wallet with ETH on Base by card or bank on-ramp, directly inside the flow. Funds usually arrive within a few minutes.",
  },
  {
    n: "03",
    title: "Swap to GAMI",
    body: "Swap your ETH for $GAMI on Uniswap (Base). Always verify the contract address against Gami's official channels before swapping.",
  },
] as const;

export function HowToBuy() {
  return (
    <section id="how-to-buy">
      <div className="container">
        <span className="section-label">How to get $GAMI</span>
        <h2 className="section-title">Three steps. No bridge required.</h2>
        <div className="steps-grid">
          {STEPS.map((s) => (
            <div className="card" key={s.n}>
              <span className="step-number">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
