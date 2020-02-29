import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const ParkingSpot = props => {

  useEffect(() => {
    props.fetchEnforcements();
  }, []);

  // to display elapsed time as x mins ago / x hours ago etc.
  const timeSince = () => {

    const date = Number(props.created_at)

    if (date === 0){
      return 'Never Enforced'
    }

    let formattedDate = new Date(date)

    let seconds = Math.floor(((new Date().getTime()/1000) - formattedDate));

    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
      return interval + ' years ago';
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + ' months ago';
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + ' days ago';
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + ' hours ago';
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + ' minutes ago';
    }
    return Math.floor(seconds) + ' seconds ago';
  };

    return (
      <TouchableOpacity style={styles.button}>
        <View>
          <Text style={styles.parkingSpotTitle}>{props.name}</Text>
        </View>
        <View style={styles.enforcementDetails}>
        <View>
          <Text style={styles.parkingSpotDetails}>
            <Text style={styles.bold}>Enforcer Username: </Text> {props.enforcer_username}
          </Text>
        </View>
        <View>
          <Text style={styles.parkingSpotDetails}><Text style={styles.bold}>Last Enforcement: </Text>{timeSince()}</Text>
        </View>
        </View>
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 75,
    borderColor: '#F0F4F5',
    borderBottomWidth: 1,
    paddingLeft: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  enforcementDetails: {
    marginTop: 10
  },
  parkingSpotTitle: {
    fontSize: 18,
  },
  parkingSpotDetails: {
    fontSize: 12,
  },
  bold: {
    fontWeight: 'bold'
  }
});

export default ParkingSpot;
