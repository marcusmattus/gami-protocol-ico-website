const FAQS = [
  {
    q: "What is $GAMI for?",
    a: "$GAMI is the utility token of Gami Protocol, Base-native onchain loyalty and XP infrastructure. It is used inside the protocol to redeem rewards, unlock quests and power partner loyalty programs. It is not designed or offered as an investment.",
  },
  {
    q: "What are the token's properties?",
    a: "GAMI is a standard ERC-20 on Base mainnet with a fixed total supply of 1,000,000,000. The contract is immutable: there is no mint function, no pause switch and no blacklist. Protocol liquidity is locked for 4 years.",
  },
  {
    q: "Do I need a crypto wallet to take part?",
    a: "No. Sign in with your email and a secure embedded wallet on Base is created for you. You can also connect an existing wallet if you prefer.",
  },
  {
    q: "How do I pay by card?",
    a: "After signing in, choose \"Fund wallet\" and pay by card or bank on-ramp. The funds arrive as ETH on Base in your wallet, usually within a few minutes, and can then be swapped for $GAMI on Uniswap.",
  },
  {
    q: "How do I know I'm buying the real token?",
    a: "Only use the contract address published on this page once live, and always cross-check it against Gami's official channels before swapping. Anyone can create a token with the same name — the address is the only identifier that matters.",
  },
  {
    q: "Who can buy $GAMI?",
    a: "The purchase flow is not available to persons in restricted jurisdictions, including UK retail purchasers (unless FCA-compliant financial promotion rules are satisfied), persons in the United States, and anyone in sanctioned territories. You will be asked to confirm your eligibility before buying.",
  },
  {
    q: "Can I lose money?",
    a: "Yes. Tokens can lose all of their value, and digital asset markets are volatile and can be illiquid. Only use funds you can afford to lose entirely, and read the risk disclosure above before taking part.",
  },
] as const;

export function Faq() {
  return (
    <section id="faq">
      <div className="container">
        <span className="section-label">FAQ</span>
        <h2 className="section-title">Questions</h2>
        {FAQS.map((f) => (
          <details className="faq-item" key={f.q}>
            <summary>{f.q}</summary>
            <div className="faq-body">{f.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
