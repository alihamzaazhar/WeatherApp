import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {CommonStyles} from '../utils/styles';
import {WeatherDetailCardProps} from '../utils/types';
import {convertTemp, convertUnixToTime, tempUnit} from '../utils/constant';
import SunSetRiseIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import WindIcon from 'react-native-vector-icons/Entypo';

const WeatherDetailCard: React.FC<WeatherDetailCardProps> = ({
  weather,
  unit,
  onMoreDetails,
  showMoreDetails,
}) => {
  if (!weather) {
    return <Text style={styles.errorText}>No weather data available</Text>;
  }
  return (
    <View style={CommonStyles.weatherContainer}>
      <Image
        source={{
          uri: `https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`,
        }}
        style={CommonStyles.weatherIcon}
        resizeMode="contain"
      />
      <Text style={CommonStyles.weatherText}>{`Temp: ${convertTemp(
        weather?.main?.temp,
        unit,
      ).toFixed(1)}${tempUnit(unit)}`}</Text>
      <Text style={CommonStyles.weatherDescription}>
        {weather?.weather[0]?.description?.charAt(0).toUpperCase() +
          weather?.weather[0]?.description?.slice(1)}
      </Text>
      <Text
        style={
          CommonStyles.weatherDescription
        }>{`${weather?.name}, ${weather?.sys?.country}`}</Text>

      {!showMoreDetails ? (
        <TouchableOpacity style={styles.btnContainer} onPress={onMoreDetails}>
          <Text style={styles.MoreDetailsText}>More Details</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Icon name="water-outline" size={20} color="#555" />
            <Text
              style={
                styles.detailText
              }>{`Humidity: ${weather?.main?.humidity}%`}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="speedometer-outline" size={20} color="#555" />
            <Text
              style={
                styles.detailText
              }>{`Pressure: ${weather?.main?.pressure} hPa`}</Text>
          </View>
          <View style={styles.detailRow}>
            <WindIcon name="air" size={20} color="#555" />
            <Text
              style={
                styles.detailText
              }>{`Wind Speed: ${weather?.wind?.speed} m/s`}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="thermometer-outline" size={20} color="#555" />
            <Text style={styles.detailText}>{`Max Temp: ${convertTemp(
              weather?.main?.temp_max ?? 0,
              unit,
            ).toFixed(1)}${tempUnit(unit)}`}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="thermometer-outline" size={20} color="#555" />
            <Text style={styles.detailText}>{`Min Temp: ${convertTemp(
              weather?.main?.temp_min ?? 0,
              unit,
            ).toFixed(1)}${tempUnit(unit)}`}</Text>
          </View>
          <View style={styles.detailRow}>
            <SunSetRiseIcon name="sunrise" size={20} color="#555" />
            <Text style={styles.detailText}>{`Sunrise Time: ${convertUnixToTime(
              weather?.sys?.sunrise ?? 0,
              weather?.timezone ?? 0,
            )}`}</Text>
          </View>
          <View style={styles.detailRow}>
            <SunSetRiseIcon name="sunset" size={20} color="#555" />
            <Text style={styles.detailText}>{`Sunset Time: ${convertUnixToTime(
              weather?.sys?.sunset ?? 0,
              weather?.timezone ?? 0,
            )}`}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default WeatherDetailCard;

const styles = StyleSheet.create({
  btnContainer: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: 'rgba(45, 51, 75, 1)',
    marginTop: 20,
    borderRadius: 10,
  },
  MoreDetailsText: {
    color: 'white',
    textAlign: 'center',
  },
  detailsContainer: {
    marginTop: 16,
    width: '100%',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
});
