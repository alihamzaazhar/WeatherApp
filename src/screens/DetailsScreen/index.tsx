import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../utils/types';
import {RouteProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import WindIcon from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import {RootState} from '../../Redux/store';
import {convertTemp, convertUnixToTime, tempUnit} from '../../utils/constant';
import SunSetRiseIcon from 'react-native-vector-icons/Feather';
import { CommonStyles } from '../../utils/styles';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DetailsScreen'>;
  route: RouteProp<RootStackParamList, 'DetailsScreen'>;
};

const DetailsScreen: React.FC<Props> = () => {
  const unit = useSelector((state: RootState) => state.temperature.unit);
  const recentWeather = useSelector(
    (state: RootState) => state.recentWeather.weather,
  );
  return (
    <View style={CommonStyles.weatherContainer}>
      <Image
        source={{
          uri: `https://openweathermap.org/img/wn/${recentWeather?.weather[0]?.icon}@2x.png`,
        }}
        style={CommonStyles.weatherIcon}
        resizeMode="contain"
      />
      <Text style={CommonStyles.weatherText}>{`Temp: ${convertTemp(
        recentWeather?.main?.temp ?? 0,
        unit,
      ).toFixed(1)}${tempUnit(unit)}`}</Text>
      <Text style={CommonStyles.weatherDescription}>
        {(recentWeather?.weather[0]?.description ?? 'No description available')
          .charAt(0)
          .toUpperCase() +
          (
            recentWeather?.weather[0]?.description ?? 'No description available'
          ).slice(1)}
      </Text>

      <Text
        style={
          CommonStyles.weatherDescription
        }>{`${recentWeather?.name}, ${recentWeather?.sys?.country}`}</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Icon name="water-outline" size={20} color="#555" />
          <Text
            style={
              styles.detailText
            }>{`Humidity: ${recentWeather?.main?.humidity}%`}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="speedometer-outline" size={20} color="#555" />
          <Text
            style={
              styles.detailText
            }>{`Pressure: ${recentWeather?.main?.pressure} hPa`}</Text>
        </View>
        <View style={styles.detailRow}>
          <WindIcon name="air" size={20} color="#555" />
          <Text
            style={
              styles.detailText
            }>{`Wind Speed: ${recentWeather?.wind?.speed} m/s`}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="thermometer-outline" size={20} color="#555" />
          <Text style={styles.detailText}>{`Max Temp: ${convertTemp(
            recentWeather?.main?.temp_max ?? 0,
            unit,
          ).toFixed(1)}${tempUnit(unit)}`}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="thermometer-outline" size={20} color="#555" />
          <Text style={styles.detailText}>{`Min Temp: ${convertTemp(
            recentWeather?.main?.temp_min ?? 0,
            unit,
          ).toFixed(1)}${tempUnit(unit)}`}</Text>
        </View>
        <View style={styles.detailRow}>
          <SunSetRiseIcon name="sunrise" size={20} color="#555" />
          <Text style={styles.detailText}>{`Sunrise Time: ${convertUnixToTime(
            recentWeather?.sys?.sunrise ?? 0,
            recentWeather?.timezone ?? 0,
          )}`}</Text>
        </View>
        <View style={styles.detailRow}>
          <SunSetRiseIcon name="sunset" size={20} color="#555" />
          <Text style={styles.detailText}>{`Sunset Time: ${convertUnixToTime(
            recentWeather?.sys?.sunset ?? 0,
            recentWeather?.timezone ?? 0,
          )}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
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
});
