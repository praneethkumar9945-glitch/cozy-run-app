import { useNavigate } from "@tanstack/react-router";
import { Search, Building2, CalendarDays, ChevronDown, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { cities } from "@/lib/data";

export function SearchBar() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <div className="search-glow w-full max-w-[1100px] rounded-3xl p-[2px] text-foreground md:rounded-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/events", search: { q: q || undefined, city: city || undefined } });
        }}
        className="grid grid-cols-2 overflow-hidden rounded-[22px] bg-background md:grid-cols-[minmax(0,1.4fr)_minmax(150px,1fr)_minmax(150px,1fr)_auto] md:rounded-full lg:grid-cols-[2fr_1fr_1fr_auto]"
      >
        <div className={`col-span-2 flex items-center gap-2.5 pl-3.5 pr-1 py-0.5 sm:gap-3 sm:border-b sm:px-5 sm:py-3 md:col-span-1 md:border-b-0 md:border-r md:py-2 md:pl-6 ${open ? "border-b" : ""}`}>
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search events, artists, sports..." aria-label="Search" className="h-8 w-full min-w-0 truncate bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground sm:h-auto" />
          {/* Mobile-only filter icon */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="search-filters"
            aria-label={open ? "Hide filters" : "Show filters"}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors sm:hidden ${open ? "text-primary" : "text-muted-foreground"}`}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Collapsible on mobile; transparent wrapper (display: contents) from sm up */}
        <div
          id="search-filters"
          className={`col-span-2 grid transition-[grid-template-rows] duration-300 ease-out sm:contents ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        >
          <div className="min-h-0 overflow-hidden sm:contents">
            <div className="grid grid-cols-1 sm:contents">
              <label className="relative flex items-center gap-2 border-b px-4 py-2 sm:border-r sm:px-4 sm:py-3 md:border-b-0 md:py-2">
                <Building2 className="h-4 w-4 shrink-0 text-muted-foreground" />
                <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full min-w-0 appearance-none bg-transparent pr-5 text-sm font-semibold outline-none">
                  <option value="">Select city</option>
                  {cities.map((c) => <option key={c}>{c}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 h-4 w-4 text-muted-foreground sm:right-3" />
              </label>
              <label className="flex items-center gap-2 border-b px-4 py-2 sm:border-b sm:px-4 sm:py-3 md:col-span-1 md:border-b-0 md:border-r md:py-2">
                <CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} aria-label="Date" className="w-full min-w-0 bg-transparent text-sm font-semibold outline-none" />
              </label>
              <button type="submit" className="bg-primary px-8 py-2 text-[12px] sm:col-span-2 md:col-span-1 font-bold uppercase tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90 sm:py-3 md:col-span-1 md:py-2">
                Search
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
