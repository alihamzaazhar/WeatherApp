import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {City} from '../utils/types';

type Props = {
  item: City;
  onPress: (city: City) => void;
};

const WeatherCard: React.FC<Props> = ({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.cityItem} onPress={() => onPress(item)}>
      <Text style={styles.cityName}>{item.name}</Text>
      <Text style={styles.cityDetails}>
        {item.admin1}, {item.country}
      </Text>
    </TouchableOpacity>
  );
};

export default WeatherCard;

const styles = StyleSheet.create({
  cityItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cityName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cityDetails: {
    fontSize: 14,
    color: '#555',
  },
});
