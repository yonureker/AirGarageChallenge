import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View } from 'react-native';
import ParkingSpotList from './components/parkingSpotList';

const App = () => {
  return (
    <View>
    <StatusBar />
    <ParkingSpotList />
    </View>
  )
}

export default App;
