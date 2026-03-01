import { SiLinux, SiDocker, SiNginx, SiTypescript, SiReact, SiAstro, SiNodedotjs, SiGit, SiN8N } from "react-icons/si";
import { FiServer, FiShield, FiLink2 } from "react-icons/fi";
import type { IconType } from "react-icons";

interface TechItem {
  icon: IconType;
  name: string;
}

const ROW_1: TechItem[] = [
  { icon: SiLinux,      name: "Linux"      },
  { icon: SiDocker,     name: "Docker"     },
  { icon: FiServer,     name: "Proxmox"    },
  { icon: SiNginx,      name: "Nginx"      },
  { icon: FiShield,     name: "Caddy"      },
  { icon: FiLink2,      name: "Tailscale"  },
];

const ROW_2: TechItem[] = [
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiReact,      name: "React"      },
  { icon: SiAstro,      name: "Astro"      },
  { icon: SiNodedotjs,  name: "Node.js"    },
  { icon: SiN8N,        name: "n8n"        },
  { icon: SiGit,        name: "Git"        },
];

function MarqueeRow({ items, reverse = false }: { items: TechItem[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className="marquee-track"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {doubled.map((item, i) => {
          const Icon = item.icon;
          return (
            <span
              key={i}
              className="inline-flex items-center gap-2 px-6 text-xs font-mono text-muted select-none shrink-0"
            >
              <Icon size={16} aria-hidden />
              {item.name}
              <span className="text-faint ml-4">·</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <div className="border-t border-b border-[hsl(var(--border))] py-8 overflow-hidden">
      <div className="flex flex-col gap-5">
        <MarqueeRow items={ROW_1} />
        <MarqueeRow items={ROW_2} reverse />
      </div>
    </div>
  );
}
