import { useState } from "react";
import { RESTRICTED_JURISDICTIONS } from "../config";

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Jurisdiction notice shown on the first "Buy" interaction. The visitor must
 * confirm they are not purchasing from a restricted jurisdiction before the
 * buy flow proceeds. Acceptance lives in React state (see BuyWidget);
 * localStorage is only an optional convenience there, wrapped in try/catch.
 */
export function JurisdictionModal({ onConfirm, onCancel }: Props) {
  const [checked, setChecked] = useState(false);

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="jurisdiction-title"
    >
      <div className="modal">
        <h3 id="jurisdiction-title">Jurisdiction notice</h3>
        <p>
          $GAMI is a utility token for use within Gami Protocol. It is not
          offered as an investment and nothing on this site is investment
          advice or a financial promotion. Access to the purchase flow is not
          available to persons located or resident in, or purchasing from, the
          following restricted jurisdictions:
        </p>
        <ul>
          {RESTRICTED_JURISDICTIONS.map((j) => (
            <li key={j}>{j}</li>
          ))}
        </ul>
        <p>
          By continuing you confirm that you are not located or resident in,
          and are not purchasing from, any restricted jurisdiction, and that
          you have read the risk disclosure on this page. Tokens can lose all
          of their value.
        </p>
        <label className="check-row">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <span>
            I confirm I am not purchasing from a restricted jurisdiction and I
            accept the risk disclosure.
          </span>
        </label>
        <div className="modal-actions">
          <button className="btn" disabled={!checked} onClick={onConfirm}>
            Confirm &amp; continue
          </button>
          <button className="btn secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
