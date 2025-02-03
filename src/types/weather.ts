export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  sys: {
    country: string;
  };
  current: {
    wind_kph: number;
    wind_dir: string;
    pressure_mb: number;
    uv: number;
    cloud: number;
    last_updated: string;
  };
}