import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../utils/types';
import {RouteProp} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../Redux/store';
import WeatherDetailCard from '../../components/WeatherDetailCard';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DetailsScreen'>;
  route: RouteProp<RootStackParamList, 'DetailsScreen'>;
};

const DetailsScreen: React.FC<Props> = () => {
  const unit = useSelector((state: RootState) => state.temperature.unit);
  const recentWeather = useSelector(
    (state: RootState) => state.recentWeather.weather,
  );
  if (!recentWeather) {
    return null;
  }
  return (
    <WeatherDetailCard
      weather={recentWeather}
      unit={unit}
      showMoreDetails={true}
    />
  );
};

export default DetailsScreen;
