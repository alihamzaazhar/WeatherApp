import Geolocation from '@react-native-community/geolocation';
import { Alert, Linking, Platform } from 'react-native';
import { getWeather } from './api';

export const getCurrentLocationWeather = async (
    onSuccess: (data: any) => void,
    onError?: (message: string) => void,
    onPermissionCancel?: () => void,
  ) => {
    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        try {
          const data = await getWeather(latitude.toString(), longitude.toString());
          onSuccess(data);
        } catch (error: any) {
          const errorMessage = error.message || 'Failed to fetch weather data.';
          if (onError) {
            onError(errorMessage);
          } else {
            Alert.alert('Error', errorMessage);
          }
        }
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
                onPress: () => {
                  if (onPermissionCancel) {
                    onPermissionCancel();
                  }
                },
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
          const errorMessage = 'Failed to fetch your location. Please try again.';
          if (onError) {
            onError(errorMessage);
          } else {
            Alert.alert('Error', errorMessage);
          }
        }
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 },
    );
  };
