import { useState, useEffect, type FormEvent } from 'react';
import { Search, CloudSun, Droplets, Wind, Thermometer, Loader2, MapPin } from 'lucide-react';

type WeatherData = {
  city: string;
  country: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
};

type ForecastItem = {
  dt: number;
  temp: number;
  icon: string;
  description: string;
};

export default function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeather('Karachi');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchWeather(cityName: string) {
    if (!cityName.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const url = `${supabaseUrl}/functions/v1/weather-proxy?city=${encodeURIComponent(cityName)}`;
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${anonKey}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error ?? 'Unable to fetch weather data right now.');
      }
      setWeather({
        city: data.city,
        country: data.country ?? '',
        temperature: data.temperature,
        description: data.description,
        icon: data.icon,
        humidity: data.humidity,
        windSpeed: data.windSpeed,
        feelsLike: data.feelsLike,
      });
      setForecast(data.forecast ?? []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong.';
      setError(message);
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    fetchWeather(city);
  }

  const iconUrl = (icon: string) =>
    `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="animate-fade-in mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="mb-6 text-center sm:mb-8">
        <h1 className="font-display text-3xl font-bold text-ink-200 sm:text-5xl">
          Weather App
        </h1>
        <p className="mt-2 text-sm text-ink-400 sm:mt-3 sm:text-base">Search any city to check current conditions.</p>
      </div>

      {/* Search */}
      <form onSubmit={handleSubmit} className="mx-auto max-w-md">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="w-full rounded-xl border border-ink-800 bg-ink-900/60 py-3 pl-10 pr-3 text-sm text-ink-200 placeholder-ink-500 outline-none transition-colors focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 px-4 py-3 text-sm font-semibold text-ink-950 shadow-lg shadow-brand-500/20 transition-all hover:brightness-110 disabled:opacity-50 sm:px-5"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </form>

      {/* Error */}
      {error && (
        <div className="mx-auto mt-6 max-w-md rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300 animate-scale-in">
          {error}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && !weather && (
        <div className="mx-auto mt-6 max-w-md animate-pulse rounded-2xl border border-ink-800 bg-ink-900/40 p-6 sm:mt-8 sm:p-8">
          <div className="mx-auto h-6 w-32 rounded bg-ink-800" />
          <div className="mx-auto mt-4 h-16 w-24 rounded bg-ink-800" />
          <div className="mx-auto mt-4 h-4 w-40 rounded bg-ink-800" />
        </div>
      )}

      {/* Weather card */}
      {weather && !loading && (
        <div className="mx-auto mt-6 max-w-md animate-scale-in overflow-hidden rounded-2xl border border-ink-800/80 bg-gradient-to-b from-ink-900/60 to-ink-950 shadow-xl sm:mt-8">
          <div className="relative p-5 text-center sm:p-8">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-500/10 blur-2xl" />
            <div className="relative">
              <div className="flex items-center justify-center gap-1.5 text-ink-400">
                <MapPin className="h-4 w-4 shrink-0 text-brand-400" />
                <span className="text-sm font-medium">
                  {weather.city}
                  {weather.country ? `, ${weather.country}` : ''}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-center gap-3 sm:mt-4 sm:gap-4">
                <img
                  src={iconUrl(weather.icon)}
                  alt={weather.description}
                  className="h-16 w-16 drop-shadow-lg sm:h-20 sm:w-20"
                />
                <div className="text-left">
                  <p className="font-display text-4xl font-bold text-ink-100 sm:text-5xl">
                    {weather.temperature}°
                  </p>
                  <p className="text-xs capitalize text-ink-400 sm:text-sm">{weather.description}</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 sm:mt-6 sm:gap-3">
                <div className="rounded-xl bg-ink-800/40 p-2.5 sm:p-3">
                  <Thermometer className="mx-auto h-4 w-4 text-brand-300" />
                  <p className="mt-1.5 text-xs text-ink-500">Feels like</p>
                  <p className="text-xs font-semibold text-ink-200 sm:text-sm">{weather.feelsLike}°C</p>
                </div>
                <div className="rounded-xl bg-ink-800/40 p-2.5 sm:p-3">
                  <Droplets className="mx-auto h-4 w-4 text-brand-300" />
                  <p className="mt-1.5 text-xs text-ink-500">Humidity</p>
                  <p className="text-xs font-semibold text-ink-200 sm:text-sm">{weather.humidity}%</p>
                </div>
                <div className="rounded-xl bg-ink-800/40 p-2.5 sm:p-3">
                  <Wind className="mx-auto h-4 w-4 text-brand-300" />
                  <p className="mt-1.5 text-xs text-ink-500">Wind</p>
                  <p className="text-xs font-semibold text-ink-200 sm:text-sm">{weather.windSpeed} m/s</p>
                </div>
              </div>
            </div>
          </div>

          {/* Forecast */}
          {forecast.length > 0 && (
            <div className="border-t border-ink-800/60 px-4 py-4 sm:px-6 sm:py-5">
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-ink-500">
                5-day forecast
              </p>
              <div className="flex justify-between gap-1 sm:gap-2">
                {forecast.map((item, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1">
                    <p className="text-xs text-ink-500">
                      {new Date(item.dt * 1000).toLocaleDateString('en', { weekday: 'short' })}
                    </p>
                    <img src={iconUrl(item.icon)} alt={item.description} className="h-8 w-8 sm:h-9 sm:w-9" />
                    <p className="text-xs font-semibold text-ink-300">{item.temp}°</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!weather && !loading && !error && (
        <div className="mx-auto mt-10 max-w-md text-center text-ink-500 sm:mt-12">
          <CloudSun className="mx-auto h-12 w-12 text-ink-700" />
          <p className="mt-3 text-sm">Search for a city to see the weather.</p>
        </div>
      )}
    </div>
  );
}
