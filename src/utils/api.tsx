import axios from 'axios';
import { API_KEY } from './constant';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeather = async (lat: string, lon: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        units: 'metric',
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch weather data');
    } else if (error.request) {
      throw new Error('No response received from the server');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};
