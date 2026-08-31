import type { LucideIcon } from 'lucide-react';

type SkillCardProps = {
  title: string;
  icon: LucideIcon;
  accent: string;
  backgroundImage?: string;
  children: React.ReactNode;
};

export default function SkillCard({
  title,
  icon: Icon,
  accent,
  backgroundImage,
  children,
}: SkillCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-ink-800/80 bg-ink-900/40 transition-all hover:border-ink-700 hover:shadow-xl hover:shadow-black/20">
      {/* Banner */}
      <div className="relative h-40 overflow-hidden">
        {backgroundImage ? (
          <>
            <img
              src={backgroundImage}
              alt=""
              className="h-full w-full object-cover opacity-40 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-950/70 to-transparent" />
          </>
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${accent}`} />
        )}
        <div className="absolute bottom-4 left-5 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-950/80 ring-1 ring-ink-700/60 backdrop-blur">
            <Icon className="h-5 w-5 text-brand-300" />
          </span>
          <h3 className="font-display text-xl font-semibold text-ink-100">{title}</h3>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">{children}</div>
    </div>
  );
}
