export default function AuditBadge() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="#"
        className="block border-[3px] border-black bg-white p-4 hover:bg-gami-purple hover:text-white transition-colors group"
      >
        <div className="flex items-center gap-3">
          <img 
            src="/assets/generated/audit-badge.dim_64x64.png" 
            alt="Audit Badge" 
            className="w-12 h-12"
          />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider">SMART CONTRACTS</div>
            <div className="text-sm font-black uppercase">AUDITED ✓</div>
          </div>
        </div>
      </a>
    </div>
  );
}
