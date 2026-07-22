import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      {/* Dummy logo mark */}
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className="size-8 shrink-0"
      >
        <circle cx="20" cy="20" r="19" fill="#4a7edb" opacity="0.12" />
        <path
          d="M8 24c4-9 10-13 17-11-5 0-9 3-11 8 5-5 11-6 15-3-6-1-11 2-13 7 4-3 9-3 12 0-7-2-13 2-14 7-3-1-6-4-6-8z"
          fill="#4a7edb"
        />
        <circle cx="27.5" cy="13.5" r="2.6" fill="#1d3f7d" />
      </svg>
      <span className="text-xl uppercase leading-none tracking-tight text-slate-900">
        <span className="font-extrabold">Prime</span>
        <span className="font-light text-zinc-500">meal</span>
      </span>
    </span>
  );
}
