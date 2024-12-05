import {StyleSheet, Switch, Text, View} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../utils/types';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../Redux/store';
import {toggleUnit} from '../../Redux/slices/temperatureSlice';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SettingsScreen'>;
  route: RouteProp<RootStackParamList, 'SettingsScreen'>;
};

const SettingsScreen: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const unit = useSelector((state: RootState) => state.temperature.unit);

  const handleToggle = () => {
    dispatch(toggleUnit());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Temperature Unit: {unit}</Text>
      <Switch value={unit === 'Fahrenheit'} onValueChange={handleToggle} />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
});
