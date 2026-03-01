const ITEMS = [
  "LINUX", "DOCKER", "REACT", "PYTHON",
  "NGINX", "PROXMOX", "TYPESCRIPT", "N8N",
  "ASTRO", "TAILSCALE", "BASH", "GIT",
];

const text = ITEMS.map((i) => `${i} ·`).join("  ") + "  ";

export default function MarqueeTicker() {
  return (
    <div className="overflow-hidden bg-[hsl(var(--surface))] border-y border-[hsl(var(--border))] py-3 select-none">
      <div className="marquee-track" aria-hidden="true">
        {/* Two copies so the scroll loops seamlessly */}
        <span className="text-xs font-mono text-muted px-8 whitespace-nowrap">{text}</span>
        <span className="text-xs font-mono text-muted px-8 whitespace-nowrap">{text}</span>
      </div>
    </div>
  );
}
