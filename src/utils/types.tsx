export type RootStackParamList = {
    HomeScreen: undefined,
    DetailsScreen: undefined,
    SettingsScreen: undefined,
  };

export type City = {
    id: string;
    name: string;
    country: string;
    admin1: string;
    lat: string;
    lon: string;
    pop: string;
  };

export type TemperatureState = {
    unit: 'Celsius' | 'Fahrenheit';
  };

export type Weather = {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: {
    lat: number;
    lon: number;
  };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;
  weather: Array<{
    description: string;
    icon: string;
    id: number;
    main: string;
  }>;
  wind: {
    deg: number;
    speed: number;
  };
};

export interface WeatherDetailCardProps {
  weather: Weather;
  unit: string;
  onMoreDetails?: () => void;
  showMoreDetails: boolean;
}


