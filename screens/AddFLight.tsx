import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {getFlights} from '../api/http';
import { StackScreenProps } from '@react-navigation/stack';
import {Flight} from '../api/type'

type RootStackParamList = {
  Home: { newFlight?: Flight };
  Add: undefined;
  Details: undefined;
};

type Props = StackScreenProps<RootStackParamList>;


const AddFlight: React.FC<Props> = ({navigation}) => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  const handlePress = async () => {
    try {
      const apiResponse = await getFlights();
      const flights = apiResponse.data;

      const flight = flights.find(
        (flight: any) =>
          flight.flight.number === text1 && flight.flight_date === text2,
      );

      if (flight) {
        navigation.navigate('Home', {newFlight: flight});
        await firestore().collection('flights').add(flight);
      } else {
        Alert.alert(
          'Errore',
          'Non è stato trovato nessun volo con il numero e la data specificati.',
        );
      }
    } catch (error) {
      Alert.alert(
        'Errore',
        'Si è verificato un errore durante la ricerca del volo.',
      );
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.text}>Numero</Text>
        <TextInput
          value={text1}
          onChangeText={setText1}
          placeholder="Inserisci il primo valore"
          placeholderTextColor={'rgba(0, 0, 0, 0.37)'}
          style={styles.textInput}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Data</Text>
        <TextInput
          value={text2}
          onChangeText={setText2}
          placeholder="Inserisci il secondo valore"
          placeholderTextColor={'rgba(0, 0, 0, 0.37)'}
          style={styles.textInput}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>TRACCIA VOLO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    borderTopColor: '#E9E9E9',
    borderTopWidth: 3,
  },
  text: {
    color: 'rgba(0, 0, 0, 0.75)',
    fontSize: 20,
    paddingLeft: 15,
  },
  container: {
    paddingTop: 30,
    borderBottomWidth: 3,
    borderBottomColor: '#E9E9E9',
  },
  textInput: {
    color: 'black',
    fontSize: 20,
    borderTopColor: '#E9E9E9',
    borderTopWidth: 3,
    paddingLeft: 15,
  },
  button: {
    borderWidth: 2,
    alignContent: 'flex-end',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#E9E9E9',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
  },
});

export default AddFlight;
