import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Weather } from '../../utils/types';

type WeatherState = {
  weather: Weather | null;
};

const initialState: WeatherState = {
  weather: null,
};

const WeatherSlice = createSlice({
  name: 'recentWeather',
  initialState,
  reducers: {
    saveWeather: (state, action: PayloadAction<Weather>) => {
      state.weather = action.payload;
    },
  },
});

export const { saveWeather } = WeatherSlice.actions;
export default WeatherSlice.reducer;
