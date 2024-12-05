import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  View,
  Alert,
  Image,
  Platform,
  Linking,
} from 'react-native';
import citiesData from '../../utils/cities500.json';
import {City, RootStackParamList} from '../../utils/types';
import Icon from 'react-native-vector-icons/Ionicons';
import {API_KEY, convertTemp, tempUnit} from '../../utils/constant';
import Loader from '../../components/Loader';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../Redux/store';
import {saveWeather} from '../../Redux/slices/weatherSlice';
import Geolocation from '@react-native-community/geolocation';
import { CommonStyles } from '../../utils/styles';
import WeatherCard from '../../components/WeatherCard';

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
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
      );
      const data = await response.json();
      if (response.ok) {
        dispatch(saveWeather(data));
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocationWeather = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        fetchWeather(latitude.toString(), longitude.toString());
      },
      error => {
        if (error.code === 1) {
          Alert.alert(
            'Location Permission Denied',
            'You have denied location access. Please enable it in settings to view the current location’s weather.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Open Settings',
                onPress: () => {
                  if (Platform.OS === 'ios') {
                    Linking.openURL('app-settings:');
                  } else {
                    Linking.openSettings();
                  }
                },
              },
            ],
          );
        } else {
          Alert.alert(
            'Error',
            'Failed to fetch your location. Please try again.',
          );
        }
      },
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
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
    return (
      <WeatherCard item={item} onPress={handleCityPress}/>
    );
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
          <TouchableOpacity onPress={getCurrentLocationWeather}>
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
          <View style={CommonStyles.weatherContainer}>
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${recentWeather?.weather[0]?.icon}@2x.png`,
              }}
              style={CommonStyles.weatherIcon}
              resizeMode="contain"
            />
            <Text style={CommonStyles.weatherText}>{`Temp: ${convertTemp(
              recentWeather?.main?.temp,
              unit,
            ).toFixed(1)}${tempUnit(unit)}`}</Text>
            <Text style={CommonStyles.weatherDescription}>
              {recentWeather?.weather[0]?.description?.charAt(0).toUpperCase() +
                recentWeather?.weather[0]?.description?.slice(1)}
            </Text>
            <Text
              style={
                CommonStyles.weatherDescription
              }>{`${recentWeather?.name}, ${recentWeather?.sys?.country}`}</Text>
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => {
                navigation.navigate('DetailsScreen');
              }}>
              <Text style={styles.MoreDetailsText}>More Details</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.SettingIcon}
          onPress={() => {
            navigation.navigate('SettingsScreen');
          }}>
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
  btnContainer: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: 'rgba(45, 51, 75, 1)',
    marginTop: 70,
    borderRadius: 10,
  },
  MoreDetailsText: {
    color: 'white',
  },
  SettingIcon: {
    position: 'absolute',
    bottom: 70,
    right: 20,
  },
});
