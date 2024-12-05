export const API_KEY = process.env.OPENWEATHER_API_KEY;

export const convertTemp = (temp: number, unit: string) => {
  if (unit === 'Fahrenheit') {
    return (temp * 9) / 5 + 32;
  } else {
    return temp;
  }
};

export const tempUnit = (unit: string) => {
  if (unit === 'Fahrenheit') {
    return '°F';
  } else {
    return '°C';
  }
};

export const convertUnixToTime = (unixTimestamp: number, timezone: number): string => {
  const date = new Date((unixTimestamp + timezone) * 1000); // Adjust for timezone
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
};
