import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type RootStackParamList = {
  Home: undefined;
  Add: undefined;
  Details: undefined;
};

type CustomHeaderLeftProps = {
  navigation: StackNavigationProp<RootStackParamList>; 
};

const CustomHeaderLeft: React.FC<CustomHeaderLeftProps>= ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
    <Image
      source={require('../asset/Vector.png')}
      style={{ width: 20, height: 20, marginLeft: 10 }} 
    />
    </TouchableOpacity>
  );
};

export default CustomHeaderLeft;
