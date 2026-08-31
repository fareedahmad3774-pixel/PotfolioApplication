import { NavLink } from 'react-router-dom';
import { Home, CloudSun, ListChecks, Sparkles } from 'lucide-react';

const links = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/skills', label: 'Skills', icon: Sparkles },
  { to: '/weather', label: 'Weather', icon: CloudSun },
  { to: '/todo', label: 'To-Do', icon: ListChecks },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-800/60 bg-ink-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <NavLink to="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 font-display text-sm font-bold text-ink-950 shadow-lg shadow-brand-500/20 transition-transform group-hover:scale-105">
            FA
          </span>
          <span className="font-display text-lg font-semibold text-ink-200">
            Fareed<span className="text-brand-400">.</span>
          </span>
        </NavLink>

        <ul className="flex items-center gap-1 sm:gap-2">
          {links.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium transition-all sm:px-3.5 ${
                    isActive
                      ? 'bg-brand-500/15 text-brand-300'
                      : 'text-ink-400 hover:bg-ink-800/60 hover:text-ink-200'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
