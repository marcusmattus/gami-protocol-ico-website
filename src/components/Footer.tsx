import { IS_LIVE, TOKEN_ADDRESS, basescanTokenUrl } from "../config";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-links">
          <a href="#risk">Risk disclosure</a>
          <a href="#faq">FAQ</a>
          <a
            href="https://gamiprotocol.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            gamiprotocol.io
          </a>
          {IS_LIVE && TOKEN_ADDRESS && (
            <a
              href={basescanTokenUrl(TOKEN_ADDRESS)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Contract on BaseScan
            </a>
          )}
        </div>
        <p className="disclaimer">
          Disclaimer: $GAMI is a utility token intended for use within Gami
          Protocol. Nothing on this website constitutes investment advice, a
          recommendation, an offer of securities, or a financial promotion.
          Tokens can lose all of their value; never use funds you cannot
          afford to lose entirely. Cryptoasset purchases are generally
          unregulated and not protected by compensation schemes. The purchase
          flow is not available in restricted jurisdictions, including to UK
          retail purchasers (unless FCA-compliant financial promotion rules
          are satisfied), persons in the United States, and persons in
          sanctioned territories. Always verify the token contract address
          against Gami's official channels before transacting.
        </p>
        <p className="copyright mono">
          © {new Date().getFullYear()} GAMI PROTOCOL — BUILT ON BASE
        </p>
      </div>
    </footer>
  );
}
