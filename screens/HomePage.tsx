import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import FlightCard from '../components/FlightCard';
import FabButton from '../components/FAButton';
import {StackScreenProps} from '@react-navigation/stack';
import {Flight} from '../api/type';
import firestore from '@react-native-firebase/firestore';

type RootStackParamList = {
  Home: {newFlight?: Flight};
  Add: undefined;
  Details: undefined;
};

type HomePageProps = StackScreenProps<RootStackParamList>;

const HomePage: React.FC<HomePageProps> = ({navigation, route}) => {
  const [flightData, setFlightData] = useState<
    {title: string; data: Flight[]}[]
  >([
    {title: 'Voli Passati', data: []},
    {title: 'Voli Presenti', data: []},
    {title: 'Voli Futuri', data: []},
  ]);

  const fetchFlightsFromFirestore = async () => {
    try {
      const flightCollection = firestore().collection('Voli');
      const snapshot = await flightCollection.get();
      const allFlights = snapshot.docs.map(doc => doc.data() as Flight);

      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); 

      const pastFlights: Flight[] = [];
      const presentFlights: Flight[] = [];
      const futureFlights: Flight[] = [];

      allFlights.forEach(flight => {
        const flightDate = new Date(flight.flight_date);
        flightDate.setHours(0, 0, 0, 0);

        if (flightDate < currentDate) {
          pastFlights.push(flight);
        } else if (flightDate.getTime() === currentDate.getTime()) {
          presentFlights.push(flight);
        } else {
          futureFlights.push(flight);
        }
      });

      const flightData = [
        {title: 'Voli Passati', data: pastFlights},
        {title: 'Voli Presenti', data: presentFlights},
        {title: 'Voli Futuri', data: futureFlights},
      ];

      setFlightData(flightData);
    } catch (error) {
      console.error('Failed to fetch flights from Firestore: ', error);
    }
  };

  fetchFlightsFromFirestore();

  useEffect(() => {
    if (route.params?.newFlight) {
      const newFlight = route.params.newFlight;
      const flightDate = new Date(newFlight.flight_date);
      const currentDate = new Date();

      let category: string;
      if (flightDate < currentDate) {
        category = 'Voli Passati';
      } else if (flightDate.toDateString() === currentDate.toDateString()) {
        category = 'Voli Presenti';
      } else {
        category = 'Voli Futuri';
      }

      setFlightData(prevState =>
        prevState.map(item => {
          if (item.title === category) {
            return {
              ...item,
              data: [...item.data, newFlight],
            };
          } else {
            return item;
          }
        }),
      );

      saveFlightToFirestore(newFlight);
    }
  }, [route.params?.newFlight]);

  const navigateToAddFlight = () => {
    navigation.navigate('Add');
  };

  const saveFlightToFirestore = async (flight: Flight) => {
    try {
      await firestore().collection('Voli').add(flight);
      console.log('Volo salvato con successo in Firestore!');
    } catch (error) {
      console.error('Errore nel salvataggio del volo in Firestore:', error);
    }
  };


  return (
    <View style={styles.container}>
      <FlatList
        data={flightData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View>
            <Text style={styles.header}>{item.title}</Text>
            <FlatList
              data={item.data}
              keyExtractor={flight => flight.flight_date}
              renderItem={({item: flight}) => (
                <FlightCard
                  flightDate={flight.flight_date}
                  departureAirport={flight.departure.airport}
                  arrivalAirport={flight.arrival.airport}
                  navigation={navigation}
                  flight={flight}
                />
              )}
            />
          </View>
        )}
      />
      <FabButton navigateToAddFlight={navigateToAddFlight} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: 'white',
    borderTopWidth: 3,
    borderTopColor: '#E9E9E9',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    color: 'black',
    borderColor: '#E9E9E9',
    borderBottomWidth: 3,
    marginTop: 40,
  },
});

export default HomePage;
