import React from 'react';
import { Cloud, Droplets, Thermometer, Wind, Gauge, Sun, Clock } from 'lucide-react';
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  data: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const getUVDescription = (uv: number) => {
    if (uv <= 2) return 'Low';
    if (uv <= 5) return 'Moderate';
    if (uv <= 7) return 'High';
    if (uv <= 10) return 'Very High';
    return 'Extreme';
  };

  const getWeatherAdvice = (data: WeatherData) => {
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const uv = data.current.uv;
    
    let advice = [];
    
    if (temp > 30) {
      advice.push('Stay hydrated and avoid prolonged sun exposure');
    } else if (temp < 10) {
      advice.push('Dress warmly and protect against cold');
    }
    
    if (humidity > 70) {
      advice.push('High humidity - stay cool and comfortable');
    }
    
    if (uv > 5) {
      advice.push('High UV - use sun protection');
    }
    
    if (data.current.wind_kph > 20) {
      advice.push('Strong winds - take precautions outdoors');
    }
    
    return advice.length ? advice : ['Weather conditions are comfortable'];
  };

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">
              {data.name}, {data.sys.country}
            </h2>
            <p className="text-gray-400 text-lg">{data.weather[0].description}</p>
          </div>
          <img
            src={data.weather[0].icon}
            alt={data.weather[0].description}
            className="w-20 h-20"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="glass rounded-xl p-4 flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-orange-400 to-red-400">
              <Thermometer className="text-white" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">
                {Math.round(data.main.temp)}°C
              </p>
              <p className="text-gray-400">Temperature</p>
            </div>
          </div>
          
          <div className="glass rounded-xl p-4 flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-400">
              <Thermometer className="text-white" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">
                {Math.round(data.main.feels_like)}°C
              </p>
              <p className="text-gray-400">Feels like</p>
            </div>
          </div>
          
          <div className="glass rounded-xl p-4 flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-400">
              <Droplets className="text-white" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">
                {data.main.humidity}%
              </p>
              <p className="text-gray-400">Humidity</p>
            </div>
          </div>
          
          <div className="glass rounded-xl p-4 flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-purple-400 to-blue-400">
              <Cloud className="text-white" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">
                {data.current.cloud}%
              </p>
              <p className="text-gray-400">Cloud Cover</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-8">
        <h3 className="text-xl font-semibold text-white mb-4">Additional Information</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center space-x-3">
            <Wind className="text-blue-400" size={20} />
            <div>
              <p className="text-white">{data.current.wind_kph} km/h</p>
              <p className="text-sm text-gray-400">Wind Speed ({data.current.wind_dir})</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Gauge className="text-blue-400" size={20} />
            <div>
              <p className="text-white">{data.current.pressure_mb} mb</p>
              <p className="text-sm text-gray-400">Pressure</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Sun className="text-blue-400" size={20} />
            <div>
              <p className="text-white">{data.current.uv} ({getUVDescription(data.current.uv)})</p>
              <p className="text-sm text-gray-400">UV Index</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Clock className="text-blue-400" size={20} />
            <div>
              <p className="text-white">{new Date(data.current.last_updated).toLocaleTimeString()}</p>
              <p className="text-sm text-gray-400">Last Updated</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-8">
        <h3 className="text-xl font-semibold text-white mb-4">Weather Advice</h3>
        <ul className="space-y-2">
          {getWeatherAdvice(data).map((advice, index) => (
            <li key={index} className="text-gray-300 flex items-start space-x-2">
              <span className="text-blue-400">•</span>
              <span>{advice}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};