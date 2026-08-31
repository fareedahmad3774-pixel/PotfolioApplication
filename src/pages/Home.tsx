import { Github, Linkedin, GraduationCap, User, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-950/40 to-ink-950" />
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-800 bg-ink-900/60 px-4 py-1.5 text-xs font-medium text-ink-400 animate-fade-in-up">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Available for opportunities
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-tight text-ink-200 text-balance animate-fade-in-delay-1 sm:text-6xl">
              Fareed Ahmad
            </h1>
            <p className="mt-4 text-lg text-ink-400 animate-fade-in-delay-2 sm:text-xl">
              Intermediate student & aspiring frontend web developer building clean,
              responsive interfaces with React.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3 animate-fade-in-delay-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 rounded-xl bg-ink-800/60 px-5 py-3 text-sm font-medium text-ink-300 ring-1 ring-ink-700/60 transition-all hover:bg-ink-800 hover:text-ink-100 hover:ring-brand-500/40"
              >
                <Github className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 px-5 py-3 text-sm font-semibold text-ink-950 shadow-lg shadow-brand-500/20 transition-all hover:shadow-brand-500/40 hover:brightness-110"
              >
                <Linkedin className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About + Education */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* About */}
          <div className="lg:col-span-2 rounded-2xl border border-ink-800/80 bg-ink-900/40 p-8 transition-colors hover:border-ink-700">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300">
                <User className="h-5 w-5" />
              </span>
              <h2 className="font-display text-2xl font-semibold text-ink-200">About Me</h2>
            </div>
            <div className="mt-5 space-y-4 text-ink-400 leading-relaxed">
              <p>
                I'm Fareed Ahmad, an Intermediate-level student with a strong passion for
                frontend web development. I enjoy turning ideas into interactive, accessible
                web experiences and am continuously sharpening my skills in React, TypeScript,
                and modern CSS.
              </p>
              <p>
                Beyond coursework, I build small projects to practice real-world patterns —
                state management, API integration, and responsive design. I value clean code,
                thoughtful UI, and learning something new with every build.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Tailwind CSS', 'Responsive Design', 'REST APIs'].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-ink-800/60 px-3 py-1.5 text-xs font-medium text-ink-400 ring-1 ring-ink-700/50"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Education */}
          <div className="rounded-2xl border border-ink-800/80 bg-ink-900/40 p-8 transition-colors hover:border-ink-700">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/15 text-accent-400">
                <GraduationCap className="h-5 w-5" />
              </span>
              <h2 className="font-display text-2xl font-semibold text-ink-200">Education</h2>
            </div>
            <div className="mt-6 space-y-5">
              <div className="border-l-2 border-brand-500/40 pl-4">
                <p className="text-sm text-brand-300 font-medium">Current</p>
                <h3 className="mt-1 font-semibold text-ink-200">Intermediate</h3>
                <p className="mt-1 text-sm text-ink-500">
                  Pre-engineering coursework, developing a foundation in analytical thinking
                  and problem solving.
                </p>
              </div>
              <div className="border-l-2 border-ink-700 pl-4">
                <p className="text-sm text-ink-500 font-medium">Completed</p>
                <h3 className="mt-1 font-semibold text-ink-300">Matriculation</h3>
                <p className="mt-1 text-sm text-ink-500">
                  Secondary school certificate with a focus on science and computer studies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Location / quick facts */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { icon: MapPin, label: 'Focus', value: 'Frontend Development' },
            { icon: GraduationCap, label: 'Level', value: 'Intermediate' },
            { icon: User, label: 'Status', value: 'Student & Self-learner' },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl border border-ink-800/80 bg-ink-900/40 px-5 py-4"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-800 text-ink-400">
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs text-ink-500">{label}</p>
                <p className="text-sm font-medium text-ink-300">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
