"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Facebook,
  Github,
  Home,
  Images,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Send,
  User,
  FileText,
  Layers,
} from "lucide-react";

import { useActiveSection } from "@/hooks/use-active-section";
import { SITE } from "@/lib/site-content";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const SECTION_ORDER = [
  "hero",
  "about",
  "stats",
  "skills",
  "resume",
  "portfolio",
  "services",
  "testimonials",
  "contact",
] as const;

const NAV_MAIN = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "resume", label: "Resume", icon: FileText },
  { id: "portfolio", label: "Portfolio", icon: Images },
  { id: "services", label: "Services", icon: Layers },
  { id: "contact", label: "Contact", icon: Mail },
] as const;

const SOCIAL_NAV = [
  { key: "linkedin" as const, label: "LinkedIn", icon: Linkedin },
  { key: "whatsapp" as const, label: "WhatsApp", icon: MessageCircle },
  /*{ key: "github" as const, label: "GitHub", icon: Github },*/
  { key: "telegram" as const, label: "Telegram", icon: Send },
  { key: "facebook" as const, label: "Facebook", icon: Facebook },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function NavLink({
  id,
  label,
  icon: Icon,
  active,
  onNavigate,
}: {
  id: string;
  label: string;
  icon: typeof Home;
  active: boolean;
  onNavigate?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        scrollToId(id);
        onNavigate?.();
      }}
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-primary/15 text-primary"
          : "text-slate-300 hover:bg-white/5 hover:text-white"
      )}
    >
      <Icon className="h-5 w-5 shrink-0 opacity-90" aria-hidden />
      {label}
    </button>
  );
}

function SidebarInner({ onNavigate }: { onNavigate?: () => void }) {
  const activeId = useActiveSection([...SECTION_ORDER]);

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto px-4 pb-8 pt-6">
      <div className="flex flex-col items-center gap-3">
        <div className="relative h-28 w-28 overflow-hidden rounded-full ring-2 ring-primary/50">
          <Image
            src={SITE.profileImage}
            alt=""
            fill
            className="object-cover"
            sizes="112px"
          />
        </div>
        <Link
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("hero");
            onNavigate?.();
          }}
          className="font-display text-center text-2xl font-semibold text-white hover:text-primary"
        >
          {SITE.name}
        </Link>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {SOCIAL_NAV.map(({ key, label, icon: Icon }) => (
          <a
            key={key}
            href={SITE.social[key]}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-300 hover:bg-primary hover:text-white"
            aria-label={label}
          >
            <Icon className="h-4 w-4" aria-hidden />
          </a>
        ))}
      </div>

      <Separator className="bg-white/10" />

      <nav className="flex flex-col gap-1">
        {NAV_MAIN.map((item) => (
          <NavLink
            key={item.id}
            {...item}
            active={activeId === item.id}
            onNavigate={onNavigate}
          />
        ))}

        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
            >
              <span className="flex items-center gap-3">
                <Menu className="h-5 w-5" />
                Dropdown
              </span>
              <ChevronDown className="h-4 w-4 opacity-70" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52" side="right" align="start">
            <DropdownMenuItem onClick={() => onNavigate?.()}>Dropdown 1</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Deep Dropdown</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {[1, 2, 3, 4, 5].map((n) => (
                  <DropdownMenuItem key={n}>Deep Dropdown {n}</DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            {[2, 3, 4].map((n) => (
              <DropdownMenuItem key={n}>Dropdown {n}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
         */}
      </nav>
    </div>
  );
}

export function SiteSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <aside
        className="fixed inset-y-0 left-0 z-40 hidden w-[300px] flex-col bg-[#040b14] shadow-xl lg:flex"
        aria-label="Primary"
      >
        <SidebarInner />
      </aside>

      <div className="fixed left-0 right-0 top-0 z-30 flex h-14 items-center justify-between border-b border-white/10 bg-[#040b14] px-4 lg:hidden">
        <span className="font-display font-semibold text-white">{SITE.name}</span>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] border-white/10 bg-[#040b14] p-0 text-white">
            <SidebarInner onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
