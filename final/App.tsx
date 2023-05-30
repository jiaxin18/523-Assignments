import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SpScreen from './screens/speech';
import TabScreen from './screens/tab';
import CaScreen from './screens/camera';
import HomeScreen from './screens/Home';
import TeScreen from './screens/text';
import {RootStackParamList} from './screens/RootStackPrams';
import 'react-native-gesture-handler';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tab"
          component={TabScreen}
          options={{
            title: 'Language Learning',
            headerStyle: {backgroundColor: '#694fad'},
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Speech" component={SpScreen} />
        <Stack.Screen name="Text" component={TeScreen} />
        <Stack.Screen name="Camera" component={CaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
