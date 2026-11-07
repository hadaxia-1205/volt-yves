import { demo } from "@/config/shop";

export function DemoBanner() {
  return (
    <aside role="note" className="border border-line border-l-[3px] border-l-blue bg-surface px-4 py-3">
      <p className="font-semibold text-ink">Mode démonstration</p>
      <p className="mt-1 text-sm leading-6 text-muted">{demo.banner}</p>
    </aside>
  );
}
