import React, {useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
} from 'react-native';

import ParkingSpot from './parkingSpot';

const ParkingSpotList = () => {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [enforcement, setEnforcement] = useState([]);

  // combining parkingSpots and enforcement arrays so I can use this for FlatArray sorting
  let combined = parkingSpots.map(function(item, index) {
    return {
      name: item.name,
      pk: item.pk,
      ...(enforcement[index]) && {enforcer_username: enforcement[index].enforcer_username},
      ...(enforcement[index]) && {created_at: enforcement[index].created_at}
    };
  });

  // sort combinedArray by recent enforcement time
  let combinedArray = combined.sort((a, b) =>
    a.created_at < b.created_at ? 1 : -1,
  );

  useEffect(() => {
    // fetch all parking spots once before component mounts
    fetchParkingSpots();
  }, []);

  const fetchParkingSpots = () => {
    fetch(`https://airgara.ge/api/spots/?format=json`)
      .then(response => response.json())
      .then(responseJson => setParkingSpots(responseJson))
      .catch(error => {
        console.log(error);
      });
  };

  const fetchEnforcements = pk => {
    fetch(`https://airgara.ge/api/enforcements/?spot=${pk}`)
      .then(response => response.json())
      .then(responseJson => {
        // logic if there is no enforcement for a specific spot
        if (responseJson == false) {
          setEnforcement(enforcement => [
            ...enforcement,
            {
              enforcer_username: 'N/A',
              created_at: 0,
            },
          ]);
        } else {
          // logic if there is an enforcement
          setEnforcement(enforcement => [
            ...enforcement,
            {
              enforcer_username: responseJson[0].enforcer_username,
              created_at: Number(responseJson[0].created_at),
            },
          ]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView>
      <FlatList
        //use combinedArray as we receive data from individual spots
        //this is sorted by last enforcement
        data={combinedArray}
        renderItem={({item, index}) => (
          <ParkingSpot
            enforcer_username={item.enforcer_username}
            created_at={item.created_at}
            name={item.name}
            spotpk={item.pk}
            //passing function to lift the state up
            fetchEnforcements={() => fetchEnforcements(parkingSpots[index].pk)}
          />
        )}
        keyExtractor={item => item.name}
      />
    </SafeAreaView>
  );
};

export default ParkingSpotList;
