import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Flight} from '../api/type';
import firestore from '@react-native-firebase/firestore';

type RootStackParamList = {
  Home: undefined;
  Add: undefined;
  Details: {
    departureGate: string;
    departureTerminal: string;
    arrivalGate: string;
    arrivalTerminal: string;
    departureTime: string;
    arrivalTime: string;
    departureLocation: string;
    arrivalLocation: string;
    departureIata: string;
    arrivalIata: string;
    flightNumber: string;
  }; 
};

type FlightCardProps = {
  flightDate: string;
  departureAirport: string;
  arrivalAirport: string;
  navigation: StackNavigationProp<RootStackParamList>;
  flight: Flight;
};

const FlightCard: React.FC<FlightCardProps> = ({
  flightDate,
  departureAirport,
  arrivalAirport,
  navigation,
  flight,
}) => {

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Details', {
          departureGate: flight.departure.gate,
          departureTerminal: flight.departure.terminal,
          arrivalGate: flight.arrival.gate,
          arrivalTerminal: flight.arrival.terminal,
          departureTime: flight.departure.scheduled,
          arrivalTime: flight.arrival.scheduled,
          departureLocation: flight.departure.airport,
          arrivalLocation: flight.arrival.airport,
          departureIata: flight.departure.iata,
          arrivalIata: flight.arrival.iata, 
          flightNumber: flight.flight.number,
        })
      }>
      <View style={styles.card}>
        <View>
          <Text style={styles.text}>
            {departureAirport} - {arrivalAirport}
          </Text>
          <Text style={styles.textDate}>{flightDate}</Text>
        </View>
        <View>
          <Image
            source={require('../asset/icons8-arrow-50.png')}
            style={styles.imageStyle}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 3,
    borderBottomColor: '#E9E9E9',
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textDate: {
    color: 'black',
    opacity: 0.5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageStyle: {
    width: 30,
    height: 30,
  },
});

export default FlightCard;
