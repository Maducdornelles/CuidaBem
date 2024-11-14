// routes/StackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../pages/LoginScreen';
import SignUpScreen from '../pages/SignUpScreen';
import HomeScreen from '../pages/HomeScreen';
import SettingScreen from '../pages/SettingScreen';
import UserSettings from '../pages/UserSettings';
import UserScreen from '../pages/UserScreen';
import AddUserScreen from '../pages/AddUserScreen';
import AddMedScreen from '../pages/AddMedScreen';
import MapScreen from '../pages/MapScreen';
import NotificationScreen from '../pages/NotificationScreen';
import AlarmScreen from '../pages/AlarmScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="UserSettings" component={UserSettings} />
      <Stack.Screen name="User" component={UserScreen} />
      <Stack.Screen name="AddUser" component={AddUserScreen} />
      <Stack.Screen name="AddMedScreen" component={AddMedScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="AlarmScreen" component={AlarmScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
