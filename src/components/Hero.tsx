export function Hero({ live }: { live: boolean }) {
  return (
    <section className="hero" id="top">
      <div className="container">
        <h1>
          Gami
          <br />
          Protocol<span className="tick">.</span>
        </h1>
        <p className="tagline">
          Onchain loyalty and XP infrastructure, native to Base. $GAMI is the
          utility token that powers quests, rewards and loyalty programs across
          the protocol.
        </p>
        <p className="subline">
          Hold and use $GAMI to redeem rewards, unlock quests and participate
          in the Gami loyalty ecosystem. $GAMI is a utility token for use
          within the protocol — it is not an investment, a share, or a claim on
          any revenue.
        </p>
        <div className="hero-ctas">
          {live ? (
            <>
              <a className="btn" href="#buy">
                Get $GAMI
              </a>
              <a className="btn secondary" href="#how-to-buy">
                How it works
              </a>
            </>
          ) : (
            <>
              <a className="btn" href="#buy">
                Join the waitlist
              </a>
              <a className="btn secondary" href="#how-to-buy">
                How it will work
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
