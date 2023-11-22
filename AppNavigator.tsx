import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from './screens/HomePage';
import CustomHeaderLeft from './components/CustomHeader';
import AddFlight from './screens/AddFLight';
import FlightDetails from './screens/FlightDetails';
import {View, Text, Image} from 'react-native';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{
            headerTitle: () => (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={require('./asset/image_5.png')} />
                <Text
                  style={{
                    color: '#4C5B5E',
                    fontSize: 20,
                    opacity: 0.5,
                    fontWeight: 'bold',
                  }}>
                  Fligh
                </Text>
                <Text
                  style={{
                    color: 'rgb(0,0,0)',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  Tracker
                </Text>
              </View>
            ),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Add"
          component={AddFlight}
          options={({navigation}) => ({
            headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
            headerTitle: () => (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={require('./asset/image_5.png')} />
                <Text
                  style={{
                    color: '#4C5B5E',
                    fontSize: 20,
                    opacity: 0.5,
                    fontWeight: 'bold',
                  }}>
                  Nuo
                </Text>
                <Text
                  style={{
                    color: 'rgb(0,0,0)',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  volo
                </Text>
              </View>
            ),
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="Details"
          component={FlightDetails}
          options={({navigation}) => ({
            headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
            headerTitle: () => (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={require('./asset/image_5.png')} />
                <Text
                  style={{
                    color: '#4C5B5E',
                    fontSize: 20,
                    opacity: 0.5,
                    fontWeight: 'bold',
                  }}>
                  Dettagli
                </Text>
                <Text
                  style={{
                    color: 'rgb(0,0,0)',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  Volo
                </Text>
              </View>
            ),
            headerTitleAlign: 'center',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
