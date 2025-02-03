import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import { WeatherCard } from './components/WeatherCard';
import type { WeatherData } from './types/weather';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const API_KEY = '4a758dd1aed04dc3950175920231609';
  
  const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    try {
      setLoading(true);
      setError('');
      const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`;
      const response = await axios.get(url);
      
      const transformedData: WeatherData = {
        name: response.data.location.name,
        main: {
          temp: response.data.current.temp_c,
          humidity: response.data.current.humidity,
          feels_like: response.data.current.feelslike_c
        },
        weather: [{
          main: response.data.current.condition.text,
          description: response.data.current.condition.text,
          icon: response.data.current.condition.icon.replace('//cdn.weatherapi.com', 'https://cdn.weatherapi.com')
        }],
        sys: {
          country: response.data.location.country
        },
        current: {
          wind_kph: response.data.current.wind_kph,
          wind_dir: response.data.current.wind_dir,
          pressure_mb: response.data.current.pressure_mb,
          uv: response.data.current.uv,
          cloud: response.data.current.cloud,
          last_updated: response.data.current.last_updated
        }
      };
      
      setWeather(transformedData);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error?.message || 'City not found. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000] to-[#1a1a1a] flex flex-col items-center justify-center p-4">
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1536244636800-a3f74db0f3cf?auto=format&fit=crop&w=2000&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <div className="glass-dark rounded-3xl p-8 mb-8">
          <div className="text-center mb-6">
            <p className="text-2xl font-light text-gray-400">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-3xl font-bold text-white">
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit'
              })}
            </p>
          </div>

          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2 text-center">
            Weather Forecast
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Enter a city name to get the current weather conditions
          </p>
          
          <form onSubmit={fetchWeather} className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name..."
                className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-400 transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50"
                disabled={loading}
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {loading && (
            <div className="text-center text-gray-400">
              <div className="animate-pulse">Searching...</div>
            </div>
          )}

          {error && (
            <div className="text-center text-red-400 mb-4 glass p-4 rounded-xl">
              {error}
            </div>
          )}

          {weather && <WeatherCard data={weather} />}
        </div>
      </div>
    </div>
  );
}

export default App