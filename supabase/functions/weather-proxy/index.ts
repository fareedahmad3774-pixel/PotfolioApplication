const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

// WMO weather code → description + OpenWeather-style icon mapping
const wmoCodes: Record<number, { description: string; icon: string }> = {
  0: { description: 'clear sky', icon: '01d' },
  1: { description: 'mainly clear', icon: '02d' },
  2: { description: 'partly cloudy', icon: '03d' },
  3: { description: 'overcast', icon: '04d' },
  45: { description: 'fog', icon: '50d' },
  48: { description: 'depositing rime fog', icon: '50d' },
  51: { description: 'light drizzle', icon: '09d' },
  53: { description: 'moderate drizzle', icon: '09d' },
  55: { description: 'dense drizzle', icon: '09d' },
  56: { description: 'light freezing drizzle', icon: '09d' },
  57: { description: 'dense freezing drizzle', icon: '09d' },
  61: { description: 'slight rain', icon: '10d' },
  63: { description: 'moderate rain', icon: '10d' },
  65: { description: 'heavy rain', icon: '10d' },
  66: { description: 'light freezing rain', icon: '10d' },
  67: { description: 'heavy freezing rain', icon: '10d' },
  71: { description: 'slight snow', icon: '13d' },
  73: { description: 'moderate snow', icon: '13d' },
  75: { description: 'heavy snow', icon: '13d' },
  77: { description: 'snow grains', icon: '13d' },
  80: { description: 'slight rain showers', icon: '10d' },
  81: { description: 'moderate rain showers', icon: '10d' },
  82: { description: 'violent rain showers', icon: '10d' },
  85: { description: 'slight snow showers', icon: '13d' },
  86: { description: 'heavy snow showers', icon: '13d' },
  95: { description: 'thunderstorm', icon: '11d' },
  96: { description: 'thunderstorm with slight hail', icon: '11d' },
  99: { description: 'thunderstorm with heavy hail', icon: '11d' },
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const city = url.searchParams.get('city');
    if (!city) {
      return new Response(
        JSON.stringify({ error: 'Missing "city" query parameter.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 1. Geocode city name via Open-Meteo geocoding API (no key needed)
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );
    if (!geoRes.ok) {
      return new Response(
        JSON.stringify({ error: 'Geocoding service unavailable.' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    const geoData = await geoRes.json();
    const place = geoData?.results?.[0];
    if (!place) {
      return new Response(
        JSON.stringify({ error: 'City not found. Please check the spelling.' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. Fetch current weather + 5-day forecast from Open-Meteo (no key needed)
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
        `&daily=weather_code,temperature_2m_max` +
        `&forecast_days=5&timezone=auto`
    );
    if (!weatherRes.ok) {
      return new Response(
        JSON.stringify({ error: 'Weather service unavailable.' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    const w = await weatherRes.json();

    const current = w.current;
    const daily = w.daily;
    const currentCode = current.weather_code;
    const wmo = wmoCodes[currentCode] ?? { description: 'unknown', icon: '03d' };

    const forecast = (daily?.time ?? []).map((dt: string, i: number) => {
      const dc = daily.weather_code[i];
      const dm = wmoCodes[dc] ?? { description: 'unknown', icon: '03d' };
      return {
        dt: Math.floor(new Date(dt).getTime() / 1000),
        temp: Math.round(daily.temperature_2m_max[i]),
        icon: dm.icon,
        description: dm.description,
      };
    });

    return new Response(
      JSON.stringify({
        city: place.name,
        country: place.country ?? '',
        temperature: Math.round(current.temperature_2m),
        description: wmo.description,
        icon: wmo.icon,
        humidity: current.relative_humidity_2m,
        windSpeed: Math.round(current.wind_speed_10m),
        feelsLike: Math.round(current.apparent_temperature),
        forecast,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'Unexpected error.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
