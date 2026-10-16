export function Header({ live }: { live: boolean }) {
  return (
    <header className="site-header">
      <div className="container">
        <a className="logo" href="#top">
          GAMI<span>_</span>PROTOCOL
        </a>
        <span className={`header-status mono ${live ? "" : "prelaunch"}`}>
          {live ? "LIVE ON BASE" : "LAUNCHING SOON"}
        </span>
      </div>
    </header>
  );
}
