import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CaScreen from '../camera';
import SpScreen from '../speech';
import HomeScreen from '../Home';
import TeScreen from '../text';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0fff0"
      inactiveColor="#daa520" //"#ffd700" //"#bdb76b"
      barStyle={{backgroundColor: '#694fad'}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Speech"
        component={SpScreen}
        options={{
          tabBarLabel: 'Speech',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="text-to-speech"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Text"
        component={TeScreen}
        options={{
          tabBarLabel: 'Text',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="translate" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CaScreen}
        options={{
          tabBarLabel: 'Camera',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="camera" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default MyTabs;
