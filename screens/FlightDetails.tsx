import {Text, View, Image, StyleSheet, KeyboardAvoidingView} from 'react-native';
import React from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {useRoute, RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  Details: {
    departureGate: string;
    departureTerminal: string;
    departureIata: string;
    departureTime: string;
    departureLocation: string;
    arrivalGate: string;
    arrivalIata: string;
    arrivalTerminal: string;
    arrivalTime: string;
    arrivalLocation: string;
    flightNumber: string;
  };
  Home: undefined;
  Addflight: undefined;
};

type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;

const FlightDetails: React.FC = () => {
  const route = useRoute<DetailsRouteProp>();

  const {
    departureGate,
    departureTerminal,
    departureIata,
    departureTime,
    departureLocation,
    arrivalGate,
    arrivalIata,
    arrivalTerminal,
    arrivalTime,
    arrivalLocation,
    flightNumber,
  } = route.params;

  const scheduledDepartureTime = new Date(departureTime);
  const departureHours = scheduledDepartureTime.getUTCHours();
  const departureMinutes = scheduledDepartureTime.getUTCMinutes();

  const departureTimeString = `${
    departureHours < 10 ? '0' : ''
  }${departureHours}:${
    departureMinutes < 10 ? '0' : ''
  }${departureMinutes}`;

  const scheduledArrivalTime = new Date(arrivalTime);
  const arrivalHours = scheduledArrivalTime.getUTCHours();
  const arrivalMinutes = scheduledArrivalTime.getUTCMinutes();

  const arrivalTimeString = `${
    arrivalHours < 10 ? '0' : ''
  }${arrivalHours}:${
    arrivalMinutes < 10 ? '0' : ''
  }${arrivalMinutes}`;
  
  return (
    <KeyboardAvoidingView style={{ flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
    <View style={styles.container}>
      <View style={styles.DTopContainer}>
        <View style={styles.textcontainer1}>
          <Text style={styles.title}>{departureLocation}</Text>
          <Text style={styles.subText}>{departureIata}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../asset/image_6.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.textcontainer2}>
          <Text style={styles.title}>{arrivalLocation}</Text>
          <Text style={styles.subText}>{arrivalIata}</Text>
        </View>
      </View>
      <View style={styles.grildContainer}>
        <View>
          <Text style={styles.titleGrid}>{flightNumber}</Text>
        </View>
        <View style={{flexWrap: 'wrap', flexDirection: 'row', flex: 1}}>
          <View style={styles.Grid1}>
            <Text style={styles.textGrid2}>Partenza</Text>
            <Text style={styles.textGrid1}>{departureTimeString}</Text>
          </View>
          <View style={styles.Grid2}>
            <Text style={styles.textGrid2}>Gate/Terminal</Text>
            <Text style={styles.textGrid1}>
              {departureGate}/{departureTerminal}
            </Text>
          </View>
          <View style={styles.Grid3}>
            <Text style={styles.textGrid2}>Arrivo</Text>
            <Text style={styles.textGrid1}>{arrivalTimeString}</Text>
          </View>
          <View style={styles.Grid4}>
            <Text style={styles.textGrid2}>Gate/Terminal</Text>
            <Text style={styles.textGrid1}>
              {arrivalGate}/{arrivalTerminal}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.noteContainer}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.titleGrid}>Note</Text>
          <TextInput
            style={{borderBottomWidth: 1, width: 300, color: '#000000'}}
          />
        </View>
      </View>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  DTopContainer: {
    backgroundColor: '#16F195',
    flex: 2,
    paddingHorizontal: 35,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  grildContainer: {
    flex: 2,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  noteContainer: {
    flex: 1,
    backgroundColor: '#E3F2F7',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
  },
  textcontainer2: {
    alignItems: 'flex-end',
  },
  textcontainer1: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000000',
  },
  subText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.5)',
  },
  Grid1: {
    borderTopWidth: 2,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    paddingHorizontal: '10%',
    paddingTop: 5,
    borderLeftColor: '#FFFFFF',
    borderTopColor: 'rgba(0, 0, 0, 0.37)',
    borderRightColor: 'rgba(0, 0, 0, 0.37)',
    borderBottomColor: 'rgba(0, 0, 0, 0.37)',
    height: '50%',
    width: '50%',
    flexDirection: 'column',
  },
  Grid2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    paddingHorizontal: '10%',
    paddingTop: 5,
    borderTopWidth: 2,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(0, 0, 0, 0.37)',
    borderTopColor: 'rgba(0, 0, 0, 0.37)',
    borderRightColor: 'rgb(255, 255, 255)',
    borderBottomColor: 'rgba(0, 0, 0, 0.37)',
    height: '50%',
    width: '50%',
  },
  Grid3: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    paddingHorizontal: '10%',
    paddingTop: 5,
    borderTopWidth: 1,
    borderBottomWidth: 2,
    borderRightWidth: 1,
    borderLeftColor: '#ffffff',
    borderTopColor: 'rgba(0, 0, 0, 0.37)',
    borderRightColor: 'rgba(0, 0, 0, 0.37)',
    borderBottomColor: 'rgba(0, 0, 0, 0.37)',
    height: '50%',
    width: '50%',
  },
  Grid4: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    paddingHorizontal: '10%',
    paddingTop: 5,
    borderTopWidth: 1,
    borderBottomWidth: 2,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(0, 0, 0, 0.37)',
    borderTopColor: 'rgba(0, 0, 0, 0.37)',
    borderRightColor: 'rgb(255, 255, 255)',
    borderBottomColor: 'rgba(0, 0, 0, 0.37)',
    height: '50%',
    width: '50%',
  },
  titleGrid: {
    fontSize: 30,
    color: '#000000',
    marginVertical: 20,
  },
  textGrid1: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  textGrid2: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.5)',
    textAlign: 'left',
  },
});

export default FlightDetails;
