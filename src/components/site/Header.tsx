import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { MapPin, Menu, X, ArrowLeft } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { MySacMenu } from "./MySacMenu";

const nav = [
  { label: "Events", to: "/events" },
  { label: "News", to: "/news" },
  { label: "Sports", to: "/sports" },
  { label: "Arts", to: "/arts" },
  { label: "Gaming", to: "/gaming" },
  { label: "Community", to: "/athletes" },
] as const;

const desktopNav = [{ label: "Explore", to: "/explore" }, ...nav] as const;

// Same colour the Explore avatar derives for "you", kept local so the header does not pull in Explore code.
const YOU_HUE = [..."you"].reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) % 360, 7);

export function Header() {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHero = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [acct, setAcct] = useState(false);
  const closeAcct = useCallback(() => setAcct(false), []);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { setOpen(false); setAcct(false); }, [pathname]);

  const solid = scrolled || !onHero;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,height,box-shadow,color] duration-500 ease-out",
          solid
            ? "h-14 bg-background/95 text-foreground shadow-[0_1px_0_var(--color-border)] backdrop-blur-md"
            : "h-20 bg-transparent text-ink-foreground",
        )}
      >
        <div className="mx-auto flex h-full max-w-[1480px] items-center gap-2 px-4 sm:gap-6 md:px-8">
          {!onHero && (
            <button
              aria-label="Go back"
              onClick={() => {
                // Opened a community profile directly (no history): go to Community instead of doing nothing.
                if (pathname.startsWith("/community/") && window.history.length <= 1) void router.navigate({ to: "/athletes" });
                else router.history.back();
              }}
              className="-ml-2 grid h-10 w-10 shrink-0 place-items-center opacity-85 transition-opacity hover:opacity-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <Link to="/" className="shrink-0 whitespace-nowrap font-display text-base tracking-wide min-[360px]:text-lg sm:text-xl md:text-2xl">
            SAC <span className="text-primary">COMMUNITY</span>
          </Link>
          <div className="ml-auto flex items-center gap-1 md:gap-3">
            <button aria-label="Location" className="hidden h-10 md:flex items-center gap-1.5 px-2 text-[13px] font-semibold opacity-85 hover:opacity-100">
              <MapPin className="h-[18px] w-[18px]" />
              <span>All India</span>
            </button>
            {(["mobile", "desktop"] as const).map((kind) => {
              const avatar = (
                <span
                  aria-hidden
                  className={cn(
                    "grid h-8 w-8 place-items-center rounded-full text-[13px] font-bold text-white transition-shadow",
                    solid ? "ring-1 ring-foreground/15" : "ring-1 ring-white",
                  )}
                  style={{ background: `oklch(0.5 0.14 ${YOU_HUE})` }}
                >
                  Y
                </span>
              );
              return kind === "mobile" ? (
                <Link key={kind} to="/my-sac" aria-label="My SAC" className="grid h-10 w-10 shrink-0 place-items-center md:hidden">
                  {avatar}
                </Link>
              ) : (
                <button
                  key={kind}
                  data-mysac-trigger
                  aria-label="My SAC"
                  aria-expanded={acct}
                  onClick={() => { setOpen(false); setAcct((a) => !a); }}
                  className="hidden h-10 w-10 shrink-0 place-items-center md:grid"
                >
                  {avatar}
                </button>
              );
            })}
            <Link
              to="/list-event"
              className="hidden bg-primary px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-primary-foreground transition-transform hover:-translate-y-0.5 md:inline-block"
            >
              List an event
            </Link>
            <button aria-label="Menu" onClick={() => setOpen((o) => !o)} className="grid h-10 w-10 place-items-center opacity-85 transition-opacity hover:opacity-100">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {open && <button aria-label="Close menu" onClick={() => setOpen(false)} className="fixed inset-0 z-40 cursor-default bg-ink/40" />}
      <div
        className={cn(
          "fixed right-3 top-[3.75rem] z-[45] w-[85vw] max-w-[360px] border border-ink-border bg-ink text-ink-foreground shadow-2xl transition-[opacity,visibility,transform] duration-300 lg:w-72",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
          !solid && "top-[5.25rem]",
        )}
      >
        <nav className="flex max-h-[calc(100dvh-6rem)] flex-col gap-1 overflow-y-auto p-5 lg:gap-0.5 lg:px-4 lg:py-3">
          {desktopNav.map((n, i) => (
            <Link key={n.label} to={n.to} className="py-1 font-display text-[26px] transition-colors hover:text-primary md:text-[30px] lg:py-1.5 lg:font-sans lg:text-[13px] lg:font-semibold lg:normal-case lg:tracking-[0.12em]" style={{ transitionDelay: `${i * 30}ms` }}>
              {n.label}
            </Link>
          ))}
          <a href="/about" className="py-1 font-display text-[26px] transition-colors hover:text-primary md:text-[30px] lg:py-1.5 lg:font-sans lg:text-[13px] lg:font-semibold lg:normal-case lg:tracking-[0.12em]">
            About
          </a>
          <Link to="/list-event" className="mt-4 self-start bg-primary px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground lg:hidden">
            List an event
          </Link>
        </nav>
      </div>

      <MySacMenu open={acct} onClose={closeAcct} hue={YOU_HUE} top={solid ? "3.75rem" : "5.25rem"} />
    </>
  );
}
