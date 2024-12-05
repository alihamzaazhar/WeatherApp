import { StyleSheet } from 'react-native';

export const CommonStyles = StyleSheet.create({
  weatherContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
  },
  weatherText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  weatherDescription: {
    fontSize: 14,
    color: '#555',
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
});
