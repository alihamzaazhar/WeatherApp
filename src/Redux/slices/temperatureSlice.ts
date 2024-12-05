import { createSlice } from '@reduxjs/toolkit';
import { TemperatureState } from '../../utils/types';

const initialState: TemperatureState = {
  unit: 'Celsius',
};

const temperatureSlice = createSlice({
  name: 'temperature',
  initialState,
  reducers: {
    toggleUnit: (state) => {
      state.unit = state.unit === 'Celsius' ? 'Fahrenheit' : 'Celsius';
    },
  },
});

export const { toggleUnit } = temperatureSlice.actions;
export default temperatureSlice.reducer;
