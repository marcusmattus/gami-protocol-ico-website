const STATS = [
  { value: "1,000,000,000", label: "Fixed total supply" },
  { value: "BASE / 8453", label: "Network" },
  { value: "IMMUTABLE", label: "No mint · no pause · no blacklist" },
  { value: "4 YEARS", label: "LP locked" },
] as const;

export function TokenStats() {
  return (
    <section className="stats-strip" aria-label="Token stats">
      <div className="container" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <div className="stats-grid">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <span className="value">{s.value}</span>
              <span className="label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
