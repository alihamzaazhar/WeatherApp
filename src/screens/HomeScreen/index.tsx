import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import citiesData from '../../utils/cities500.json';
import {City, RootStackParamList} from '../../utils/types';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../../components/Loader';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../Redux/store';
import {saveWeather} from '../../Redux/slices/weatherSlice';
import CityCard from '../../components/CityListCard';
import {getWeather} from '../../utils/api';
import {getCurrentLocationWeather} from '../../utils/getCurrentLocation';
import WeatherDetailCard from '../../components/WeatherDetailCard';

const cities: City[] = citiesData as City[];

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;
  route: RouteProp<RootStackParamList, 'HomeScreen'>;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const recentWeather = useSelector(
    (state: RootState) => state.recentWeather.weather,
  );
  const unit = useSelector((state: RootState) => state.temperature.unit);

  const fetchWeather = async (lat: string, lon: string) => {
    setLoading(true);
    try {
      const data = await getWeather(lat, lon);
      dispatch(saveWeather(data));
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherForCurrentLocation = () => {
    setLoading(true);
    getCurrentLocationWeather(
      data => {
        dispatch(saveWeather(data));
        setLoading(false);
      },
      errorMessage => {
        console.error(errorMessage);
        Alert.alert('Error', errorMessage);
        setLoading(false);
      },
      () => {
        setLoading(false);
      },
    );
  };

  const handleCityPress = (city: City) => {
    fetchWeather(city.lat, city.lon);
    setFilteredCities([]);
    setSearchText('');
  };

  const handleSearch = (text: any) => {
    setSearchText(text);

    if (text.length > 0) {
      const filteredData = cities?.filter((city: City) =>
        city?.name?.toLowerCase().includes(text?.toLowerCase()),
      );
      setFilteredCities(filteredData);
    } else {
      setFilteredCities([]);
    }
  };

  const renderCityItem = ({item}: {item: City}) => {
    return <CityCard item={item} onPress={handleCityPress} />;
  };

  const onSettings = () => {
    navigation.navigate('SettingsScreen');
  };

  const onMoreDetails = () => {
    navigation.navigate('DetailsScreen');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.textinputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search city"
            value={searchText}
            onChangeText={handleSearch}
          />
          <TouchableOpacity onPress={fetchWeatherForCurrentLocation}>
            <Icon name="location-sharp" size={30} color="black" />
          </TouchableOpacity>
        </View>

        {searchText?.length > 0 ? (
          <FlatList
            data={filteredCities}
            keyExtractor={item => item.id}
            renderItem={renderCityItem}
            style={styles.flatList}
            keyboardShouldPersistTaps={'handled'}
          />
        ) : null}

        {recentWeather ? (
          <WeatherDetailCard
            weather={recentWeather}
            unit={unit}
            onMoreDetails={onMoreDetails}
            showMoreDetails={false}
          />
        ) : null}
        <TouchableOpacity style={styles.SettingIcon} onPress={onSettings}>
          <Icon name="settings" size={50} color={'black'} />
        </TouchableOpacity>
      </SafeAreaView>
      <Loader loading={loading} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '80%',
  },
  textinputContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 20,
    alignItems: 'center',
  },
  flatList: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  MoreDetailsText: {
    color: 'white',
  },
  SettingIcon: {
    position: 'absolute',
    bottom: 50,
    right: 20,
  },
});
