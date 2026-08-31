import { Code2, Languages, Check } from 'lucide-react';
import SkillCard from '@/components/SkillCard';

const frontendSkills = [
  { name: 'HTML & CSS', level: 90 },
  { name: 'JavaScript (ES6+)', level: 80 },
  { name: 'React', level: 75 },
  { name: 'Tailwind CSS', level: 85 },
  { name: 'Responsive Design', level: 80 },
];

const languages = [
  { name: 'English', level: 'Expert', proficiency: 95 },
  { name: 'Italian', level: 'Basic', proficiency: 30 },
];

export default function Skills() {
  return (
    <div className="animate-fade-in mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-10 text-center">
        <h1 className="font-display text-4xl font-bold text-ink-200 sm:text-5xl">
          Skills &amp; Proficiency
        </h1>
        <p className="mt-3 text-ink-400">A snapshot of what I bring to the table.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Frontend Web Development */}
        <SkillCard
          title="Frontend Web Development"
          icon={Code2}
          accent="from-brand-600/40 to-ink-900"
          backgroundImage="https://images.pexels.com/photos/256502/pexels-photo-256502.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
        >
          <p className="text-sm text-ink-400 leading-relaxed">
            Building responsive, accessible interfaces with modern tooling and a focus on
            clean component architecture.
          </p>
          <div className="mt-5 space-y-4">
            {frontendSkills.map((skill) => (
              <div key={skill.name}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-ink-300">{skill.name}</span>
                  <span className="text-ink-500">{skill.level}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-ink-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-300 transition-all duration-700"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </SkillCard>

        {/* Language Proficiency */}
        <SkillCard
          title="Language Proficiency"
          icon={Languages}
          accent="from-accent-500/40 to-ink-900"
        >
          <p className="text-sm text-ink-400 leading-relaxed">
            Comfortable communicating across cultures and contexts.
          </p>
          <div className="mt-5 space-y-5">
            {languages.map((lang) => (
              <div key={lang.name}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-ink-300">{lang.name}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      lang.proficiency >= 80
                        ? 'bg-emerald-500/15 text-emerald-300'
                        : 'bg-accent-500/15 text-accent-400'
                    }`}
                  >
                    {lang.level}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-ink-800">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      lang.proficiency >= 80
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-300'
                        : 'bg-gradient-to-r from-accent-500 to-accent-400'
                    }`}
                    style={{ width: `${lang.proficiency}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {['Fluent speaking', 'Professional writing', 'Basic Italian conversation'].map(
              (item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 rounded-lg bg-ink-800/60 px-3 py-1.5 text-xs text-ink-400 ring-1 ring-ink-700/50"
                >
                  <Check className="h-3 w-3 text-emerald-400" />
                  {item}
                </span>
              )
            )}
          </div>
        </SkillCard>
      </div>
    </div>
  );
}
