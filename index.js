/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {getFirestore} from '@react-native-firebase/firestore';

getFirestore();

AppRegistry.registerComponent(appName, () => App);
