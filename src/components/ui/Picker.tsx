import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

export type PickerOption = { value: string; label: string; hint?: string; icon?: ReactNode };
export type PickerGroup = { label?: string; options: PickerOption[] };

type PickerProps = {
  label: string;
  value: string;
  groups: PickerGroup[];
  onChange: (value: string) => void;
  /** Called on any interaction that opens or uses the picker. */
  onInteract?: () => void;
  className?: string;
  children: ReactNode;
};

type Place = { top: number; left: number; width: number; origin: string };

const MENU_WIDTH = 288;

/**
 * Inline listbox for the hero sentence. The menu renders in a portal (the hero
 * field clips its overflow) and is anchored under its trigger, flipping to the
 * right edge when there is no room. Keyboard: arrows, Home/End, Enter/Space,
 * Escape and Tab. Opening animates from the trigger; closing is instant.
 */
export function Picker({ label, value, groups, onChange, onInteract, className = "", children }: PickerProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [place, setPlace] = useState<Place | null>(null);
  const button = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const id = useId();
  const options = groups.flatMap((g) => g.options);
  const selectedIndex = Math.max(0, options.findIndex((o) => o.value === value));

  const close = useCallback(() => {
    setOpen(false);
    setPlace(null);
  }, []);

  const measure = useCallback(() => {
    const b = button.current;
    if (!b) return;
    const r = b.getBoundingClientRect();
    const width = Math.min(MENU_WIDTH, window.innerWidth - 24);
    const fitsLeft = r.left + width <= window.innerWidth - 12;
    const left = fitsLeft ? r.left : Math.max(12, r.right - width);
    setPlace({ top: r.bottom + 8, left, width, origin: fitsLeft ? "top left" : "top right" });
  }, []);

  useLayoutEffect(() => {
    if (open) measure();
  }, [open, measure]);

  // The list mounts once it has a position; move focus into it then.
  const placed = place !== null;
  useEffect(() => {
    if (open && placed) list.current?.focus({ preventScroll: true });
  }, [open, placed]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!button.current?.contains(t) && !list.current?.contains(t)) close();
    };
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [open, measure, close]);

  function openMenu() {
    onInteract?.();
    setActive(selectedIndex);
    setOpen(true);
  }

  function choose(i: number) {
    onChange(options[i].value);
    close();
    button.current?.focus();
  }

  function onListKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(options.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(options.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(active);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
      button.current?.focus();
    } else if (e.key === "Tab") {
      close();
    }
  }

  const offsets = groups.map((_, gi) => groups.slice(0, gi).reduce((n, g) => n + g.options.length, 0));
  return (
    <>
      <button
        ref={button}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        aria-label={`${label}: ${options[selectedIndex]?.label ?? ""}`}
        onClick={() => (open ? close() : openMenu())}
        onFocus={onInteract}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            openMenu();
          }
        }}
        className={className}
      >
        {children}
      </button>
      {open &&
        place &&
        createPortal(
          <ul
            ref={list}
            id={id}
            role="listbox"
            tabIndex={-1}
            aria-label={label}
            aria-activedescendant={`${id}-${active}`}
            onKeyDown={onListKey}
            style={{ top: place.top, left: place.left, width: place.width, transformOrigin: place.origin }}
            className="picker-menu fixed z-[60] max-h-[min(26rem,calc(100vh-6rem))] overflow-auto rounded-2xl bg-white p-1.5 text-left font-sans text-ink shadow-[0_24px_48px_-20px_rgb(19_35_32/0.45)] ring-1 ring-line outline-none"
          >
            {groups.map((group, gi) => (
              <li key={gi} role="presentation" className={gi > 0 ? "mt-1 border-t border-line pt-1" : ""}>
                {group.label && (
                  <p className="px-3 pb-1 pt-2 text-[12px] font-semibold text-muted" aria-hidden="true">
                    {group.label}
                  </p>
                )}
                <ul role="group" aria-label={group.label}>
                  {group.options.map((o, oi) => {
                    const i = offsets[gi] + oi;
                    const selected = o.value === value;
                    return (
                      <li
                        key={o.value}
                        id={`${id}-${i}`}
                        role="option"
                        aria-selected={selected}
                        onPointerEnter={() => setActive(i)}
                        onClick={() => choose(i)}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] ${
                          i === active ? "bg-green-soft" : ""
                        }`}
                      >
                        {o.icon && (
                          <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${selected ? "bg-green text-mist" : "bg-mist text-green"}`}>
                            {o.icon}
                          </span>
                        )}
                        <span className="min-w-0 flex-1">
                          <span className={`block leading-snug ${selected ? "font-semibold" : "font-medium"}`}>{o.label}</span>
                          {o.hint && <span className="block text-[13px] leading-snug text-muted">{o.hint}</span>}
                        </span>
                        {selected && (
                          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-green" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12.5l4.5 4.5L19 7" />
                          </svg>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>,
          document.body
        )}
    </>
  );
}
