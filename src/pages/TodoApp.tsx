import { useState, useEffect, type FormEvent } from 'react';
import { Plus, Trash2, Loader2, ListChecks, CheckCircle2, Circle } from 'lucide-react';
import { supabase, type Todo } from '@/lib/supabase';

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      setError('Could not load tasks. Please try again.');
    } else {
      setTodos(data ?? []);
    }
    setLoading(false);
  }

  async function addTodo(e: FormEvent) {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title) return;
    setSubmitting(true);
    setError(null);
    const { data, error } = await supabase
      .from('todos')
      .insert({ title })
      .select()
      .single();
    if (error) {
      setError('Could not add task. Please try again.');
    } else if (data) {
      setTodos((prev) => [data, ...prev]);
      setNewTitle('');
    }
    setSubmitting(false);
  }

  async function toggleTodo(id: string, completed: boolean) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !completed } : t))
    );
    const { error } = await supabase
      .from('todos')
      .update({ completed: !completed })
      .eq('id', id);
    if (error) {
      // revert on failure
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed } : t))
      );
      setError('Could not update task. Please try again.');
    }
  }

  async function deleteTodo(id: string) {
    const prev = todos;
    setTodos((prev) => prev.filter((t) => t.id !== id));
    const { error } = await supabase.from('todos').delete().eq('id', id);
    if (error) {
      setTodos(prev);
      setError('Could not delete task. Please try again.');
    }
  }

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="animate-fade-in mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-8 text-center">
        <h1 className="font-display text-4xl font-bold text-ink-200 sm:text-5xl">To-Do App</h1>
        <p className="mt-3 text-ink-400">Stay organized. Add, complete, and remove tasks.</p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-ink-800/80 bg-ink-900/40 p-4 text-center">
          <p className="font-display text-2xl font-bold text-ink-200">{todos.length}</p>
          <p className="mt-0.5 text-xs text-ink-500">Total</p>
        </div>
        <div className="rounded-xl border border-ink-800/80 bg-ink-900/40 p-4 text-center">
          <p className="font-display text-2xl font-bold text-emerald-400">{completedCount}</p>
          <p className="mt-0.5 text-xs text-ink-500">Done</p>
        </div>
        <div className="rounded-xl border border-ink-800/80 bg-ink-900/40 p-4 text-center">
          <p className="font-display text-2xl font-bold text-brand-400">
            {todos.length - completedCount}
          </p>
          <p className="mt-0.5 text-xs text-ink-500">Active</p>
        </div>
      </div>

      {/* Add form */}
      <form onSubmit={addTodo} className="mb-6 flex gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 rounded-xl border border-ink-800 bg-ink-900/60 px-4 py-3 text-sm text-ink-200 placeholder-ink-500 outline-none transition-colors focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20"
        />
        <button
          type="submit"
          disabled={submitting || !newTitle.trim()}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 px-5 py-3 text-sm font-semibold text-ink-950 shadow-lg shadow-brand-500/20 transition-all hover:brightness-110 disabled:opacity-50"
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          <span className="hidden sm:inline">Add</span>
        </button>
      </form>

      {error && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300 animate-scale-in">
          {error}
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-ink-600" />
        </div>
      ) : todos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-800 py-16 text-center">
          <ListChecks className="mx-auto h-10 w-10 text-ink-700" />
          <p className="mt-3 text-sm text-ink-500">No tasks yet. Add one above to get started.</p>
        </div>
      ) : (
        <ul className="space-y-2.5">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="group flex items-center gap-3 rounded-xl border border-ink-800/80 bg-ink-900/40 px-4 py-3.5 transition-all hover:border-ink-700 animate-fade-in-up"
            >
              <button
                onClick={() => toggleTodo(todo.id, todo.completed)}
                className="shrink-0 transition-transform hover:scale-110"
                aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
              >
                {todo.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                ) : (
                  <Circle className="h-5 w-5 text-ink-600 hover:text-ink-400" />
                )}
              </button>
              <span
                className={`flex-1 text-sm transition-colors ${
                  todo.completed
                    ? 'text-ink-600 line-through'
                    : 'text-ink-200'
                }`}
              >
                {todo.title}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="shrink-0 rounded-lg p-1.5 text-ink-600 opacity-0 transition-all hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100"
                aria-label="Delete task"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
