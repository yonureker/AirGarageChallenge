## Recent Enforcement Leaderboard

### Challenge
Create a single page React or React Native app that shows an ordered list of how recently our parking lots have been enforced, and who enforced it last. You should show the parking lot name, the username of the enforcer, and the minutes since last enforcement, sorted by recency.

### How to run the repository
To run the project on iOS Simulator

```
* Clone or download the repository
* cd <Project folder>
* yarn install
* npx react-native run-ios
```

### Improvements

* I think I definitely spent a lot of time to lift the state up from parkingSpot.js to the FlatList component. I'd definitely use a state container like Redux to have less headaches.

### What if there were 10,000 parking lots?

* I'd only set the parkingSpots state with name and pk keys, rather than passing the whole responseJson.
* I'd definitely implement some kind of lazy loading to the FlatList.
* I think being able to filter the response that I get from Spots API would definitely help. There are a lot of unnecessary fields being passed with the response.