import { Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Skills from '@/pages/Skills';
import Weather from '@/pages/Weather';
import TodoApp from '@/pages/TodoApp';

export default function App() {
  return (
    <div className="min-h-screen bg-ink-950">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/todo" element={<TodoApp />} />
        </Routes>
      </main>
      <footer className="border-t border-ink-800/60 py-8 text-center">
        <p className="text-sm text-ink-600">
          Fareed Ahmad — Portfolio · Built with React &amp; Tailwind CSS
        </p>
      </footer>
    </div>
  );
}
